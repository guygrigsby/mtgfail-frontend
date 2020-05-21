import React, { Component, useState } from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import FontIcon from "react-toolbox/lib/font_icon";
import Input from "@material-ui/core/Input";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ListDeck from "./ListDeck.js";
import TestDeck from "./TestData.json";
import App, { Upstream } from "./App.js";
import SplitPane from "./SplitPane.js";

export const TabForm = props => {
  const [index, setIndex] = useState(0);
  const [deckText, setDeckText] = useState("");
  const [uri, setURI] = useState("");
  const [deck, setDeck] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deckLoaded, setDeckLoaded] = useState(false);
  const [error, setError] = useState({});
  const [TTSdeck, setTTSDeck] = useState({});
  const [value, setValue] = React.useState(0);

  const loaded = () => deck !== null;

  const handleListSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    // curl -X POST https://api.mtg.fail -H 'Content-Type: text/plain' --data-binary @deck.txt
    const b = deckText;
    let url = new URL(Upstream);

    let requestOptions = {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
      headers: {
        "Content-Type": "text/plain",
        "Content-Length": b.length.toString()
      },
      body: b
    };

    callAPI(url, requestOptions);
  };

  const callAPI = (url, requestOptions) => {
    fetch(url, requestOptions)
      .then(response => {
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("Oops, we haven't got JSON!");
        }

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = response.status;
          console.error("error", error, "status", response.status);
          return Promise.reject(error);
        }
        return response.json();
      })
      .then(data => {
        setTTSDeck(data.Cards);
        console.log("Set the deck", data.Cards);
      })
      .catch(error => {
        setError(error);
        console.error("Error:", error.message);
      });
  };

  const load = e => {
    setLoading(true);
    callOut(uri);
  };

  const callOut = url => {
    const requestOptions = {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache" // *default, no-cache, reload, force-cache, only-if-cached
    };
    const fullURI = new URL(`${Upstream}/deck?deck=${uri}`);
    console.log("calling ", fullURI);
    fetch(fullURI, requestOptions)
      .then(async response => {
        const contentType = response.headers.get("content-type");
        console.log("Content-Type", contentType);

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = response.status;
          console.error("error", error, "status", response.status);
          return Promise.reject(error);
        }
        return await response.json();
      })
      .then(json => {
        setDeck(json.Cards);
        setLoading(false);
        setDeckLoaded(true);
        console.log("Got deck set loaded", json.Cards);
      })
      .catch(error => {
        console.error("Error:", error.message);
      });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const GetDeck = () => {
    if (process.env.NODE_ENV === "development") {
      return <ListDeck cards={TestDeck.Cards} />;
    }
    if (deckLoaded) {
      return <ListDeck cards={deck} />;
    }
    return null;
  };

  return (
    <Grid
      container
      spacing={3}
      container
      direction="row"
      justify="space-between"
      alignItems="flex-end"
    >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Active">
          <TextField
            id="standard-basic"
            label="Deck URI"
            type="text"
            label="Deck URI"
            name="deckuri"
            variant="outlined"
            fullWidth
            onChange={s => setURI(s.trim())}
          />
        </Tab>
        <Tab label="Active">
          <TextField
            type="text"
            label="Deck List"
            name="decklist"
            value={deckText}
            onChange={setDeckText}
            multiline
            variant="outlined"
            rows={5}
            fullWidth
          />
        </Tab>
      </Tabs>
      <Grid item xs={6}></Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={load}
          raised
          primary
        >
          Import
        </Button>
      </Grid>
      <Grid item xs={12}>
        {GetDeck()}
      </Grid>
    </Grid>
  );
};
export default SplitPane;
