import React, { Component, useState } from "react";
import Row from "react-bootstrap/Row";
import Card from "./Card.js";
import ParseDeck from "./Deck.js";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Table from "react-bootstrap/Table";

class ListDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ObjectStates: props.deck,
      Cards: ParseDeck(props.deck),
      selected: []
    };
  }

  handleChange(event) {
    this.setState({ selected: event.target.value });
  }

  render() {
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Cx</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {this.state.Cards.map((card, i) => {
            return (
              <tr key={i}>
                <td>X</td>
                <td>
                  <Card Name={card.Name} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}
export default ListDeck;