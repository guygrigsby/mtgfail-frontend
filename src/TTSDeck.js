import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Card from "./Card.js";

const ParseDeck = ttsDeck => {
  console.log("ttsDeck", ttsDeck);
  const obs = ttsDeck.ContainedObjects;
  const imgs = ttsDeck.CustomDeck;
  console.log("imgs obj", imgs);
  let cards = [];
  console.log("obs", obs, obs.length);
  for (let i = 0; i < obs.length; i++) {
    const name = obs[i].Nickname;
    const img = imgs[i + 1];
    console.log("img obj", img);
    var card = {};
    card.Name = name;
    card.Image = img.FaceURL;
    console.log("making card", card);

    cards.push(card);
  }
  return cards;
};

class TTSDeck extends Component {
  constructor(props) {
    super(props);
    console.log("deck creating", props.deck);
    this.state = {
      ObjectStates: props.deck,
      Cards: ParseDeck(props.deck)
    };
  }

  render() {
    return (
      <>
        {this.state.Cards.map((card, i) => {
          console.log("rendering card", card);
          return (
            <Col xs={6} md={4}>
              <div id={`card-${i}`}>
                <Card Name={card.Name} Image={card.Image} />
              </div>
            </Col>
          );
        })}
      </>
    );
  }
}
export default TTSDeck;
