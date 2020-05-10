import React, { useState, Component } from 'react';

import ReactBootstrap, {Container, Nav, Navbar, NavDropdown, Button} from 'react-bootstrap'

const NavBar = () => {

  return (

    <Container>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">mtg.fail</Navbar.Brand>
         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="justify-content-end">
            <NavDropdown title="fail so hard" id="collasible-nav-dropdown">
              <NavDropdown.Item href="mailto:devs@mtg.fail">Contact</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Donate</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default NavBar;
