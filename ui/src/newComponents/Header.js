import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { history } from "../configStore";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import auth from "../redux/auth";
import blog from "../redux/blog";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: "100%",
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
    width: "100%",
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    "&:focus": {
      outline: "0px",
    },
  },
  button: {},
  clicked: {
    background: theme.palette.primary.offColour,
    color: theme.palette.background.main,
    "&:hover": {
      background: theme.palette.primary.offColour,
    },
  },
  font: {
    fontSize: 12,
    padding: "2px 5px 2px 5px",
  },
}));

function Header(props) {
  const classes = useStyles();
  const { sections, title } = props;

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          <React.Fragment>
            <Link href="/home" color="inherit" className={classes.titleLink}>
              {title}
            </Link>
          </React.Fragment>
        </Typography>

        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            if (props.loginStatus === 1) {
              history.push(`/account`);
            } else {
              history.push(`/login`);
            }
          }}
        >
          {props.loginStatus === 1 ? (
            <Typography variant="overline" className={classes.font}>
              Hi! {props.username}
            </Typography>
          ) : (
            <Typography className={classes.font}>Login/Register</Typography>
          )}
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        className={classes.toolbarSecondary}
      >
        {sections.map((section) => (
          <Link
            component="button"
            color="inherit"
            noWrap
            key={section.title}
            variant="body2"
            href={section.url}
            onClick={() => {
              if (section.url !== "/postArticle" && section.url !== "/about") {
                console.log(section) || props.getPosts(section.categoryName);
              }
              history.push(`${section.url}`);
            }}
            className={classes.toolbarLink}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.array,
  title: PropTypes.string,
};

export default connect(
  (state) => ({
    loginStatus: state.auth.loginStatus,
    username: state.auth.username,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        verifyAuth: auth.actions.verifyAuth,
        getPosts: blog.actions.getPosts,
      },
      dispatch
    )
)(Header);
