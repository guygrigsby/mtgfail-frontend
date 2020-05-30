import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
    <Typography className={classes.root}>
      <header
        style={{
          flex: 1,
          overflowY: "visible",
          padding: "1.8rem",
          textAlign: "center"
        }}
      >
        <div className={classes.root}>
          <Alert severity={props.severity}>{props.children}</Alert>
        </div>
      </header>
    </Typography>
  );
};

export default Hero;
