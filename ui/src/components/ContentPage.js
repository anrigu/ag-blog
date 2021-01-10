import React, { useEffect } from "react";
import { Paper, Typography, Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import blog from "../redux/blog";
import asyncStatus from "../redux/asyncStatus";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useLocation } from "react-router-dom";
import Header from "../newComponents/Header";
import DisplayHTML from "./DisplayHTML";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "30px",
    border: "1px solid #e6e6e6",
    padding: "50px 10px 30px 10px",
    opacity: "100%",
    transition: "opacity 2s ease-in-out",
    marginBottom: "30px",
    width: "100%",
  },
  layout: {
    display: "flex",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  author: {
    display: "flex",
    flexDirection: "column",
  },
}));

function ContentPage(props) {
  const classes = useStyles();
  let location = useLocation().pathname;

  const getId = () => {
    console.log(location);
    let locationSplit = location.split("/");
    console.log(locationSplit[locationSplit.length - 2]);
    return locationSplit[locationSplit.length - 2];
  };

  useEffect(() => {
    props.getSpecPost(getId());
  }, []);

  const convertDate = (isoDate) => {
    let newDate = moment(isoDate);
    return newDate.format("LLLL");
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Header title="Blog" sections={props.sections} />
      <Container maxWidth="md">
        <Paper elevation={0} className={classes.root}>
          {props.currentPost.body ? (
            <div className={classes.layout}>
              <div className={classes.author}>
                <Typography variant="subtitle1">{`Written by: ${props.currentPost.author.first_name} ${props.currentPost.author.last_name}`}</Typography>
                {/* <Typography variant="overline">
                  {convertDate(props.currentPost.created_at)}
                </Typography> */}
              </div>
              <Grid container item direction="column">
                <Typography variant="h2">{props.currentPost.title}</Typography>
              </Grid>
              <Grid container item>
                <div>
                  <DisplayHTML content={props.currentPost.body} />
                </div>
              </Grid>
            </div>
          ) : (
            <CircularProgress size={30} style={{ color: "red" }} />
          )}
        </Paper>
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
)(ContentPage);
