import React, { useState } from 'react';

import {Nav, Navbar, NavDropdown, Button, Modal} from 'react-bootstrap';

const NavBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (

    <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand href="#home">mtg.fail</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="justify-content-end">
            <NavDropdown title="fail so hard" id="collasible-nav-dropdown">
              <NavDropdown.Item href="mailto:devs@mtg.fail">Contact</NavDropdown.Item>
              <NavDropdown.Item href="https://github.com/guygrigsby/mtgfail" target="_blank">Contribute</NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item onClick={handleShow}>Donate</NavDropdown.Item>

            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Donate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          BTC
          bc1qw07j7spyavapez2kakknmu4k0dtftl57mrzup4
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default NavBar;
