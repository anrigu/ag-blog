import React from "react";
import { Typography, Grid } from "@material-ui/core";

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
          <Typography variant="overline">Created at: {infoHelperText}</Typography>
        </Grid>
      </Grid>
      <Grid item container>
          <Grid container item>
          <Typography variant = "h2">
                {title}
          </Typography>
          </Grid>
          <Grid container item>
              <Typography variant="h6">
                  {description}
              </Typography>
          </Grid>
      </Grid>
    </Grid>
  );
}
