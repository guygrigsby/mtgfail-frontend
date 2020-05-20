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

class ListDeck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sorted: "asc",
      cards: null,
      tableData: null,
      selected: [""]
    };
  }

  static getDerivedStateFromProps(props, state) {
    return { cards: props.cards };
  }

  getSortedData = () => {
    const compare =
      this.state.sorted === "asc" ? sortByNamesAsc : sortByNamesDesc;
    return this.state.cards.sort(compare);
  };

  handleRowSelect = selected => {
    console.log("selected", selected);
    //const sortedData = this.getSortedData();
    //this.setState({ selected: selected.map(item => sortedData[item].name) });
    this.setState({ selected: selected });
  };

  handleSortClick = () => {
    const { sorted } = this.state;
    const nextSorting = sorted === "asc" ? "desc" : "asc";
    this.setState({ sorted: nextSorting });
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
          <TableCell onClick={this.handleSortClick} string>
            name
          </TableCell>
          <TableCell url>image</TableCell>
        </TableHead>
        {this.state.cards.map((item, idx) => (
          <TableRow
            key={idx}
            selected={() => this.state.selected.indexOf(item.name) !== -1}
          >
            <TableCell>{item.Name}</TableCell>
            <TableCell numeric>{item.Image}</TableCell>
          </TableRow>
        ))}
      </Table>
    );
  }
}
export default ListDeck;
