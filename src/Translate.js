import React, { Component, useState } from "react";
//import CardData from "./scryfall-default-cards-local.json";

class TappedOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      decks: []
    };
  }
  ImportDeck = url => {
    const deck = this.callOut(url);
  };

  callOut = url => {
    const requestOptions = {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache" // *default, no-cache, reload, force-cache, only-if-cached
    };
    const uri = url + "?fmt=txt";
    fetch(uri, requestOptions)
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
        return await response.text();
      })
      .then(data => {
        this.setState(state => {
          const list = this.state.decks.concat(data);
          console.log(data);

          return {
            list,
            value: ""
          };
        });
        console.log(data);
      })
      .catch(error => {
        console.error("Error:", error.message);
      });
  };
}

export default TappedOut;
