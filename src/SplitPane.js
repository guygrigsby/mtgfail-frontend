import React, { Component, useState } from "react";
import "./SplitPane.scss";

const SplitPane = props => {
  return (
    <div className="wrapper">
      <div className="left">
        {props.left}
        {props.right}
        <div>{props.button}</div>
      </div>
      <div className="right">
        <div>{props.table}</div>
      </div>
    </div>
  );
};

export default SplitPane;
