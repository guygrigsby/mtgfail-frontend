import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";

import { AppBar } from "react-toolbox/lib/app_bar";
import {
  List,
  ListItem,
  ListSubHeader,
  ListDivider,
  ListCheckbox
} from "react-toolbox/lib/list";
import Dialog from "react-toolbox/lib/dialog";
import { Button } from "react-toolbox/lib/button";
import { Layout, Panel, NavDrawer } from "react-toolbox/lib/layout";
import { Tab, Tabs } from "react-toolbox/lib/tabs";
import Link from "react-toolbox/lib/link";
import Input from "react-toolbox/lib/input";
import FontIcon from "react-toolbox/lib/font_icon";
import GithubIcon from "./NavBar";
import SplitPane from "./form";
import ListDeck from "./ListDeck.js";
import TTSDeck from "./TTSDeck.js";
import TappedOut from "./Translate.js";
import FileSaver from "file-saver";
import "./App.scss";

const download = payload => {
  FileSaver.saveAs(payload, "deck.json");
};
const Upstream =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://api.mtg.fail";
class DeckConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: "",
      uri: "",
      convertedDeck: {},
      errorMessage: "",
      isError: false,
      converted: false,
      urifieldActive: true,
      drawerActive: false,
      drawerPinned: false,
      modalopen: false,
      deckimport: {},
      index: 0,
      wrapper: React.createRef()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleURIChange = this.handleURIChange.bind(this);
    this.handleURLSubmit = this.handleURLSubmit.bind(this);
    this.handleListSubmit = this.handleListSubmit.bind(this);
    this.callAPI = this.callAPI.bind(this);
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
    this.setState({ deck: value });
  }
  handleURIChange(value) {
    this.setState({ uri: value });
  }
  handleListSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
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

  callAPI(url, requestOptions) {
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
  motd() {
    let motd = "";
    if (this.state.motd !== "") {
      motd = <div>{this.state.motd}</div>;
    } else {
      readFile();
    }
    return motd;
  }
  alert() {
    return (
      <div className="alert">
        <h2>Supported Sites</h2>
        <p>
          Currently we only support deckbox.org and tappedout.net. If you have a
          request for another site, please drop us a line at our contact link
          below.
        </p>
      </div>
    );
  }
  setURIFieldActive(val) {
    this.setState({ urifieldActive: val });
  }

  submitInput = event => {
    if (this.state.urifieldActive) {
      this.handleURLSubmit(event);
    } else {
      this.handleListSubmit(event);
    }
  };
  importDeck = url => {
    const deck = this.callOut(this.state.uri);
  };

  callOut = url => {
    const requestOptions = {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache" // *default, no-cache, reload, force-cache, only-if-cached
    };
    const fullURI = Upstream + "/site?deck=" + url;
    console.log("calling", fullURI);
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
      .then(data => {
        this.setState({ deckimport: data });
        console.log(data);
      })
      .catch(error => {
        console.error("Error:", error.message);
      });
  };

  setIndex = i => this.setState({ index: i });

  toggleDrawerActive = () =>
    this.setState({ drawerActive: !this.state.drawerActive });
  toggleDrawerPinned = () =>
    this.setState({ drawerPinned: !this.state.drawerPinned });
  openGH = () => window.open("https://github.com/guygrigsby/mtgfail");
  toggleModal = () => this.setState({ modalopen: !this.state.modalopen });

  render() {
    return (
      <Layout>
        <div>
          <NavDrawer
            active={this.state.drawerActive}
            pinned={this.state.drawerPinned}
            permanentAt="xxxl"
            onOverlayClick={this.toggleDrawerActive}
          >
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
          </NavDrawer>
        </div>
        <Dialog
          actions={[{ label: "Close", onClick: this.toggleModal }]}
          active={this.state.modalopen}
          onEscKeyDown={this.toggleModal}
          onOverlayClick={this.toggleModal}
          title="Donate"
        >
          <p>BTC</p>
          <p>bc1qw07j7spyavapez2kakknmu4k0dtftl57mrzup4</p>
        </Dialog>

        <Panel>
          <AppBar
            scrollHide={true}
            title="mtg.fail"
            leftIcon="menu"
            onLeftIconClick={this.toggleDrawerActive}
            rightIcon={<GithubIcon />}
            onRightIconClick={this.openGH}
          ></AppBar>
          <div
            style={{
              flexdirection: "column",
              overflowY: "auto",
              padding: "1.8rem"
            }}
          >
            <section>
              <Tabs index={this.state.index} onChange={this.setIndex}>
                <Tab label="Import">
                  <small>Import your decks</small>
                  <SplitPane
                    middle={
                      <Button
                        label="Import"
                        onClick={this.importDeck}
                        raised
                        primary
                      >
                        <FontIcon value="import_export" />
                      </Button>
                    }
                    left={
                      <Input
                        type="text"
                        label="Deck URI"
                        name="deckuri"
                        value={this.state.uri}
                        onChange={this.handleURIChange}
                        maxLength={64}
                      />
                    }
                    right={
                      <Input
                        type="text"
                        label="Deck List"
                        name="decklsit"
                        value={this.state.deck}
                        onChange={this.handleChange}
                        multiline={true}
                        rows={15}
                      />
                    }
                  />
                  {this.state.deck}
                  table={<ListDeck json={this.state.deckimport} />}
                </Tab>
                <Tab label="Build">
                  <small>Build Decks</small>
                  <div
                    style={{
                      flexdirection: "column",
                      padding: "1.8rem"
                    }}
                  >
                    <ListDeck json={this.state.deckimport} />
                  </div>
                </Tab>
                <Tab label="Export">
                  <small>Export your decks to Tabletop Simulator</small>
                  <Button label="TTS" onClick={this.submitInput} raised primary>
                    <FontIcon value="3d_rotation" />
                  </Button>
                </Tab>
              </Tabs>
            </section>

            <div>
              {this.state.converted ? (
                <>
                  <Button
                    variant="success"
                    onClick={() =>
                      download(
                        new Blob([JSON.stringify(this.state.convertedDeck)], {
                          type: "application/json"
                        })
                      )
                    }
                  >
                    Download TTS Deck
                  </Button>
                </>
              ) : (
                <>
                  <h1> Welcome </h1>
                  <p> mtg.fail is your place to fail</p>
                </>
              )}
            </div>
          </div>
        </Panel>
      </Layout>
    );
  }
}
export default DeckConverter;
