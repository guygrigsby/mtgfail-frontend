import React, { Component, useState } from "react";
import Button from "./Button.js";
import Paper from "@material-ui/core/Paper";
import FontIcon from "react-toolbox/lib/font_icon";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import "regenerator-runtime/runtime";
import App, { Upstream } from "./App.js";
import util from "util";

const Forms = ({ setDeckURL, ...others }) => {
  const [uri, setURI] = useState("");
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        container
        direction="row"
        justify="space-between"
        alignItems="flex-end"
      >
        <Grid item xs={12}>
          <TextField
            id="standard-basic"
            size="small"
            type="text"
            label="Deck URI"
            name="deckuri"
            onChange={event => setURI(event.target.value.trim())}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <Button
            id="URLimport"
            variant="contained"
            onClick={event => setDeckURL(uri)}
          >
            Import
          </Button>
        </Grid>
        <Grid></Grid>
      </Grid>
    </>
  );
};
export default Forms;
