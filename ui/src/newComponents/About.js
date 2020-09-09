import React, { useState } from "react";
import {
  TextField,
  Typography,
  FormControl,
  Select,
  InputLabel,
  Popover,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Container,
} from "@material-ui/core";
import { CssButton, CssIconButton } from "../util/CssButton";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import auth from "../redux/auth";
import blog from "../redux/blog";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import asyncStatus from "../redux/asyncStatus";
import AsyncSpinner from "../util/AsyncSpinner";
import HelpIcon from "@material-ui/icons/Help";
import Header from "./Header";
import Image from "../components/body/Image";

const TRANSITION_LENGTH = 0.25;
const useStyles = makeStyles((theme) => ({
  root: {
    border: "2px solid #F5F5F5",
    width: "100%",
    background: theme.palette.background.main,
    transition: `background ${TRANSITION_LENGTH}s ease-in-out, transform ${TRANSITION_LENGTH}s ease-in-out`,
    "&:hover": {
      background: theme.palette.hover.main,
      transition: `background ${TRANSITION_LENGTH}s ease-in-out, transform ${TRANSITION_LENGTH}s ease-in-out`,
      transform: "scale(1.005)",
    },
    display: "flex",
    flexDirection: "row",
  },
  image: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

function About(props) {
  const classes = useStyles();
  const text = (
    <p>
      Hi! I'm Anri (If you couldn't guess, that's me in the picture on the
      right!)! I'm a grade 12 AP student at John Fraser S.S! I'm the creator,
      coder, and writer (of some articles) on this blog platform. I decided to
      create this blog as a way for students to have a resource for advice,
      ideas, concepts etc.! I wanted to detail all the ways I struggled in
      middle school so that younger students - like yourselves - could prepare
      for those aspects of school better! <br /> <br /> As a former student, I
      found that the bonds you form with the other 50 or so students in your
      grade are strong. But sometimes, approaching students older than you and
      asking for advice can be tough! With this blog, I want students like
      yourselves to have the ability to post about their own experiences and
      share their thoughts so that no younger students will ever feel like
      they're going through this journey alone! Hopefully, I have created a
      resource that can help you on your journey of learning at Tomken and
      potentially other schools too! <br />
      <br />
      For any aspiring AP students out there, if you have any questions/concerns
      about the program, feel free to shoot them my way! Or if you have any
      questions in general, also don't hesitate to reach out! My school email is{" "}
      <b>741182@pdsb.net</b>. Happy reading!
    </p>
  );
  return (
    <Container maxWidth="lg">
      <Header title="Blog" sections={props.sections} />
      <Container maxWidth="md" style={{ marginTop: "15px" }}>
        <Card elevation={0} className={classes.root}>
          <Grid container item xs={9}>
            <CardContent>
              <Typography variant="h4">Anri Gu</Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Creator, Developer, Writer
              </Typography>
              {text}
            </CardContent>
          </Grid>
          <Grid container item xs={3} justify="flex-end" alignItems='flex-start'>
            <CardMedia className={classes.image}>
              <Image
                src="static/images/anri.jpg"
                alt="Creator picture"
                // width="100%"
                width="150px"
                height="200px"
                // height="100%"
              />
            </CardMedia>
          </Grid>
        </Card>
      </Container>
    </Container>
  );
}

export default connect(
  (state) => ({
    currentPost: state.blog.currentPost,
    sections: state.blog.sections,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        waiting: asyncStatus.actions.waiting,
        getSpecPost: blog.actions.getSpecPost,
      },
      dispatch
    )
)(About);
