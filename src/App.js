/* eslint-env es6 */
/* eslint-disable */
import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { Layout, Panel, NavDrawer } from "react-toolbox/lib/layout";
import Link from "react-toolbox/lib/link";
import GithubIcon from "./NavBar";
import Forms from "./Forms";
import TestData from "./Data.js";
import TTSDeck from "./TTSDeck.js";
import TappedOut from "./Translate.js";
import Display from "./Display.js";
import Page from "./Page.js";
import Hero from "./Hero.js";
import FileSaver from "file-saver";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./AppTheme.js";

const download = payload => {
  FileSaver.saveAs(payload, "deck.json");
};
export const Upstream =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://api.mtg.fail";
export default function App() {
  const handleListSubmit = event => {
    // curl -X POST https://api.mtg.fail -H 'Content-Type: text/plain' --data-binary @deck.txt
    const b = this.state.deck;
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

    this.callAPI(url, requestOptions);
  };

  const callAPI = (url, requestOptions) => {
    fetch(url, requestOptions)
      .then(async response => {
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
        return await response.json();
      })
      .then(data => {
        this.setState({ convertedDeck: data });
        this.setState({ converted: true });
        console.log(data);
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
        this.setState({ isError: true });
        console.error("Error:", error.message);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Page hero={<Hero msg="Welcome" />} tabs={<Forms />} />
    </ThemeProvider>
  );
}
