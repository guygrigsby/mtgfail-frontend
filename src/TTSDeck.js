import React, { Component } from "react";
import Col from "react-bootstrap/Col";
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
            <Col key={i} xs={6} md={4}>
              <Card Name={card.Name} Image={card.Image} />
            </Col>
          );
        })}
      </>
    );
  }
}
export default TTSDeck;
