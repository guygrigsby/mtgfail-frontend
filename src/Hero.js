import React, { Component } from "react";

const Hero = props => {
  return (
    <header
      style={{
        flex: 1,
        overflowY: "visible",
        padding: "1.8rem",
        textAlign: "center"
      }}
    >
      <h1>{props.msg}</h1>
    </header>
  );
};

export default Hero;
