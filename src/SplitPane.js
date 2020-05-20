import React, { Component, useState } from "react";
import "./SplitPane.scss";

const SplitPane = props => {
  return (
    <>
      <div className="left">
        <div>{props.table}</div>
      </div>
      <div className="right">
        {props.left}
        {props.right}
        <div>{props.button}</div>
      </div>
    </>
  );
};

export default SplitPane;
