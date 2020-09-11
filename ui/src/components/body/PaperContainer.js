import React, { useRef } from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  ButtonBase,
  Container,
} from "@material-ui/core";
import { history } from "../../configStore";
import TextBody from "./TextBody";
import Image from "./Image";
import { makeStyles } from "@material-ui/core/styles";
import { smImg, mdImg, lgImg, xlImg } from "../../util/Constants";
import { useResize } from "../../util/UseResize";

export default function PaperContainer(props) {
  const widthRef = useRef();
  const { width, noHeight } = useResize(widthRef);
  const heightRef = useRef();
  const { noWidth, height } = useResize(heightRef);
  const TRANSITION_LENGTH = 0.25;
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      background: theme.palette.background.main,
      transition: `background ${TRANSITION_LENGTH}s ease-in-out, transform ${TRANSITION_LENGTH}s ease-in-out`,
      "&:hover": {
        background: theme.palette.hover.main,
        transition: `background ${TRANSITION_LENGTH}s ease-in-out, transform ${TRANSITION_LENGTH}s ease-in-out`,
        transform: "scale(1.005)",
      },
    },
    buttonBase: {
      width: "100%",
      margin: "20px 10px 20px -2px", //might want to take a look at this -2px thing
      border: "2px solid #F5F5F5",
    },
    details: {
      display: "flex",
      flexDirection: "row",
      height: "100%",
    },
    media: {
      [theme.breakpoints.down("sm")]: {
        width: `${smImg}%`,
      },
      [theme.breakpoints.up("md")]: {
        width: `${mdImg}%`,
      },
      [theme.breakpoints.up("lg")]: {
        width: `${lgImg}%`,
      },
      [theme.breakpoints.up("xl")]: {
        width: `${xlImg}%`,
      },
      height: "100%",
    },
    content: {
      width: "100%",
      height: "100%",
    },
    image: {
      width: "100%",
      height: height,
    },
  }));
  const classes = useStyles();
  return (
    <Container maxWidth='md'>
      <ButtonBase
        focusRipple
        className={classes.buttonBase}
        onClick={() => {
          props.getSpecPost(props.postId);
          props.waiting();
          history.push(`/postPage/article/${props.postId}/`);
        }}
      >
        <Card className={classes.root} elevation={0}>
          <div className={classes.details} ref={heightRef}>
            <Grid item container className={classes.content}>
              <CardContent>
                <TextBody
                  title={props.title}
                  author={props.author} //firstname + lastname
                  description={props.blurb}
                  infoHelperText={props.date}
                />
              </CardContent>
            </Grid>
            {/* <Grid item container className={classes.media} ref={widthRef}>
            <CardMedia title="Helper image" className={classes.image}>
              <Image
                src={props.imageSrc}
                alt="hello"
                width={width}
                height={height}
              />
            </CardMedia>
          </Grid> */}
          </div>
        </Card>
      </ButtonBase>
    </Container>
  );
}
