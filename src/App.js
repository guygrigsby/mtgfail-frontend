/* eslint-env es6 */
/* eslint-disable */
import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import { hot } from "react-hot-loader";
import { instanceOf } from "prop-types";
import Forms from "./Forms";
import Alert from "@material-ui/lab/Alert";
import TestData from "./Data.js";
import TTSDeck from "./TTSDeck.js";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import Hero from "./Hero.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import MenuAppBar from "./MenuAppBar.js";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SimpleTabs from "./Tabs.js";
import TestDeck from "./TestData.json";
import EnhancedTable from "./EnhancedTable.js";
import SimpleStorage from "react-simple-storage";

import motd, { haveMODT } from "./motd";

const download = require("./Download.js");

export const Upstream =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://api.mtg.fail";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: null,
      error: null,
      TTSDeck: null
    };
  }

  deleteAll = () => this.setDeck(null);

  saveLocal(key, thing) {
    localStorage.setItem(key, JSON.stringify(thing));
  }
  getLocal(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  setDeck = d => {
    const deck = d;
    this.setState(() => {
      if (deck === null) {
        localStorage.clear();
        return { deck: null };
      }

      this.saveLocal("deck", deck);
      console.log("setting state", JSON.stringify(deck.Cards));
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
  setTTSDeck = TTSdeck => {
    this.setState(() => ({ TTSDeck }));
  };

  ttsDownload = event => {
    download(JSON.stringify(TTSDeck), "deck.json", "text/json");
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

    this.callConvertAPI(fullURI, requestOptions);
  };

  callConvertAPI = (url, requestOptions) => {
    fetch(url, requestOptions)
      .then(response => {
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = `Unexpected response: ${response.status}: ${response.statusText}`;
          console.error("error", error, "status", response.status);
          return Promise.reject(error);
        }
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("expected JSON response");
        }
        return response.json();
      })
      .then(data => {
        this.setTTSDeck(data);
      })
      .catch(error => {
        this.setError(error);
        console.error("Error:", error);
      });
  };

  load = uri => {
    this.callOut(uri);
    this.convertFromURL(uri);
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
        console.log("Got deck set loaded", json.Cards);
      })
      .catch(error => {
        console.error("Error:", error.message);
        this.setError(error.message);
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
        Enabled: () => (this.state.TTSDeck === null ? false : ""),
        Content: (
          <div>
            {this.state.TTSDeck === null ? (
              <div></div>
            ) : (
              <Button
                variant="contained"
                color="secondary"
                onClick={this.ttsDownload}
              >
                TTS Download
              </Button>
            )}
          </div>
        )
      },
      { key: "tab2", Name: "Build", Content: null, Enabled: () => true }
    ];
    console.log("deck loaded", this.deckLoaded());
    return (
      <>
        <CssBaseline />
        <div className="root">
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
              <Grid item lg={12}>
                {motd}
                {this.state.error !== null ? (
                  <Alert severity="error">{this.state.error}</Alert>
                ) : null}
              </Grid>
              <Grid item lg={12}>
                <SimpleTabs tabs={tabs} />
              </Grid>
            </Grid>
            <Grid item lg={12}>
              {this.deckLoaded() && (
                <EnhancedTable clear={this.deleteAll} rows={this.state.deck} />
              )}
            </Grid>
          </Container>
        </div>
      </>
    );
  }
}
export default App;
