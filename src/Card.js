import React, { Component } from "react";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: props.Name,
      Image: props.Image
    };
  }
  display() {
    if (this.state.Image === undefined) {
      return this.state.Name;
    }
    return <img src={this.state.Image} thumbnail />;
  }
  render() {
    return <div>{this.display()}</div>;
  }
}

export default Card;
