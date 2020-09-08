import React, { useState } from "react";
import { TextField, Typography, Button, Icon, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import auth from "../../redux/auth";
import blog from "../../redux/blog";
import { CssTextField } from "../../util/CssTextField";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import asyncStatus from "../../redux/asyncStatus";
import AsyncSpinner from "../../util/AsyncSpinner";
import Header from "../../newComponents/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  layout: {
    // height: "100%",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    // border: "1px solid red",
    // borderRadius: "15px",
  },
  author: {
    display: "flex",
    flexDirection: "column",
  },
  textField: {
    margin: "15px",
    minWidth: "300px",
  },
  failText: {
    fontSize: 25,
    color: "red",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 45,
  },
  iconContainer: {
    height: "150px",
    width: "150px",
  },
  icon: {
    height: "150px",
    width: "150px",
    color: "red",
  },
  button: {
    marginTop: "20px",
    height: "50px",
    minWidth: "100px",
  },
}));

function Login(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const infoCheck = () => {
    if (username.length === 0) {
      if (password.length === 0) {
        setPasswordErr("Invalid password!");
      } else {
        setPasswordErr("");
      }
      setUsernameErr("Invalid username!");
    } else if (password.length === 0) {
      setUsernameErr("");
      setPasswordErr("Invalid password!");
    } else {
      setUsernameErr("");
      setPasswordErr("");
      return true;
    }
    return false;
  };

  const submitForm = (e) => {
    e.preventDefault();
    const infoValid = infoCheck();
    console.log(infoValid);
    if (infoValid) {
      props.attemptLogin({ username: username, password: password });
      props.waiting();
    }
  };
  return (
    <div className={classes.root}>
      <Container maxWidth="lg">
        <AsyncSpinner />
        {props.loginStatus === 1 ? <Redirect to="/home" /> : null}
        <Header title="Blog" sections={props.sections} />
        <form onSubmit={submitForm} className={classes.layout}>
          <div className={classes.titleContainer}>
            <Icon className={classes.iconContainer}>
              <WhatshotIcon className={classes.icon} />
            </Icon>
            <Typography variant="h1" className={classes.title}>
              Login
            </Typography>
          </div>
          {props.loginFailureText ? (
            <Typography variant="h1" className={classes.failText}>
              {props.loginFailureText}
            </Typography>
          ) : null}
          <CssTextField
            className={classes.textField}
            variant="outlined"
            error={usernameErr.length}
            onChange={(e) => setUsername(e.target.value)}
            helperText={usernameErr}
            label="Username"
          />
          <CssTextField
            className={classes.textField}
            variant="outlined"
            type="password"
            error={passwordErr.length}
            helperText={passwordErr}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
          />
          <Button variant="outlined" type="submit" className={classes.button}>
            Login
          </Button>
          <Link to="/registration" style={{ color: "red" }}>
            No account? Register here!
          </Link>
        </form>
      </Container>
    </div>
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
        attemptLogin: auth.actions.attemptLogin,
        waiting: asyncStatus.actions.waiting,
      },
      dispatch
    )
)(Login);
