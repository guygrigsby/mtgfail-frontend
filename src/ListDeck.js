import React, { Component } from "react";
import Table from "react-toolbox/lib/table";
import Card from "./Card.js";
import ParseDeck from "./Deck.js";

const CardModel = {
  Name: { type: String }
};

const objectMap = obj => {
  let cards = [];
  Object.fromEntries(
    Object.entries(obj).map(([k, v], i) => {
      cards.push({ Name: k });
    })
  );
};
class ListDeck extends Component {
  constructor(props) {
    super(props);
    if (props.json === undefined) {
      return;
    }
    this.state = {
      deck: objectMap(props.json),
      selected: []
    };
  }

  handleChange(event) {
    this.setState({ selected: event.target.value });
  }

  render() {
    return (
      <Table
        model={CardModel}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        selectable
        multiSelectable
        selected={this.state.selected}
        source={
          this.state.Cards === undefined ? this.state.deck : this.state.Cards
        }
      />
    );
  }
}
export default ListDeck;
