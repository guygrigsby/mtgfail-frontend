import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Card from "./Card.js";
import ParseDeck from "./Deck.js";

const CardModel = {
  Name: { type: String },
  Rarity: { type: String },
  Cmc: { type: Number },
  Cost: { type: String },
  Image: { type: String },
  Colors: { type: [String] },
  Text: { type: String }
};

class ListDeck extends Component {
  state = {
    cards: null,
    selected: []
  };

  static getDerivedStateFromProps(props, state) {
    return {
      cards: props.cards
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
      <TableContainer className="table" component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>CMC</TableCell>
              <TableCell>Rarity</TableCell>
              <TableCell>Set</TableCell>
              <TableCell>Text</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.cards.map((item, idx) => (
              <TableRow key={idx} selected={this.state.selected[idx]}>
                <TableCell>{item.Name}</TableCell>
                <TableCell>{item.Cost}</TableCell>
                <TableCell>{item.Cmc}</TableCell>
                <TableCell>{item.Rarity}</TableCell>
                <TableCell>{item.Set}</TableCell>
                <TableCell>{item.Text}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}
export default ListDeck;
