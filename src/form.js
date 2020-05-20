import React, { Component, useState } from "react";
import { Tab, Tabs } from "react-toolbox/lib/tabs";
import { Button } from "react-toolbox/lib/button";
import FontIcon from "react-toolbox/lib/font_icon";
import Input from "react-toolbox/lib/input";
import ListDeck from "./ListDeck.js";
import App, { Upstream } from "./App.js";

export const TabForm = props => {
  const [index, setIndex] = useState(0);
  const [deckText, setDeckText] = useState("");
  const [uri, setURI] = useState("");
  const [deck, setDeck] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deckLoaded, setDeckLoaded] = useState(false);
  const [error, setError] = useState({});
  const [TTSdeck, setTTSDeck] = useState({});

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

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "2 200px" }}>
        <Input
          type="text"
          label="Deck URI"
          name="deckuri"
          onChange={s => setURI(s.trim())}
        />
        <Input
          type="text"
          label="Deck List"
          name="decklist"
          value={deckText}
          onChange={setDeckText}
          multiline={true}
          rows={5}
        />
        <div>
          <Button label="Import" onClick={load} raised primary>
            <FontIcon value="import_export" />
          </Button>
        </div>
      </div>

      <div
        style={{
          flex: "2 200px",
          display: "flex",
          flexFlow: "column",
          overflowY: "scroll"
        }}
      >
        {deckLoaded ? <ListDeck cards={deck} /> : null}
      </div>
    </div>
  );
};

const SplitPane = props => {
  return (
    <>
      <div
        style={{
          flex: 1,
          flexDirection: "column"
        }}
      >
        <div>{props.table}</div>
      </div>
      <div
        style={{
          flexDirection: "row",
          justifyContent: "flex-start"
        }}
      >
        {props.left}
        {props.right}
        <div>{props.button}</div>
      </div>
    </>
  );
};

export default SplitPane;
