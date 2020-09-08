import React, { useEffect } from "react";
import TopBar from "./components/HeaderBar/TopBar";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sm, md, lg, xl } from "./util/Constants";
import "fontsource-lato";
import auth from "./redux/auth";

const theme = createMuiTheme({
  //main palette is white (maybe white --> gray gradient)
  //intial white top bar. after mouseover top bar, it turns black
  palette: {
    primary: {
      main: "#ff1a1a", //white
      offColour: "#000000", //black
    },
    background: {
      main: "#ffffff"
    },
    secondary: {
      main: "#ff0000", //red
    },
    tertiary: {
      main: "linear-gradient(to bottom, #ffffff 0%, #e0e0e0 73%)", //gradient white to gray
    },
    hover: {
      main: "#e6e6e6", //darkish gray
    },
  },
  typography: {
    fontFamily: "Lato",
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    marginTop: "20px",
  },
}));

function MainLayout({
  ContentComponent,
  spinner,
  loginStatus,
  username,
  verifyAuth,
}) {
  const classes = useStyles();

  useEffect(() => {
    verifyAuth();
  }, []);

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        {/* <TopBar tabs={Object.values(allTabs(loginStatus, username))} /> */}
        {ContentComponent}
      </ThemeProvider>
    </div>
  );
}

export default connect(
  (state) => ({
    loginStatus: state.auth.loginStatus,
    username: state.auth.username,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        verifyAuth: auth.actions.verifyAuth,
      },
      dispatch
    )
)(MainLayout);
