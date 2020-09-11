import React from "react";
import { Typography } from "@material-ui/core";
export default function DisplayHTML(props) {
  let splitContent = props.content.split("\n");

  return splitContent.map((line) => (
    <div style={{wordBreak: "break-word"}}>
      {line}
      <br />
    </div>
  ));
}
