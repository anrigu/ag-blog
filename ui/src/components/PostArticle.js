import React, { useState } from "react";
import {
  TextField,
  Typography,
  FormControl,
  Select,
  InputLabel,
  Popover,
  Grid,
  Tooltip,
  Container,
} from "@material-ui/core";
import { CssButton, CssIconButton } from "../util/CssButton";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import auth from "../redux/auth";
import blog from "../redux/blog";
import { CssTextField, CssSendTextField } from "../util/CssTextField";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import asyncStatus from "../redux/asyncStatus";
import AsyncSpinner from "../util/AsyncSpinner";
import HelpIcon from "@material-ui/icons/Help";
import Header from "../newComponents/Header";
import DisplayHTML from './DisplayHTML';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: "10px 5px 10px 5px",
  },
  doubleField: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  formControl: {
    width: "100%",
  },
  write: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  preview: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 33,
  },
  body: {
    fontSize: 14,
  },
  blurb: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    border: "1px solid #c1c1c1",
    borderRadius: "4px",
    flexWrap: "nowrap",
  },
  popoverContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "2px 5px 2px 5px",
  },
  textField: {
    width: "90%",
    root: {
      borderWidth: "0px",
    },
  },
  submitButton: {
    marginTop: "10px",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
  autoCompleteTextField: {
    width: "100%",
  },
  form: {
    height: "100%",
    width: "100%",
  },
}));

function PostArticle(props) {
  const [category, setCategory] = useState(null);
  const [title, setTitle] = useState("");
  const [blurb, setBlurb] = useState("");
  const [body, setBody] = useState("");
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [openEmoji, setOpenEmoji] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const mapSections = () => {
    let intendedAudience = props.sections.slice();
    return intendedAudience.filter(
      (section) =>
        !(section.title === "Post An Article" || section.title === "About" || section.title === "Home")
    );
  };

  const onEmojiClick = (event, emoji) => {
    setChosenEmoji(event.native);
    setBlurb(blurb + event.native);
  };

  return (
    <Container maxWidth="lg">
      <AsyncSpinner />
      <Header title="Blog" sections={props.sections} />
      <form
        className={classes.form}
        onSubmit={() => {
          props.postArticle({
            title: title,
            body: body,
            blurb: blurb,
            category: category,
          });
          props.waiting();
        }}
      >
        <div className={classes.write}>
          <div className={classes.root}>
            <Typography align='center' variant='h2' style={{fontSize:22, color:'red', marginBottom:'10px'}}>
              Reminder: You must have an account if you would like to post an
              article!
            </Typography>
            <Container maxWidth="sm">
              <CssTextField
                style={{ width: "100%" }}
                required
                variant="outlined"
                label="Title"
                onChange={(e) => setTitle(e.target.value)}
              ></CssTextField>
            </Container>
          </div>
          <div className={classes.doubleField}>
            <Container
              maxWidth="lg"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Grid container item xs={5} justify="center" alignItems="center">
                <Autocomplete
                  style={{ width: "100%" }}
                  options={mapSections()}
                  classes={{
                    option: classes.option,
                  }}
                  onChange={(event, newCat) => {
                    console.log("new", newCat);
                    setCategory(newCat.categoryName);
                  }}
                  getOptionLabel={(option) => option.title}
                  renderOption={(option) => (
                    <React.Fragment>{option.title}</React.Fragment>
                  )}
                  renderInput={(params) => (
                    <CssTextField
                      {...params}
                      label="Category"
                      variant="outlined"
                      required={true}
                      className={classes.autoCompleteTextField}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </Grid>
              <Grid
                container
                item
                xs={5}
                direction="row"
                wrap="nowrap"
                justify="center"
                alignItems="center"
                style={{ marginLeft: "10px" }}
              >
                <div className={classes.blurb}>
                  <CssSendTextField
                    variant="outlined"
                    multiline
                    onChange={(e) => setBlurb(e.target.value)}
                    placeholder="Tell us about your post in a few short sentences!"
                    className={classes.textField}
                    value={blurb}
                  ></CssSendTextField>
                  <CssIconButton
                    onClick={(e) => {
                      setOpenEmoji(true);
                      setAnchorEl(e.currentTarget);
                    }}
                    size="small"
                    className={classes.emojiButton}
                  >
                    <InsertEmoticonIcon className={classes.emojiIcon} />
                  </CssIconButton>
                  <Popover
                    open={openEmoji}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    onClose={() => {
                      setAnchorEl(null);
                      setOpenEmoji(false);
                    }}
                  >
                    <div className={classes.popoverContainer}>
                      <Picker
                        onSelect={onEmojiClick}
                        emojiTooltip={true}
                        sheetSize={32}
                      />
                    </div>
                  </Popover>
                </div>
                <div style={{ marginLeft: "10px" }}>
                  <Tooltip
                    interactive
                    arrow
                    title={
                      <React.Fragment>
                        <Typography variant="body1">
                          Add a short description of your post here! Keep it
                          short and sweet! (Around 100-200 words)!
                        </Typography>
                      </React.Fragment>
                    }
                  >
                    <HelpIcon style={{ color: "red" }}></HelpIcon>
                  </Tooltip>
                </div>
              </Grid>
            </Container>
          </div>
          <div className={classes.root}>
            <Typography variant="h5">Write your article below</Typography>
            <CssTextField
              required
              multiline
              label="Body"
              variant="outlined"
              onChange={(e) => setBody(e.target.value)}
            ></CssTextField>
          </div>
          <CssButton
            variant="outlined"
            type="submit"
            disabled = {props.loginStatus !== 1}
            className={classes.submitButton}
          >
            Submit
          </CssButton>
        </div>
      </form>

      <div className={classes.preview}>
        <Typography variant="h2">{title}</Typography>
        <DisplayHTML content = {body}/>
      </div>
    </Container>
  );
}

export default connect(
  (state) => ({
    title: state.blog.title,
    body: state.blog.body,
    sections: state.blog.sections,
    loginStatus: state.auth.loginStatus,
  }),
  (dispatch) =>
    bindActionCreators(
      {
        postArticle: blog.actions.postArticle,
        waiting: asyncStatus.actions.waiting,
        // setTitle: blog.actions.setTitle,
        // setBody: blog.actions.setBody,
      },
      dispatch
    )
)(PostArticle);
