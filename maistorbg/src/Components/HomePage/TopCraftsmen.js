import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./TopCraftsmen.scss"

const TopCraftsmen = () => {
  const usersAndCraftsmen = JSON.parse(localStorage.getItem("users")) || [];
  const craftsmen = usersAndCraftsmen.filter((person) => !person.isClient);
  const topCraftsmen = craftsmen
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 6);

  return (
    <div className="top-craftsmen">
      <Container  className="mx-md-5 my-5 reviews-container">
        <h2 className="text-center">Топ 6 майстора!</h2>
        <Row style={{ padding: "20px" }}>
          {topCraftsmen.map((craftsman, index) => (
            <Col sm={1} md={6} lg={4} key={index}>
              <Card className="craftsman-card mb-3">
              <div className="craftsman-image-container">
                <Card.Img variant="top" src={craftsman.photo} className="craftsman-image" />
                </div>
                <Card.Body>
                  <Card.Title className="craftsman-name">{craftsman.name}</Card.Title>
                  <Card.Text className="craftsman-reviewer">
                    Рейтинг: {craftsman.averageRating}
                    <br />
                    Телефонен номер: {craftsman.phoneNumber}
                    <br />
                    Имейл адрес: {craftsman.email}
                    <br />
                    Умения: {craftsman.skills ? craftsman.skills.join(", ") : "No skills specified"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default TopCraftsmen;



