/* eslint-env es6 */
/* eslint-disable */
import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";
import { withStyles } from "@material-ui/core/styles";
import Forms from "./Forms";
import AddForm from "./AddForm";
import Alert from "@material-ui/lab/Alert";
import TestData from "./Data.js";
import TTSDeck from "./TTSDeck.js";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "./Button.js";
import Hero from "./Hero.js";
//import CssBaseline from "@material-ui/core/CssBaseline";
import MenuAppBar from "./MenuAppBar.js";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SimpleTabs from "./Tabs.js";
import TestDeck from "./TestData.json";
import EnhancedTable from "./EnhancedTable.js";
import SimpleStorage from "react-simple-storage";
import theme from "./AppTheme.js";

const download = require("./Download.js");

export const Upstream =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://api.mtg.fail";

const useStyles = withStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(3),
    overflowY: "visible",
    textAlign: "center",
    color: theme.palette.text.secondary,
    elevation: 3
  }
}));

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      error: null
    };
  }

  addCard = card => {
    this.setState((state, props) => {
      let deck = state.deck;
      if (deck === null) {
        deck = [];
      }
      deck.push(card);
      this.saveLocal("deck", deck);
      return { deck };
    });
  };

  deleteAll = () => this.setDeck(null);

  remove = cardNames =>
    this.setState(prevState => {
      const deck = [...prevState.deck];
      console.log("removing", cardNames);
      for (var i = cardNames.length - 1; i >= 0; i--) {
        const selectedIndex = deck.indexOf(cardNames[i]);
        deck.splice(selectedIndex, 1);
      }
      console.log("After removing ", cardNames, " new deck is ", deck);
      this.saveLocal("deck", deck);
      return { deck };
    });

  saveLocal(key, thing) {
    localStorage.setItem(key, JSON.stringify(thing));
  }
  getLocal(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  setDeck = d => {
    const deck = d;
    this.setState(() => {
      if (deck === undefined) {
        return;
      }
      if (deck === null) {
        localStorage.clear();
        return { deck: null };
      }

      this.saveLocal("deck", deck);
      return { deck };
    });
  };
  componentDidMount() {
    const deck = this.getLocal("deck");

    if (deck !== null) {
      this.setDeck(deck);
    }
  }

  deckLoaded = () => {
    return this.state.deck !== null;
  };

  setError = error => {
    this.setState(() => ({ error }));
  };

  ttsDownload = event => {
    this.convertFromDeck(this.state.deck);
  };
  convertFromDeck = deck => {
    const fullURI = new URL(`${Upstream}/tts`);

    const body = JSON.stringify({ Cards: this.state.deck });

    let requestOptions = {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
      body: body,
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };

    return this.callConvertAPI(fullURI, requestOptions);
  };
  convertFromURL = uri => {
    // curl -X POST https://api.mtg.fail -H 'Content-Type: text/plain' --data-binary @deck.txt
    const fullURI = new URL(`${Upstream}/tts?deck=${uri}`);

    let requestOptions = {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      redirect: "follow" // manual, *follow, error
    };

    return this.callConvertAPI(fullURI, requestOptions);
  };

  callConvertAPI = (url, requestOptions) => {
    return fetch(url, requestOptions)
      .then(response => {
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
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
        console.log("setting tts deck", data);
        download(JSON.stringify(data), "deck.json", "text/json");
      })
      .catch(error => {
        console.error("Error:", error);
        this.setError(error);
        console.error("Error:", error);
      });
  };

  load = uri => {
    this.callOut(uri);
  };

  callOut = url => {
    const requestOptions = {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      redirect: "follow" // manual, *follow, error
    };
    const fullURI = new URL(`${Upstream}/scryfall?deck=${url}`);
    fetch(fullURI, requestOptions)
      .then(response => {
        const contentType = response.headers.get("content-type");

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = response.status;
          console.error(
            "response",
            response,
            "error",
            error,
            "status",
            response.status
          );
          return Promise.reject(error);
        }
        return response.json();
      })
      .then(json => {
        this.setDeck(json.Cards);
      })
      .catch(error => {
        console.error("Error:", error.message);
        this.setError(error);
      });
  };

  render() {
    const tabs = [
      {
        key: "tab1",
        Name: "Import",
        Enabled: () => true,
        Content: <Forms setDeckURL={this.load} />
      },
      {
        key: "tab2",
        Name: "Export",
        Enabled: () => (this.state.deck === null ? false : ""),
        Content: (
          <div>
            {this.state.deck === null ? (
              <div></div>
            ) : (
              <Button variant="contained" onClick={this.ttsDownload}>
                TTS Download
              </Button>
            )}
          </div>
        )
      },
      {
        key: "tab2",
        Name: "Build",
        Content: <AddForm addCard={this.addCard} />,
        Enabled: () => true
      }
    ];

    const classes = useStyles(theme);
    return (
      <div className={classes.root}>
        <Grid
          container
          spacing={3}
          direction="column"
          justify="center"
          alignItems="stretch"
        >
          <Grid item xs={12}>
            <Paper elevation={3}>
              <MenuAppBar />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {this.state.error !== null ? (
              <Hero severity="warning">{`Error: ${this.state.error.toString()}`}</Hero>
            ) : (
              <Hero severity="info">Welcome, failures...</Hero>
            )}
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3}>
              <SimpleTabs tabs={tabs} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {this.deckLoaded() && (
              <EnhancedTable
                remove={this.remove}
                clear={this.deleteAll}
                rows={this.state.deck}
              />
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default App;
