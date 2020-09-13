import React from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function Image({ src, height, width }) {
  console.log("height", height);
  const useStyles = makeStyles((theme) => ({
    img: {
      objectFit: "cover",
      float: 'right',
      height: height,
      width: width,
    },
  }));
  const classes = useStyles();
  return <img src={src} alt="descriptive" className={classes.img} />;
}
