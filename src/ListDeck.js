import React, { Component } from "react";
import Table, { TableHead, TableCell, TableRow } from "react-toolbox/lib/table";

import Card from "./Card.js";
import ParseDeck from "./Deck.js";

const CardModel = {
  Name: { type: String },
  Image: { type: String }
};

const sortByNamesAsc = (a, b) => {
  if (a.localeCompare(b)) return -1;
  if (b.localeCompare(a)) return 1;
  return 0;
};

const sortByNamesDesc = (a, b) => {
  if (a.calories > b.calories) return -1;
  if (a.calories < b.calories) return 1;
  return 0;
};

const compareBy = key => {
  return function(a, b) {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  };
};

const sortBy = key => {
  let arrayCopy = [...this.state.data];
  arrayCopy.sort(this.compareBy(key));
  this.setState({ data: arrayCopy });
};

class ListDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: null,
      selected: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    let sel;
    if (state.selected.length === 0) {
      sel = props.cards.map(() => false);
    } else {
      sel = state.selected;
    }
    return {
      cards: props.cards,
      selected: sel
    };
  }

  handleRowSelect = (event, col, row) => {
    console.log("selected event", event);
    var s = [];
    event.map(row => (s[row] = true));
    this.setState({ selected: s });
  };

  render() {
    return (
      <Table
        model={CardModel}
        onRowSelect={this.handleRowSelect}
        selectable
        multiSelectable
      >
        <TableHead>
          <TableCell string>name</TableCell>
          <TableCell url>image</TableCell>
        </TableHead>
        {this.state.cards.map((item, idx) => (
          <TableRow key={idx} selected={this.state.selected[idx]}>
            <TableCell>{item.Name}</TableCell>
            <TableCell numeric>{item.Image}</TableCell>
          </TableRow>
        ))}
      </Table>
    );
  }
}
export default ListDeck;
