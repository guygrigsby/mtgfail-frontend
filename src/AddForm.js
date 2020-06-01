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

const requestOptions = {
  method: "GET",
  mode: "cors", // no-cors, *cors, same-origin
  cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  credentials: "omit", // include, *same-origin, omit
  redirect: "follow" // manual, *follow, error
};
const AddForm = ({ addCard, ...others }) => {
  const [cardName, setCardName] = useState(null);
  const [error, setError] = useState(null);

  const getCardData = name => {
    const fullURI = new URL(
      `https://api.scryfall.com/cards/named?exact=${name}`
    );

    return fetch(fullURI, requestOptions)
      .then(response => {
        if (!response.ok) {
          const error = `Unexpected response: ${response.status}: ${response.statusText}`;
          console.error("error", error, "status", response.status);
          return Promise.reject(error);
        }
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("expected JSON response");
        }
        return response.json();
      })
      .then(data => {
        addCard({
          Name: data.name,
          Image: data.image_uris.small,
          Cost: data.mana_cost,
          Cmc: data.cmc,
          Type: data.type_line,
          Set: data.set,
          Rarity: data.rarity
        });
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };

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
        <Grid item xs={12}>
          <AutoComplete setCardName={setCardName} />
        </Grid>
        <Grid item xs={6}>
          <Button id="addCardButton" onClick={event => getCardData(cardName)}>
            Add
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default AddForm;
