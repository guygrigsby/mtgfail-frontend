import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import theme from "./AppTheme.js";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

const Hero = props => {
  const classes = useStyles(theme);
  return (
    <header
      style={{
        flex: 1,
        overflowY: "visible",
        textAlign: "center"
      }}
    >
      <Paper elevation={3}>
        <Alert severity={props.severity}>{props.children}</Alert>
      </Paper>
    </header>
  );
};

export default Hero;
