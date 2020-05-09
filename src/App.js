import React, { Component } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

var panelStyle = {
  'max-width': '80%',
  margin: '0 auto'
}

class DeckConverter extends Component {
  constructor(props) {
    super(props);

    this.state = {deck: ''}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({deck: event.target.value});
  }

  handleSubmit(event) {
    alert(this.state.deck)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/text' },
      body: this.state.deck
    };
    fetch('https://api.mtg.fail', requestOptions)
      .then(async response => {
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        this.setState({ postId: data.id })
      })
      .catch(error => {
        this.setState({ errorMessage: error });
        console.error('There was an error!', error);
      });

  };


  render() {
    return(
      <Container className="p-3">
        <Jumbotron>

          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="decklist.ControlTextarea1">
              <Form.Label>Deck List</Form.Label>
              <Form.Control as="textarea" rows="25" value={this.state.value} onChange={this.handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
              Convert
            </Button>
          </Form>
        </Jumbotron>
      </Container>

    );
  }

}

export default DeckConverter
