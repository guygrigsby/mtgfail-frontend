import React, { Component } from "react";

const Display = props => {
  return (
    <div
      style={{
        flex: 1,
        overflowY: "visible",
        padding: "1.8rem"
      }}
    >
      {props.children}
    </div>
  );
};

export default Display;
