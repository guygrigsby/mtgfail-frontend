import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const Hero = props => {
  const classes = useStyles();
  return (
    <header
      style={{
        flex: 1,
        overflowY: "visible",
        padding: "1.8rem",
        textAlign: "center"
      }}
    >
      <div className={classes.root}>
        <Alert severity="info">{props.msg}</Alert>
      </div>
    </header>
  );
};

export default Hero;
