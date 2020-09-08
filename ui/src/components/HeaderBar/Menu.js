import React, { useState } from "react";
import { Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CssButton } from "../../util/CssButton";
import { history } from "../../configStore";

const useStyles = makeStyles((theme) => ({
  parent: {
    background: theme.palette.background.main,
  },
  button: {
    marginLeft: "5px",
    marginRight: "5px",
  },
  clicked: {
    background: theme.palette.primary.offColour,
    color: theme.palette.background.main,
    "&:hover": {
      background: theme.palette.primary.offColour,
    },
  },
  menuOption: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    padding: "5px",
  },
  bodyText: {
    padding: "5px",
    fontSize: 14,
  },
}));

export default function Menu({ currentTab, setCurrentTab, tab }) {
  const classes = useStyles();

  return (
    <div className={classes.menuOption}>
      <Tooltip
        interactive
        arrow
        title={
          <React.Fragment>
            <Typography variant="h1" className={classes.title}>
              {tab.name}
            </Typography>
            <div>
              <Typography variant="h2" className={classes.bodyText}>
                {tab.popoverText}
              </Typography>
            </div>
          </React.Fragment>
        }
      >
        <CssButton
          onClick={() => {
            setCurrentTab(`/${tab.route}`);
            history.push(`/${tab.route}`);
          }}
          className={
            currentTab === `/${tab.route}` ? classes.clicked : classes.button
          }
        >
          {tab.name}
        </CssButton>
      </Tooltip>
    </div>
  );
}
