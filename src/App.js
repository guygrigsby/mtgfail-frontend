/* eslint-env es6 */
/* eslint-disable */
import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";
import {
  List,
  ListItem,
  ListSubHeader,
  ListDivider,
  ListCheckbox
} from "react-toolbox/lib/list";
import Dialog from "react-toolbox/lib/dialog";
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
import "./App.scss";

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

  alertBox() {
    const iserror = this.state.isError;
    if (!iserror) {
      return <div></div>;
    }
    let msg = this.state.errorMessage;
    return (
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "relative",
          minHeight: "100px"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0
          }}
        >
          <div>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Error</strong>
            <small>Error</small>
          </div>
          <div>{msg}</div>
        </div>
      </div>
    );
  }

  makeErr() {
    this.setState({ isError: true });
    this.setState({ errorMessage: "boom" });
  }

  render() {
    return (
      <Page
        drawerList={
          <List selectable ripple>
            <ListSubHeader caption="section i" />
            <ListItem>
              <Link href="mailto:devs@mtg.fail">Contact</Link>
            </ListItem>
            <ListItem>
              <Link onClick={this.toggleModal}>Donate</Link>
            </ListItem>
            <ListSubHeader caption="section ii" />
            <p>You are a failure. </p>
          </List>
        }
        hero={<Hero msg="Welcome" />}
        tabs={<TabForm />}
      />
    );
  }
}
export default DeckConverter;
