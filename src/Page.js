import React, { Component, useState } from "react";
import Button from "@material-ui/core/Button";
import MenuAppBar from "./MenuAppBar.js";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import SimpleTabs from "./Tabs.js";

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
      <Container maxWidth="lg">
        <MenuAppBar />
        <Grid
          container
          spacing={3}
          container
          direction="row"
          justify="space-between"
          alignItems="flex-end"
        >
          <Grid item xs={12}>
            {props.hero}
          </Grid>
          <Grid item xs={12}>
            <SimpleTabs tabs={props.tabs} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
