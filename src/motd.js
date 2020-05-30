import React from "react";
import Link from "react-toolbox/lib/link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export const haveMOTD = () => false;

const useStyles = makeStyles(theme => ({
  root: {
    "& > * + *": {
      marginLeft: theme.spacing(2)
    }
  }
}));

const motd = () => {
  if (!haveMODT()) return <div></div>;
  const classes = useStyles(theme);
  return <Typography className={classes.root}></Typography>;
};
export default motd;
