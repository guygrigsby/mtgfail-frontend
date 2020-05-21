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
import SplitPane, { TabForm } from "./form";
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
class DeckConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decktext: "",
      uri: "",
      errorMessage: "",
      isError: false,
      urifieldActive: true,
      wrapper: React.createRef()
    };
    this.makeErr = this.makeErr.bind(this);
  }
  readFile(path) {
    if (path === undefined) {
      path = "./motd.txt";
    }
    fetch(path, { mode: "no-cors" })
      .then(res => res.text())
      .then(data => {
        this.setState({ motd: data });
      })
      .catch(error => {
        console.error("Can't read file", path, error);
      });
  }

  handleChange(value) {
    this.setState({ decktext: value });
  }
  handleURIChange(value) {
    this.setState({ uri: value });
  }

  handleURLSubmit(event) {
    console.log("handling URI submission", event);
    event.preventDefault();
    event.stopPropagation();

    let url = new URL(Upstream);
    const uri = this.state.uri;
    if (uri === "") {
      this.popup("no URL");
      return;
    }
    const params = { deck: uri };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    let requestOptions = {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        "Content-Type": "text/plain"
      }
      //deck\=https://tappedout.net/mtg-decks/22-01-20-kess-storm
    };

    this.callAPI(url, requestOptions);
  }

  popup(msg) {
    console.error(msg);
  }

  hero() {
    return <h1 className="text-center">Welcome to mtg.fail</h1>;
  }
  makeErr() {
    this.setState({ isError: true });
    this.setState({ errorMessage: "boom" });
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Page hero={<Hero msg="Welcome" />} tabs={<TabForm />} />
      </ThemeProvider>
    );
  }
}
export default DeckConverter;
