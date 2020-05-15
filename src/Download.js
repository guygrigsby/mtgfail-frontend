import React, { useState, Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import FileSaver from "file-saver";

const Download = props => {
  const download = props => {
    var blob = new Blob(props.blob, {
      type: props.type
    });
    FileSaver.saveAs(blob, "deck.json");
  };
  return (
    <Button variant="success" onClick={download}>
      Download
    </Button>
  );
};

export default Download;
