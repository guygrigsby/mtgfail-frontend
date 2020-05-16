import React, { Component, useState } from "react";
function SplitPane(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row wrap",
        width: "100%",
        padding: "1.8rem"
      }}
      className="SplitPane"
    >
      <div
        style={{
          flex: 1,
          height: "100%",
          width: "50%",
          textAlign: "left",
          position: "relative"
        }}
        className="SplitPane-left"
      >
        {props.left}
        {props.middle}
        {props.right}
      </div>
      {props.table}
      <div
        style={{
          position: "relative",
          minHeight: "100px",
          height: "100%",
          width: "50%",
          flex: 4,
          margin: 10,
          textAlign: "left"
        }}
        className="SplitPane-right"
      ></div>
    </div>
  );
}

export default SplitPane;
