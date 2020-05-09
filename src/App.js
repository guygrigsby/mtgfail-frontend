import React, { Component } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

class DeckConverter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deck: '',
      convertedDeck: '',
      errorMessage: '',
      converted: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({deck: event.target.value});
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // Simple POST request with a JSON body using fetch
    // curl -X POST https://api.mtg.fail -H 'Content-Type: text/plain' --data-binary @deck.txt
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: this.state.deck
    };
    fetch('https://api.mtg.fail', requestOptions)
      .then(async response => {
        console.print(response)
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        this.setState({ convertedDeck: data.value })
        this.setState({converted: true});
        this.handleChange(event);
      })
      .catch(error => {
        this.setState({ errorMessage: error });
        console.error('There was an error!', error);
      });


  };


  render() {
    let convertBox;
    if (this.state.converted) {
      convertBox = <Container>this.state.convertedDeck</Container>;
    } 
    return(
      <Container className="p-3">
        <Jumbotron>
          {convertBox}
          <Form onSubmit={this.handleSubmit}>
            <Button variant="primary" type="submit">
              Convert
            </Button>
            <Form.Group controlId="decklist.ControlTextarea1">
              <Form.Label>Deck List</Form.Label>
              <Form.Control as="textarea" rows="25" value={this.state.value} onChange={this.handleChange} />
            </Form.Group>

          </Form>
        </Jumbotron>
      </Container>

    );
  }

}

export default DeckConverter
