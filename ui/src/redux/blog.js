import { createSlice } from "@reduxjs/toolkit";
import apiClient from "../apis/apiClient";
import { ofType } from "redux-observable";
import { map, mergeMap, tap, withLatestFrom, catchError } from "rxjs/operators";
import { defer, from, merge, of, EMPTY } from "rxjs";
import api from "../apis/apiClient";
import asyncStatus from "./asyncStatus";

const blog = createSlice({
  reducers: {
    setAuthor: (state, { payload: author }) => {
      state.author = author.author;
    },
    setTitle: (state, { payload: title }) => {
      state.title = title.title;
    },
    setBody: (state, { payload: body }) => {
      state.body = body.body;
    },
    showSpinner: (state, { payload: showSpinner }) => {
      state.spinner = showSpinner.showSpinner;
    },
    setResponseStatus: (state, { payload: responseStatus }) => {
      state.responseStatus = responseStatus.responseStatus;
    },

    setBlogPosts: (state, { payload: data }) => {
      state.blogPosts = data.data.reverse();
    },

    setCurrentPost: (state, { payload: data }) => {
      state.currentPost = data.data;
    },

    postArticle: () => {},

    getPosts: (state, { payload: category }) => {
      if (category) {
        state.category = category;
      }
    },

    getSpecPost: (state, { payload: id }) => {
      state.currentPostId = id;
    },
  },
  initialState: {
    category: "All",
    author: "",
    title: "",
    body: "",
    responseStatus: "",
    spinner: false,
    blogPosts: [],
    currentPost: [],
    currentPostId: null,
    sections: [
      { title: "Home", url: "/home" },
      { title: "All", url: "/postPage/all", categoryName: "All" },
      {
        title: "Prospective Students/Families",
        url: "/postPage/prospective",
        categoryName: "Prospective",
      },
      {
        title: "Middle School",
        url: "/postPage/ms",
        categoryName: "MiddleSchool",
      },
      { title: "High School", url: "/postPage/hs", categoryName: "HighSchool" },
      { title: "Opinion", url: "/postPage/opinion", categoryName: "Opinion" },
      { title: "Post An Article", url: "/postArticle" },
      { title: "About", url: "/about" },
    ],
  },
  slice: "blog",
  name: "blog",
});

export const getPostsEpic = (action$, state$) =>
  action$.pipe(
    ofType(blog.actions.getPosts),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      if (state.blog.category === "All") {
        return from(
          api.get(`/api/v1/posts/`)
        ).pipe(
          mergeMap((res) => {
            if (res.status === 200) {
              return merge(
                of(
                  blog.actions.setBlogPosts({
                    data: res.data,
                  })
                ),
                of(asyncStatus.actions.done())
              );
            } else {
              return merge(
                of(blog.actions.setResponseStatus({ responseStatus: "Bad" })),
                of(asyncStatus.actions.done())
              );
            }
          }),
          catchError(() => merge(of(asyncStatus.actions.done())))
        );
      } else {
        return from(
          api.get(`/api/v1/posts/?category=${state.blog.category}`)
        ).pipe(
          mergeMap((res) => {
            if (res.status === 200) {
              return merge(
                of(
                  blog.actions.setBlogPosts({
                    data: res.data,
                  })
                ),
                of(asyncStatus.actions.done())
              );
            } else {
              return merge(
                of(blog.actions.setResponseStatus({ responseStatus: "Bad" })),
                of(asyncStatus.actions.done())
              );
            }
          }),
          catchError(() => merge(of(asyncStatus.actions.done())))
        );
      }
    })
  );

export const getSpecificPostEpic = (action$, state$) =>
  action$.pipe(
    ofType(blog.actions.getSpecPost),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      return from(api.get(`/api/v1/posts/${state.blog.currentPostId}/`)).pipe(
        mergeMap((res) => {
          if (res.status === 200) {
            return merge(
              of(
                blog.actions.setCurrentPost({
                  data: res.data,
                })
              ),
              of(asyncStatus.actions.done())
            );
          } else {
            return merge(
              of(blog.actions.setResponseStatus({ responseStatus: "Bad" })),
              of(asyncStatus.actions.done())
            );
          }
        }),
        catchError(() => merge(of(asyncStatus.actions.done())))
      );
    })
  );

export const postArticleEpic = (action$, state$) =>
  action$.pipe(
    ofType(blog.actions.postArticle),
    withLatestFrom(state$),
    mergeMap(
      ([
        {
          payload: { title, body, category, blurb },
        },
        state,
      ]) => {
        return from(
          api.post(`/api/v1/posts/`, { title, body, category, blurb })
        ).pipe(
          mergeMap((res) => {
            if (res.status === 200 || res.status === 201) {
              return merge(
                of(
                  blog.actions.setResponseStatus({
                    responseStatus: "OK",
                  })
                ),
                of(asyncStatus.actions.done())
              );
            } else {
              return merge(
                of(blog.actions.setResponseStatus({ responseStatus: "Bad" })),
                of(asyncStatus.actions.done())
              );
            }
          }),
          catchError(() => merge(of(asyncStatus.actions.done())))
        );
      }
    )
  );

export default blog;
