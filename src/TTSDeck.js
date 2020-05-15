import React, { Component } from "react";
import Card from "./Card.js";
import ParseDeck from "./Deck.js";

class TTSDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ObjectStates: props.deck,
      Cards: ParseDeck(props.deck)
    };
  }

  render() {
    return (
      <>
        {this.state.Cards.map((card, i) => {
          return (
            <div key={i} xs={6} md={4}>
              <Card Name={card.Name} Image={card.Image} />
            </div>
          );
        })}
      </>
    );
  }
}
export default TTSDeck;
