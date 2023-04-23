import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./TopCraftsmen.scss"

const TopCraftsmen = () => {
  // Retrieve the array of users and craftsmen from local storage
  const usersAndCraftsmen = JSON.parse(localStorage.getItem("users")) || [];

  // Filter the array to get only the craftsmen
  const craftsmen = usersAndCraftsmen.filter((person) => !person.isClient);

  // Sort the array in descending order by average rating and slice the top 5
  const topCraftsmen = craftsmen
    .sort((a, b) => b.averageRating - a.averageRating)
    .slice(0, 6);

  return (
    <div className="top-craftsmen">
      <Container  className="mx-md-5 my-5 reviews-container">
        <h2 className="text-center">Топ 6 майстора!</h2>
        <Row style={{ padding: "20px" }}>
          {topCraftsmen.map((craftsman, index) => (
            <Col sm={12} md={6} lg={4} key={index}>
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



