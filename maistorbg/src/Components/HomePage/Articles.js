import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
// import "./TopCraftsmen.scss";
import "./Articles.scss"

const Articles = () => {
    // Retrieve the array of objects from local storage
    const data = JSON.parse(localStorage.getItem("articles")) || [];

    const renderCardContent = (name, content) => {
        const paragraphs = Object.keys(content)
            .filter((key) => key.startsWith("paragraph"))
            .sort((a, b) => Number(a.slice(9)) - Number(b.slice(9)))
            .map((key, index) => <Card.Text key={index}>{content[key]}</Card.Text>);

        const images = Object.keys(content)
            .filter((key) => key.startsWith("image"))
            .map((key, index) => (
                <Card.Img variant="bottom" src={content[key]} key={index} className="mt-3" />
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
            <Container  className="mx-md-5 my-5">
                <h2 className="text-center">Идеи за вашия дом.</h2>
                <Row style={{ padding: "20px" }}>
                        {data.slice(0, 3).map((item, index) => (
                        <Col sm={12} md={6} lg={4} key={index}>
                            <Card className="mb-3">
                                <Card.Body>{renderCardContent(item.name, item)}</Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Articles;


