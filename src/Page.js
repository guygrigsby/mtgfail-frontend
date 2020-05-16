import React, { Component } from "react";
import GithubIcon from "./NavBar";
import { Layout, Panel, NavDrawer } from "react-toolbox/lib/layout";
import { AppBar } from "react-toolbox/lib/app_bar";
import { Button } from "react-toolbox/lib/button";
import Dialog from "react-toolbox/lib/dialog";
class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerActive: false,
      drawerPinned: false,
      modalopen: false
    };
  }
  render() {
    return (
      <Layout>
        <div>
          <NavDrawer
            active={this.state.drawerActive}
            pinned={this.state.drawerPinned}
            permanentAt="xxxl"
            onOverlayClick={this.toggleDrawerActive}
          >
            {this.props.drawerList}
          </NavDrawer>
        </div>
        <Dialog
          actions={[{ label: "Close", onClick: this.toggleModal }]}
          active={this.state.modalopen}
          onEscKeyDown={this.toggleModal}
          onOverlayClick={this.toggleModal}
          title="Donate"
        >
          <p>BTC</p>
          <p>bc1qw07j7spyavapez2kakknmu4k0dtftl57mrzup4</p>
        </Dialog>

        <Panel>
          <AppBar
            scrollHide={true}
            title="mtg.fail"
            leftIcon="menu"
            onLeftIconClick={this.toggleDrawerActive}
            rightIcon={<GithubIcon />}
            onRightIconClick={this.openGH}
          ></AppBar>
          <div
            style={{
              flexdirection: "column",
              overflowY: "auto",
              padding: "1.8rem"
            }}
          >
            <section>{this.props.tabs}</section>

            {this.props.display}
          </div>
        </Panel>
      </Layout>
    );
  }
}
export default Page;
