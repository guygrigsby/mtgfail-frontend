import React from "react";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import theme from "./AppTheme.js";

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: "none",
    backgroundColor: `linear-gradient(45deg, #${theme.palette.primary.light} 50%, #${theme.palette.secondary.dark} 90%)`,

    "&:hover": {
      backgroundColor: theme.palette.primary.light
    },
    "&:active": {
      backgroundColor: theme.palette.primary.dark
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    },
    height: 48,
    padding: "0 30px"
  }
}));

const MTGButton = ({ children, label, ...o }) => {
  const classes = useStyles(theme);

  return (
    <Button className={classes.root} {...o}>
      <Typography>{children}</Typography>
    </Button>
  );
};

export default MTGButton;
