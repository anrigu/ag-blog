import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import Header from "./Header";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "fontsource-lato";
import { post1, post2 } from "./mdFiles";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/featured/?sig=123&architecture,nature",
  imgText: "main image description",
  linkText: "Continue reading…",
};

const featuredPosts = [
  {
    title: "Featured post",
    date: "Nov 12",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/featured/?sig=245&architecture,nature",
    imageText: "Image Text",
  },
  {
    title: "Post title",
    date: "Nov 11",
    description:
      "This is a wider card with supporting text below as a natural lead-in to additional content.",
    image: "https://source.unsplash.com/featured/?sig=365&architecture,nature",
    imageText: "Image Text",
  },
];

const sidebar = {
  title: "About",
  description: `Hi everyone! A special hello to fellow Scitech students! 
  My name is Anri Gu and at one point in time, I was in your very spot, stressing about applying to Scitech, 
  or more recently, stressing about applying to high school! 
  I've built this very resource to help you out on your journey of discovery! Welcome!`,

  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter - Scitech", icon: TwitterIcon, url: "https://twitter.com/tomkenscitech" },
    { name: "Twitter - Tomken Road M.S", icon: TwitterIcon, url: "https://twitter.com/tomkenroadms" },
  ],
};

function Blog(props) {
  const classes = useStyles();
  const posts = [post1, post2];
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Blog" sections={props.sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            <Main title="Quick Introductions!" posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              social={sidebar.social}
            />
          </Grid>
        </main>
      </Container>
      <Footer title="Created by Anri Gu" description="Built in React and adapted from Material UI (2020)" />
    </React.Fragment>
  );
}

export default connect(
  (state) => ({
    sections: state.blog.sections,
  }),
  (dispatch) => bindActionCreators({}, dispatch)
)(Blog);
