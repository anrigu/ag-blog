import { createSlice } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { map, mergeMap, tap, withLatestFrom, catchError } from "rxjs/operators";
import { defer, from, merge, of, EMPTY } from "rxjs";
import api from "../apis/apiClient";
import asyncStatus from "./asyncStatus";

export const AUTH_STATUS = {
  LOGGED_OUT: 0,
  LOGGED_IN: 1,
};

const auth = createSlice({
  reducers: {
    attemptRegister: (
      state,
      {
        payload: { firstName, lastName, username, password1, password2, grade },
      }
    ) => {
      state.regData = {
        firstName,
        lastName,
        username,
        password1,
        password2,
        grade,
      };
    },
    attemptLogin: (state, { payload: { username, password } }) => {
      state.username = username;
    },
    registerSuccess: (state) => {
      state.loginStatus = AUTH_STATUS.LOGGED_IN;
      state.username = state.regData.username;
    },
    loginSuccess: (state, { payload: data }) => {
      state.loginStatus = AUTH_STATUS.LOGGED_IN;
      state.username = data.username;
    },
    loginFailure: (state, { payload: failText }) => {
      state.loginFailureText = failText.credentials;
    },
    registerFailure: (state, { payload: failText }) => {
      state.registerFailureText = failText.credentials;
    },
    logout: (state) => {
      state.loginStatus = 0;
    },
    verifyAuth: () => {},
  },
  initialState: {
    username: "",
    loginStatus: null,
    loginFailureText: "",
    registerFailureText: {},
    regData: {},
  },
  name: "auth",
  slice: "auth",
});

export default auth;

export const verifyAuthEpic = (action$, state$) =>
  action$.pipe(
    ofType(auth.actions.verifyAuth),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      return from(api.get("/api/v1/auth/user/")).pipe(
        mergeMap((res) => {
          if (res.status !== 200) {
            return merge(
              of(auth.actions.logout()),
              of(asyncStatus.actions.done())
            );
          } else {
            return merge(
              of(auth.actions.loginSuccess(res.data)),
              of(asyncStatus.actions.done())
            );
          }
        }),
        catchError(() => of(auth.actions.logout()))
      );
    })
  );

export const loginEpic = (action$, state$) =>
  action$.pipe(
    ofType(auth.actions.attemptLogin),
    withLatestFrom(state$),
    mergeMap(([{ payload: loginInfo }, state]) => {
      const username = state.auth.username;
      const password = loginInfo.password;
      return from(api.post("/api/v1/auth/login/", { username, password })).pipe(
        mergeMap((res) => {
          if (res.status === 200) {
            return merge(
              of(auth.actions.verifyAuth()),
              of(
                auth.actions.loginFailure({
                  credentials: "",
                })
              )
            );
          } else {
            const errors = res.data;
            if (errors["non_field_errors"]) {
              return merge(
                of(asyncStatus.actions.done()),
                of(
                  auth.actions.loginFailure({
                    credentials: "Unable to log in with provided credentials.",
                  })
                )
              );
            } else {
              return merge(
                of(
                  auth.actions.loginFailure({
                    credentials:
                      "Login information incorrect. Please try again.",
                  })
                ),
                of(asyncStatus.actions.done())
              );
            }
          }
        }),
        catchError(
          (e) =>
            console.log(e) ||
            merge(
              of(auth.actions.loginFailure({ text: "System error" })),
              of(asyncStatus.actions.done())
            )
        )
      );
    })
  );

export const registerEpic = (action$, state$) =>
  action$.pipe(
    ofType(auth.actions.attemptRegister),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const regData = state.auth.regData;
      const payload = {
        first_name: regData.firstName,
        last_name: regData.lastName,
        username: regData.username,
        email: regData.email,
        password1: regData.password1,
        password2: regData.password2,
        grade: regData.grade,
      };
      return from(api.post("/api/v1/auth/registration/", payload)).pipe(
        mergeMap((res) => {
          console.log("res", res);
          if (res.status === 201) {
            return merge(of(auth.actions.verifyAuth()));
          } else {
            const errors = res.data;
            if (
              errors["non_field_errors"] &&
              errors["non_field_errors"].includes(
                "The two password fields didn't match."
              )
            ) {
              delete errors["non_field_errors"];
              errors["password2"] = [
                ...(errors["password2"] || []),
                "The two passwords didn't match",
              ];
            }
            return merge(
              of(
                auth.actions.registerFailure({
                  credentials: errors,
                })
              ),
              of(asyncStatus.actions.done())
            );
          }
        }),
        catchError(() =>
          merge(
            of(auth.actions.registerFailure({ credentials: "System error" })),
            of(asyncStatus.actions.done())
          )
        )
      );
    })
  );

export const logoutEpic = (action$, state$) =>
  action$.pipe(
    ofType(auth.actions.logout),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      return from(api.post("/api/v1/auth/logout/")).pipe(
        mergeMap((res) => {
          return merge(of(asyncStatus.actions.done()));
        }),
        catchError(() =>
          merge(
            of(auth.actions.loginFailure({ text: "System error" })),
            of(asyncStatus.actions.done())
          )
        )
      );
    })
  );
