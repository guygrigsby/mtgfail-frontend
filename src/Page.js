import React, { Component, useState } from "react";
import Button from "@material-ui/core/Button";
import MenuAppBar from "./MenuAppBar.js";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));

export default function Page(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MenuAppBar />
      <Grid
        container
        spacing={3}
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
      >
        {props.hero}
      </Grid>
      <Container maxWidth="lg">{props.tabs}</Container>
    </div>
  );
}
