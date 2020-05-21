/* eslint-env es6 */
/* eslint-disable */
import React, { Component, useState } from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { Layout, Panel, NavDrawer } from "react-toolbox/lib/layout";
import Link from "react-toolbox/lib/link";
import GithubIcon from "./NavBar";
import SplitPane, { TabForm } from "./form";
import TestData from "./Data.js";
import TTSDeck from "./TTSDeck.js";
import TappedOut from "./Translate.js";
import Display from "./Display.js";
import Page from "./Page.js";
import Hero from "./Hero.js";
import FileSaver from "file-saver";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./AppTheme.js";

const download = payload => {
  FileSaver.saveAs(payload, "deck.json");
};
export const Upstream =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://api.mtg.fail";
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Page hero={<Hero msg="Welcome" />} tabs={<TabForm />} />
    </ThemeProvider>
  );
}
