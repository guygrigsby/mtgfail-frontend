import React, { Component } from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";
import { Button, IconButton } from "react-toolbox/lib/button";
import NavBar from "./NavBar";
import ListDeck from "./ListDeck.js";
import TTSDeck from "./TTSDeck.js";
import FileSaver from "file-saver";

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

  handleChange(event) {
    this.setState({ deck: event.target.value });
  }
  handleURIChange(event) {
    this.setState({ uri: event.target.value });
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

  render() {
    return (
      <>
        <NavBar />
        {this.alertBox()}
        <div>{this.motd()}</div>
        <div>
          <form onSubmit={this.handleURLSubmit}>
            <p>https://deckbox.org/sets/2654229</p>
            <Button variant="primary" type="submit">
              Convert
            </Button>
          </form>
          <form onSubmit={this.handleListSubmit}>
            <Button variant="primary" type="submit">
              Convert
            </Button>
          </form>
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
                Download
              </Button>
              <ListDeck deck={this.state.convertedDeck.ObjectStates[0]} />
            </>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default DeckConverter;
