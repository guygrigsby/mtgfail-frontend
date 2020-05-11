import React, { Component } from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import Toast from "react-bootstrap/Toast";
//import Downloader from './Download';
import NavBar from "./NavBar";

const Upstream = "https://api.mtg.fail";

//const Upstream = "http://localhost:8080";
class DeckConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: "",
      uri: "",
      isDecksite: false,
      convertedDeck: "",
      errorMessage: "",
      isError: false,
      converted: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleURLSubmit = this.handleURLSubmit.bind(this);
    this.handleListSubmit = this.handleListSubmit.bind(this);
    this.callAPI = this.callAPI.bind(this);
    this.makeErr = this.makeErr.bind(this);
  }

  handleChange(event) {
    this.setState({ deck: event.target.value });
  }
  handleURIChange(event) {
    this.setState({ uri: event.target.value });
    this.setState({ isDecksite: true });
  }
  handleListSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // curl -X POST https://api.mtg.fail -H 'Content-Type: text/plain' --data-binary @deck.txt
    const b = this.state.deck;
    let requestOptions;
    let url = new URL(Upstream);

    requestOptions = {
      method: "POST",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
      headers: {
        "Content-Type": "text/plain",
        "Content-Length": b.length.toString()
      },
      body: b
    };

    this.callAPI(url, requestOptions);
  }

  handleURLSubmit(event) {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // curl -X POST https://api.mtg.fail -H 'Content-Type: text/plain' --data-binary @deck.txt
    const u = this.state.uri;
    let url = new URL(Upstream);

    let params = { deck: u };
    Object.keys(params).forEach(key =>
      url.searchParams.append(key, params[key])
    );
    let requestOptions = (requestOptions = {
      method: "GET",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "omit", // include, *same-origin, omit
      redirect: "follow", // manual, *follow, error
      headers: {
        "Content-Type": "text/plain"
      }
      //deck\=https://tappedout.net/mtg-decks/22-01-20-kess-storm
    });

    this.callAPI(url, requestOptions);
  }

  callAPI(url, requestOptions) {
    fetch(url, requestOptions)
      .then(async response => {
        console.log(response);
        const data = await response.json();
        console.log("Response", data);

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          console.log("error", error, "status", response.status);
          return Promise.reject(error);
        }

        this.setState({ convertedDeck: data.value });
        this.setState({ converted: true });
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
        this.setState({ isError: true });
        console.error("Error:", error.message);
      });
  }

  health() {
    let res = <Badge variant="success">Server OK</Badge>;
    fetch(Upstream + "/healthz")
      .then(response => {
        if (response.status !== 200) {
          console.warn("Server Unhealthy");
          res = <Badge variant="error">Server Unhealthy</Badge>;
          return Promise.reject(response.status);
        }
      })
      .catch(error => {
        console.error("Error:", error.message);
      });
    return res;
  }

  hero() {
    let convertBox;
    if (this.state.converted) {
      convertBox = <Container>{this.state.convertedDeck}</Container>;
    } else {
      convertBox = <h1 className="text-center">Welcome to mtg.fail</h1>;
    }
    return convertBox;
  }

  alertBox() {
    const iserror = this.state.isError;
    if (!iserror) {
      return <div></div>;
    }
    let msg = this.state.errorMessage;
    return (
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: "relative",
          minHeight: "100px"
        }}
      >
        <Toast
          style={{
            position: "absolute",
            top: 0,
            right: 0
          }}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Error</strong>
            <small>Error</small>
          </Toast.Header>
          <Toast.Body>{msg}</Toast.Body>
        </Toast>
      </div>
    );
  }
  makeErr() {
    this.setState({ isError: true });
    this.setState({ errorMessage: "boom" });
  }

  render() {
    return (
      <>
        <NavBar />
        {this.alertBox()}
        <Container fluid="lg">
          <Row>
            <Col>
              <Jumbotron fluid>{this.hero()}</Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="secondary" onClick={this.makeErr}>
                test
              </Button>
              <Tabs defaultActiveKey="deckurltab" id="uncontrolled-tab">
                <Tab eventKey="deckurltab" title="Deck URL">
                  <Form onSubmit={this.handleURLSubmit}>
                    <Form.Group controlId="deckurl">
                      <Form.Control
                        type="url"
                        placeholder="https://deckbox.org/sets/2653175"
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </Form>
                  <Alert variant="primary">
                    <Alert.Heading>Supported Sites</Alert.Heading>
                    <p>
                      Currently we only support deckbox.org and tappedout.net.
                      If you have a request for another site, please drop us a
                      line at our contact link below.
                    </p>
                    <hr />
                    <p className="mb-0"></p>
                  </Alert>
                </Tab>
                <Tab eventKey="decklist" title="Deck List">
                  <Form onSubmit={this.handleListSubmit}>
                    <Form.Group controlId="decklist.ControlTextarea1">
                      <Form.Control
                        as="textarea"
                        placeholder="1 Phyrexian Arena"
                        rows="25"
                        value={this.state.deck}
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                  </Form>
                </Tab>
              </Tabs>
              <Button variant="primary" type="submit">
                Convert
              </Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default DeckConverter;
