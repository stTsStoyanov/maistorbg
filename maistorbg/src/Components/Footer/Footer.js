import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <Container fluid>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="text-center">
            <h4>&copy; 2023 MaistorBG. Всички права са запазени.</h4>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="text-center">
            <p>Можете да се свържете с нас на :</p>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="text-center">
            <p>+359 885 638 411</p>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="text-center">
            <p>maistorBG@gmail.com</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
