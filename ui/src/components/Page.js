import React, { useEffect } from "react";
import { Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PaperContainer from "./body/PaperContainer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import blog from "../redux/blog";
import asyncStatus from "../redux/asyncStatus";
import moment from "moment";
import CircularProgress from "@material-ui/core/CircularProgress";
import Header from "../newComponents/Header";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  parent: {
    background: theme.palette.background.main,
  },
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Page(props) {
  let location = useLocation().pathname;

  const getCat = () => {
    console.log(location);
    let currentSection = props.sections.filter(
      (section) =>
        console.log(section.url === location) || section.url === location
    );
    if (!currentSection) {
      return "All";
    }
    return currentSection[0].categoryName;
  };

  useEffect(() => {
    props.getPosts(getCat());
  }, []);

  const classes = useStyles();

  const convertDate = (isoDate) => {
    let newDate = moment(isoDate);
    return newDate.format("LLLL");
  };

  const createBlurb = (body) => {
    console.log(body);
    return body.slice(0, 200) + " ...";
  };

  return (
    <Container maxWidth="lg" className={classes.layout}>
      <Header title="Blog" sections={props.sections} />
      {props.blogPosts ? (
        props.blogPosts.map((post,ind) => {
          
          return (
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              className={classes.parent}
            >
              {console.log(post)}
              <Grid container item>
                <PaperContainer
                  title={post.title}
                  author={`${post.author.first_name} ${post.author.last_name}`}
                  blurb={post.blurb ? post.blurb : createBlurb(post.body)}
                  postId={post.id}
                  date={convertDate(post.created_at)}
                  waiting={props.waiting}
                  getSpecPost={props.getSpecPost}
                />
              </Grid>
            </Grid>
          );
        })
      ) : (
        <CircularProgress size={30} style={{ color: "red", zIndex: 10 }} />
      )}
    </Container>
  );
}

export default connect(
  (state) => ({
    blogPosts: state.blog.blogPosts,
    sections: state.blog.sections,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        getSpecPost: blog.actions.getSpecPost,
        getPosts: blog.actions.getPosts,
        waiting: asyncStatus.actions.waiting,
      },
      dispatch
    )
)(Page);
