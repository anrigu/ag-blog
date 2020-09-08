import React, { useState } from "react";
import { Grid, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CssButton } from "../../util/CssButton";
import { history } from "../../configStore";
import { useLocation } from "react-router-dom";
import Menu from "./Menu";

const useStyles = makeStyles((theme) => ({
  parent: {
    background: theme.palette.background.main,
    marginBottom: "30px",
  },
  button: {
    marginLeft: "8px",
    marginRight: "8px",
  },
  clicked: {
    marginRight: "20px",
    background: theme.palette.primary.offColour,
    color: theme.palette.background.main,
    "&:hover": {
      background: theme.palette.primary.offColour,
    },
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems:'center',
  },
}));

export default function TopBar({ tabs }) {
  const classes = useStyles();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(location.pathname);

  return (
    <div className={classes.container}>
      {tabs.map((tab, ind) => (
        <Menu currentTab={currentTab} setCurrentTab={setCurrentTab} tab={tab} />
      ))}
    </div>
  );
}
