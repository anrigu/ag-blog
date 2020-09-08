import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import blog, {
  postArticleEpic,
  getPostsEpic,
  getSpecificPostEpic,
} from "./redux/blog";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import auth, {
  loginEpic,
  registerEpic,
  logoutEpic,
  verifyAuthEpic,
} from "./redux/auth";
import asyncStatus from "./redux/asyncStatus";
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import logger from "redux-logger";
import { catchError } from "rxjs/operators";

export const history = createBrowserHistory();

const reducers = combineReducers({
  blog: blog.reducer,
  auth: auth.reducer,
  asyncStatus: asyncStatus.reducer,
  router: connectRouter(history),
});

const rootEpic = (action$, store$, dependencies) =>
  combineEpics(
    loginEpic,
    registerEpic,
    logoutEpic,
    postArticleEpic,
    getPostsEpic,
    getSpecificPostEpic,
    verifyAuthEpic
  )(action$, store$, dependencies).pipe(
    catchError((error, source) => {
      console.error("error", error);
      return source;
    })
  );

const epicMiddleware = createEpicMiddleware();
// routerMiddleware(history),
const middleware = [epicMiddleware, thunkMiddleware, logger];

// if (process.env.NODE_ENV == 'development') {
//     middleware.push(logger);
// }
// if (process.env.NODE_ENV == 'production') {
//     console.log = () => {};
// }

// function configureStore(initialState) {
//   const enhancer = compose(applyMiddleware(...middleware));
//   return createStore(reducers, initialState, enhancer);
// }

const store = configureStore({
  reducer: reducers,
  middleware: middleware,
});
export default store;

epicMiddleware.run(rootEpic);

// export default configureStore({});
