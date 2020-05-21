import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./ListDeckTheme.js";

import Card from "./Card.js";
import ParseDeck from "./Deck.js";

const CardModel = {
  Name: { type: String },
  Rarity: { type: String },
  Cmc: { type: Number },
  Cost: { type: String },
  Image: { type: String },
  Colors: { type: [String] },
  Text: { type: String},
};
class ListDeck extends Component {
  state = {
    cards: null,
    selected: []
  };

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
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>CMC</TableCell>
                <TableCell>Rarity</TableCell>
                <TableCell>Set</TableCell>
                <TableCell>Colors</TableCell>
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
                <TableCell>{item.Colors}</TableCell>
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
