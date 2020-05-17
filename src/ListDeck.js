import React, { Component } from "react";
import Table, { TableHead, TableCell, TableRow } from "react-toolbox/lib/table";

import Card from "./Card.js";
import ParseDeck from "./Deck.js";

const CardModel = {
  Name: { type: String },
  Image: { type: String }
};

const populate = arr => {
  arr.map((item, idx) => {
    <TableRow key={idx}>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.image}</TableCell>
    </TableRow>;
  });
};

class ListDeck extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      cards: null,
      tableData: null,
      selected: []
    };
  }
  static getDerivedStateFromProps(props, state) {
    console.log(props);
    return { cards: props.cards, tableData: populate(props.cards) };
  }

  handleChange(event) {
    this.setState({ selected: event.target.value });
  }

  render() {
    console.log(this.state.cards);
    return (
      <Table
        model={CardModel}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        selectable
        multiSelectable
        selected={this.state.selected}
        source={this.state.cards}
      >
        <TableHead>
          <TableCell string>name</TableCell>
          <TableCell numeric>image</TableCell>
        </TableHead>
        {this.state.tableData}
      </Table>
    );
  }
}
export default ListDeck;
