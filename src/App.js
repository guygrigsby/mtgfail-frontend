import React, { Component } from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Alert from 'react-bootstrap/Alert';

//import Downloader from './Download';
import NavBar from './NavBar';

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
      converted: false,
      wrapper: React.createRef()
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
    let url = new URL("http://localhost:8080")

    if (this.state.isDecksite) {
      let params = {deck: u}
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
      requestOptions = {
        method: 'GET',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        headers: { 
          'Content-Type': 'text/plain', 
        }, 
        //deck\=https://tappedout.net/mtg-decks/22-01-20-kess-storm
      };
    } else {
      requestOptions = {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        headers: { 
          'Content-Type': 'text/plain', 
          'Content-Length': b.length.toString(),
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
          console.log("error", error, "status", response.status)
          return Promise.reject(error);
        }

        this.setState({ convertedDeck: data.value })
        this.setState({ converted: true });
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
        this.setState({ isError: true });
        console.error('There was an error!', error.message);
      });

  };


  render() {
    let convertBox;
    if (this.state.converted) {
      convertBox = <Container>{this.state.convertedDeck}</Container>;
    } else if (this.state.isError) {
      convertBox = <Container>this.state.errorMessage</Container>;
    } else {
      convertBox = <h1 className="text-center">Welcome to mtg.fail</h1>;
    }

    console.log(this.state)
    return(
      <>
        <NavBar />
        <Container fluid="lg">
          <Row>
            <Col>
              <Jumbotron fluid>
                {convertBox}
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={this.handleSubmit}>
                <Tabs defaultActiveKey="deckurltab" id="uncontrolled-tab-example">
                  <Tab eventKey="deckurltab" title="Deck URL">
                    <Form.Group controlId="deckurl">
                      <Form.Control type="url" placeholder="https://deckbox.org/sets/2653175" onChange={this.handleURIChange}/>
                    </Form.Group>
                    <Alert variant="primary">
                      <Alert.Heading>Supported Sites</Alert.Heading>
                      <p>
                        Currently we only support deckbox.org and tappedout.net. If you have a
                        request for another site, please drop us a line at our contact link below.
                      </p>
                      <hr />
                      <p className="mb-0">
                      </p>
                    </Alert>
                  </Tab>
                  <Tab eventKey="decklist" title="Deck List">
                    <Form.Group controlId="decklist.ControlTextarea1">
                      <Form.Control as="textarea" rows="25" value={this.state.deck} onChange={this.handleChange} />
                    </Form.Group>
                  </Tab>
                </Tabs>
                <Button variant="primary" type="submit">
                  Convert
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </>

    );
  }


}

export default DeckConverter
