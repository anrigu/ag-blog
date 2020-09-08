import React, { useEffect } from "react";
import { Route, Switch, Router } from "react-router-dom";
import { Provider } from "react-redux";
import store, { history } from "./configStore";
import MainLayout from "./MainLayout";
import Page from "./components/Page";
import ContentPage from "./components/ContentPage";
import PostArticle from "./components/PostArticle";
import Login from "./components/login/Login";
import Account from "./components/login/Account";
import Registration from "./components/registration/Registration";
import { makeStyles } from "@material-ui/core/styles";
import { ConnectedRouter } from "connected-react-router";
import Blog from './newComponents/Blog';

const useStyles = makeStyles((theme) => ({
  fade: {
    "fade-enter": {
      opacity: 0.01,
    },
    "fade-enter.fade-enter-active": {
      opacity: 1,
      transition: "opacity 300ms ease-in",
    },
    "fade-exit": {
      opacity: 1,
    },
    "fade-exit.fade-exit-active": {
      opacity: 0.01,
      transition: "opacity 300ms ease-in",
    },
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/postPage/article/:id">
            <MainLayout ContentComponent={<ContentPage />} />
          </Route>
          <Route path="/postPage/:topic">
            <MainLayout ContentComponent={<Page />} />
          </Route>
          <Route exact path="/postArticle">
            <MainLayout ContentComponent={<PostArticle />} />
          </Route>
          <Route exact path="/login">
            <MainLayout ContentComponent={<Login />} />
          </Route>
          <Route exact path="/registration">
            <MainLayout ContentComponent={<Registration />} />
          </Route>
          <Route exact path="/home">
            <MainLayout ContentComponent={<Blog />} />
          </Route>
          <Route exact path="/account">
            <MainLayout ContentComponent={<Account />} />
          </Route>
          <Route exact path="/">
            <MainLayout ContentComponent={<Blog />} />
          </Route>
        </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
