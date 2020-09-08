import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Button,
  Icon,
  FormControl,
  Select,
  InputLabel,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import auth from "../../redux/auth";
import blog from "../../redux/blog";
import asyncStatus from "../../redux/asyncStatus";
import { CssButton } from "../../util/CssButton";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { Link } from "react-router-dom";
import AsyncSpinner from "../../util/AsyncSpinner";
import { Redirect } from "react-router";
import Header from "../../newComponents/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
  },
  title: {
    fontSize: 40,
    marginBottom: "20px",
  },
  body: {
    fontSize: 22,
    marginBottom: "30px",
  },
  logoutButton: {
    minWidth: "150px",
    padding: "10px",
  },
}));

function Account(props) {
  const classes = useStyles();
  return (
    <Container maxWidth="lg">
      <AsyncSpinner />
      <Header title="Blog" sections={props.sections} />
      {props.loginStatus === 0 ? <Redirect to="/home" /> : null}
      <div className={classes.root}>
        <Typography variant="h1" className={classes.title}>
          Logout
        </Typography>
        <Container maxWidth="md">
          <Typography variant="h2" className={classes.body} align="center">
            Wait! Don't go! Continue sharing your stories! If you're sure, go
            ahead and click the logout button! You can always login again!
          </Typography>
        </Container>
        <CssButton
          variant="outlined"
          onClick={() => {
            props.logout();
            props.waiting();
          }}
          className={classes.logoutButton}
        >
          Logout
        </CssButton>
      </div>
    </Container>
  );
}

export default connect(
  (state) => ({
    loginFailureText: state.auth.loginFailureText,
    loginStatus: state.auth.loginStatus,
    sections: state.blog.sections,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        logout: auth.actions.logout,
        waiting: asyncStatus.actions.waiting,
      },
      dispatch
    )
)(Account);
