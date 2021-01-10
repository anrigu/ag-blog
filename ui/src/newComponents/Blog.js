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
  title: "I Started DI At My High School",
  description:
    "In grade 10, I started a Destination Imagination Chapter at John Fraser. Was it easy? Stressful? Fun? Read on to learn all about the difficulties and rewards of founding a club in high school!",
  image: "https://source.unsplash.com/featured/?sig=123&architecture",
  imgText: "Main image",
  linkText: "Continue reading…",
  link: "/postPage/article/10/", //set to random value for local. 10 for production
};

const featuredPosts = [
  {
    title: "I Started DI At My High School Pt. 2",
    date: "August 12, 2020",
    description:
      "Although I was on a team with peers I barely knew, the DI Globals experience was not I expected! Read on to learn more!",
    image: "https://source.unsplash.com/featured/?sig=245&architecture",
    imageText: "Image Text",
    link: "/postPage/article/2/", //set to random value for local. 2 for production
  },
  {
    title: "How I Won In Defeat",
    date: "August 20, 2020",
    description:
      "The 2016 TBHL competition at Tomken was a rollercoaster ride, filled with ups, downs, twists and turns! Did I win? Lose? Read on to learn more!",
    image: "https://source.unsplash.com/featured/?sig=365&architecture",
    imageText: "Image Text",
    link: "/postPage/article/14/", //set to random value for local. 14 for production
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
    {
      name: "Twitter - Scitech",
      icon: TwitterIcon,
      url: "https://twitter.com/tomkenscitech",
    },
    {
      name: "Twitter - Tomken Road M.S",
      icon: TwitterIcon,
      url: "https://twitter.com/tomkenroadms",
    },
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
      <Footer
        title="Created by Anri Gu"
        description="Built in React and adapted from Material UI (2020)"
      />
    </React.Fragment>
  );
}

export default connect(
  (state) => ({
    sections: state.blog.sections,
  }),
  (dispatch) => bindActionCreators({}, dispatch)
)(Blog);
