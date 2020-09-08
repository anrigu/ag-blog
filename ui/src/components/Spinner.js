import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";

export default function Spinner({ open, dialogText }) {
  return (
    <Dialog open={open} disableBackdropClick={true}>
      <DialogContent>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={30} style={{ color: "red" }} />
          <Typography style={{ paddingLeft: "15px" }} variant="subtitle1">
            {dialogText}
          </Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
}
