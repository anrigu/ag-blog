import { TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

export const CssTextField = withStyles({
  root: {
    borderWidth: "1px",
    "& .MuiInputBase-input": {
      color: "#3f3939",
    },
    "&:hover": {
      borderWidth: "2px",
    },
    "&:focus": {
      borderWidth: "3px",
    },
    "& .MuiFormLabel-root": {
      color: "black",
    },
    "& label.Mui-focused": {
      color: "black",
    },
    "& label.Mui-error": {
      color: "red",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#c1c1c1",
      },
      "&:error fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
})(TextField);

export const CssSendTextField = withStyles({
  root: {
    "& .MuiInputBase-input": {
      color: "#3f3939",
    },
    "&::placeholder": {
      color: "black",
    },
    "& .MuiFormLabel-root": {
      color: "black",
    },
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "0px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
})(TextField);
