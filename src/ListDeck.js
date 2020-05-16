import React, { Component } from "react";
import Table from "react-toolbox/lib/table";
import Card from "./Card.js";
import ParseDeck from "./Deck.js";

const CardModel = {
  Name: { type: String },
  Count: { type: Number }
};

const objectMap = obj => {
  let cards = [];
  Object.fromEntries(
    Object.entries(obj).map(([k, v], i) => {
      cards.push({ Name: k, Count: v });
      console.log(k);
    })
  );
};
class ListDeck extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      selected: []
    };
  }

  handleChange(event) {
    this.setState({ selected: event.target.value });
  }

  render() {
    const data = objectMap(this.props.func());
    console.log(data);
    return (
      <Table
        model={CardModel}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        selectable
        multiSelectable
        selected={this.state.selected}
        source={data}
      />
    );
  }
}
export default ListDeck;
