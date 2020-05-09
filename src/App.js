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
      uri: '',
      isDecksite: false,
      convertedDeck: '',
      errorMessage: '',
      isError: false,
      converted: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleURIChange = this.handleURIChange.bind(this);
  }

  handleChange(event) {
    this.setState({deck: event.target.value});
  }
  handleURIChange(event) {
    this.setState({uri: event.target.value});
    this.setState({isDecksite: true});
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // Simple POST request with a JSON body using fetch
    // curl -X POST https://api.mtg.fail -H 'Content-Type: text/plain' --data-binary @deck.txt
    const b = this.state.deck;
    const u = this.state.uri;
    let requestOptions;
    let url = new URL("https://api.mtg.fail")

    if (this.state.isDecksite) {
      let params = {deck: u}
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      requestOptions = {
        method: 'GET',
        headers: { 
          'Content-Type': 'text/plain', 
          'Cache-Control': 'no-store,no-cache,must-revalidate',
        }, 
        //deck\=https://tappedout.net/mtg-decks/22-01-20-kess-storm
      };
    } else {
      requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'text/plain', 
          'Cache-Control': 'no-store,no-cache,must-revalidate',
        }, 
        body: b
      };
    }
    fetch(url, requestOptions)
      .then(async response => {
        console.log(response)
        const data = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }

        this.setState({ convertedDeck: data.value })
        this.setState({ converted: true });
        this.handleChange(event);
      })
      .catch(error => {
        this.setState({ errorMessage: error });
        console.error('There was an error!', error);
      });

    console.log(b)


  };


  render() {
    let convertBox;
    if (this.state.converted) {
      convertBox = <Container>this.state.convertedDeck</Container>;
    } else if (this.state.isError) {
      convertBox = <Container>this.state.errorMessage</Container>;
    } else {
      convertBox = <Container>Welcome to mtg.fail!</Container>;
    }
    const deck = this.state.deck;
    return(
      <Container className="p-3">
        <Jumbotron>
          {convertBox}
          <Form onSubmit={this.handleSubmit}>
            <Button variant="primary" type="submit">
              Convert
            </Button>
            <Form.Group controlId="deckurl">
              <Form.Label>Deck URL for tappedout or deckbox.org</Form.Label>
              <Form.Control type="url" placeholder="https://deckbox.org/sets/2653175" onChange={this.handleURIChange}/>
            </Form.Group>
            <Form.Group controlId="decklist.ControlTextarea1">
              <Form.Label>Deck List</Form.Label>
              <Form.Control as="textarea" rows="25" value={deck} onChange={this.handleChange} />
            </Form.Group>

          </Form>
        </Jumbotron>
      </Container>

    );
  }


}

export default DeckConverter
