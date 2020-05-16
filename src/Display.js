import React, { Component } from "react";
class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          flex: 1,
          overflowY: "visible",
          padding: "1.8rem"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Display;
