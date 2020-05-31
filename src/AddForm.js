import React, { Component, useState } from "react";
import Button from "./Button.js";
import Paper from "@material-ui/core/Paper";
import FontIcon from "react-toolbox/lib/font_icon";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AutoComplete from "./AutoComplete";
//import AutoComplete from "./Auto";
import util from "util";
const AddForm = ({ addCard, ...others }) => {
  const [card, setCard] = useState(null);
  const [error, setError] = useState(null);
  const [aulist, setAuList] = useState(null);
  const [popup, setPopup] = useState(null);

  console.log(aulist);

  const callback = fire => setPopup(fire);
  return (
    <>
      <Grid
        container
        spacing={3}
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={6}>
          <AutoComplete />
        </Grid>

        <Grid item xs={6}>
          <TextField
            id="multilineAdd"
            variant="outlined"
            size="small"
            label="Add Multiple"
            multiline
            fullWidth
            rows={4}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <Button id="addCardButton" onClick={event => addCard(card)}>
            Add
          </Button>
        </Grid>
      </Grid>
      <div>{aulist !== null && <AutoComplete candidates={aulist} />}</div>
    </>
  );
};
export default AddForm;
