import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: props.Name,
      Image: props.Image
    };
    console.log("card created", this.state);
  }
  render() {
    return (
      <>
        <Row>
          <h3>{this.state.Name}</h3>
        </Row>
        <Row>
          <Image src={this.state.Image} rounded />
        </Row>
      </>
    );
  }
}

export default Card;
