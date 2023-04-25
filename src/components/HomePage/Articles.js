
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import "./Articles.scss";

const Articles = () => {
  const data = JSON.parse(localStorage.getItem("articles")) || [];

  const renderCardContent = (name, content) => {
    const paragraphs = Object.keys(content)
      .filter((key) => key.startsWith("paragraph"))
      .sort((a, b) => Number(a.slice(9)) - Number(b.slice(9)))
      .map((key, index) => (
        <Card.Text key={`paragraph-${key}-${index}`}>{content[key]}</Card.Text>
      ));

    const images = Object.keys(content)
      .filter((key) => key.startsWith("image"))
      .map((key, index) => (
        <Card.Img
          variant="bottom"
          src={content[key]}
          key={`image-${key}-${index}`}
          className="mt-3"
        />
      ));

    const contentElements = [];
    for (let i = 0; i < paragraphs.length || i < images.length; i++) {
      if (i < paragraphs.length) {
        contentElements.push(paragraphs[i]);
      }
      if (i < images.length) {
        contentElements.push(images[i]);
      }
    }

    return (
      <>
        <Card.Title>{name}</Card.Title>
        {contentElements}
      </>
    );
  };

  return (
    <div className="articles">
      <div className="mx-md-5 my-5">
        <h2 className="text-center">Идеи за вашия дом.</h2>
        <Row className="grid-row specific-articles-container">
          <Col md={4} className="grid-item article1">
            <Card className="mb-3">
              <Card.Body>{renderCardContent(data[0].name, data[0])}</Card.Body>
            </Card>
          </Col>
          <Col md={8} className="grid-item article2">
            <Row className="inner-row">
              <Col md={6}>
                <Card className="mb-3">
                  <Card.Body>{renderCardContent(data[1].name, data[1])}</Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="mb-3">
                  <Card.Body>{renderCardContent(data[2].name, data[2])}</Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Articles;
