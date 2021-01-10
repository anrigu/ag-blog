import React from "react";
import { Typography, Grid } from "@material-ui/core";
import DisplayHTML from "../DisplayHTML";

export default function TextBody({
  title,
  author,
  description,
  infoHelperText,
}) {
  return (
    <Grid container direction="column">
      <Grid item container>
        <Grid container item>
          <Typography variant="subtitle1">Written by: {author}</Typography>
        </Grid>
        <Grid container item>
          {/* <Typography variant="overline">
            Created at: {infoHelperText}
          </Typography> */}
        </Grid>
      </Grid>
      <Grid item container>
        <Grid container item>
          <Typography variant="h2" align='left'>{title}</Typography>
        </Grid>
        <Grid container item>
          <Typography variant="h6" style={{fontSize:16}} align='left'>
            <DisplayHTML content={description}></DisplayHTML>
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
