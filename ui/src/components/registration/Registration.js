import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Button,
  Icon,
  FormControl,
  Select,
  Container,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import auth from "../../redux/auth";
import asyncStatus from "../../redux/asyncStatus";
import { CssTextField } from "../../util/CssTextField";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import { Link } from "react-router-dom";
import AsyncSpinner from "../../util/AsyncSpinner";
import { Redirect } from "react-router";
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
  formControl: {
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
  infoText: {
    display: "flex",
    flexDirection: "column",
    marginTop: "30px",
  },
}));

function Registration(props) {
  const classes = useStyles();

  const [fields, setFields] = useState({
    username: {
      label: "Username",
      helperText: "",
      error: "",
      value: "",
      required: true,
      type: "text",
    },
    first_name: {
      label: "First Name",
      helperText: "",
      error: "",
      value: "",
      type: "text",
    },
    last_name: {
      label: "Last Name",
      helperText: "",
      error: "",
      value: "",
      type: "text",
    },
    password1: {
      label: "Password",
      helperText: "",
      error: "",
      value: "",
      required: true,
      type: "password",
    },
    password2: {
      label: "Confirm Password",
      helperText: "",
      error: "",
      value: "",
      required: true,
      type: "password",
    },
    grade: {
      label: "Grade",
      helperText: "",
      error: "",
      value: "",
    },
  });

  useEffect(() => {
    console.log("reached");
    mapErrors(props.registerFailureText);
  }, [props.registerFailureText]);

  const validation = () => {
    var newFields = { ...fields };
    if (newFields["password1"].value !== newFields["password2"].value) {
      newFields["password2"].error = "Passwords do not match";
      newFields["password2"].helperText = "Passwords do not match";
    }
    setFields(newFields);
  };

  const infoCheck = () => {
    const numErrorFields = Object.values(fields).filter((field) => field.error);
    if (numErrorFields.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const mapErrors = (errors) => {
    var newFields = { ...fields };
    Object.keys(errors).map((errorField) => {
      if (newFields[errorField]) {
        newFields[errorField].error = errors[errorField];
        newFields[errorField].helperText = errors[errorField];
      }
    });
    setFields(newFields);
  };

  const submitForm = (e) => {
    e.preventDefault();
    validation();
    const infoValid = infoCheck();
    console.log(infoValid, fields);
    if (infoValid) {
      props.attemptRegister({
        firstName: fields.first_name.value,
        lastName: fields.last_name.value,
        password1: fields.password1.value,
        password2: fields.password2.value,
        grade: fields.grade.value,
        username: fields.username.value,
      });
      props.waiting();
    }
  };

  const setFieldValue = (fieldValues, newValue, fieldName) => {
    var newFields = { ...fields };
    Object.values(newFields).map((field) =>
      console.log(field) || field.label === fieldValues.label
        ? (field[fieldName] = newValue)
        : null
    );
    setFields(newFields);
  };

  return (
    <Container maxWidth="lg">
      <Header title="Blog" sections={props.sections} />
      {props.loginStatus === 1 ? <Redirect to="/home" /> : null}
      <AsyncSpinner />
      <div className={classes.infoText}>
        <Typography align="center" variant="h1" style={{ fontSize: 35 }}>
          Why Create An Account?
        </Typography>
        <Typography variant="h1" style={{ fontSize: 20 }} align="center">
          Centuries ago, our ancestors shared stories, ideas, and thoughts as a
          method of teaching, learning, and even entertainment. As we enter
          uncertain times, both politically and socially, it is more important
          than ever to share your experiences! By registering your own account,
          you will be able to share your own story, your own journey! Let your voice be heard!
        </Typography>
        <Typography
          variant="h2"
          align="center"
          style={{ marginTop: "15px", fontSize: 22, fontWeight: 500 }}
        >
          Continue to tradition your ancestors started!
        </Typography>
      </div>
      <form onSubmit={submitForm} className={classes.layout}>
        <div className={classes.titleContainer}>
          <Icon className={classes.iconContainer}>
            <WhatshotIcon className={classes.icon} />
          </Icon>
          <Typography variant="h1" className={classes.title}>
            Registration
          </Typography>
        </div>
        {Object.keys(props.registerFailureText).length !== 0 ? (
          <Typography variant="h1" className={classes.failText}>
            Registration information incorrect! Please recheck the information
            entered!
          </Typography>
        ) : null}
        {Object.values(fields).map((fieldValues) =>
          fieldValues.label !== "Grade" ? (
            <CssTextField
              required={fieldValues.required}
              className={classes.textField}
              variant="outlined"
              error={fieldValues.error}
              helperText={fieldValues.helperText}
              type={fieldValues.type}
              onChange={(e) => {
                setFieldValue(fieldValues, e.target.value, "value");
                setFieldValue(fieldValues, "", "error");
                setFieldValue(fieldValues, "", "helperText");
              }}
              label={fieldValues.label}
            />
          ) : (
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel
                htmlFor="outlined-age-native-simple"
                style={{ color: "black" }}
              >
                {fieldValues.label}
              </InputLabel>
              <Select
                native
                value={fieldValues.value}
                onChange={(e) =>
                  setFieldValue(fieldValues, e.target.value, "value")
                }
                label={fieldValues.label}
                inputProps={{
                  name: "grade",
                }}
              >
                <option aria-label="None" value="" />
                <option value={6}>Grade 6</option>
                <option value={7}>Grade 7</option>
                <option value={8}>Grade 8</option>
                <option value={0}>Other</option>
              </Select>
            </FormControl>
          )
        )}
        <Button variant="outlined" type="submit" className={classes.button}>
          Register!
        </Button>
        <Link to="/login" style={{ color: "red" }}>
          Already have an account? Login here!
        </Link>
      </form>
    </Container>
  );
}

export default connect(
  (state) => ({
    registerFailureText: state.auth.registerFailureText,
    loginStatus: state.auth.loginStatus,
    sections: state.blog.sections,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        attemptRegister: auth.actions.attemptRegister,
        waiting: asyncStatus.actions.waiting,
      },
      dispatch
    )
)(Registration);
