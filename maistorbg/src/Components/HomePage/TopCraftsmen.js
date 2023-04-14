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
    // <Container style={{ border: "1px solid black", padding: "20px" }} className="mx-md-5 my-5">

    // <Container
    // style={{ border: "1px solid black", padding: "20px" }}
    // className="mx-md-5 my-5 text-center">

    <Container style={{ border: "1px solid black", padding: "20px" }} className="mx-md-5 my-5">

      <h2 className="text-center">Top 6 Craftsmen</h2>
      <Row>
        {topCraftsmen.map((craftsman, index) => (
          <Col sm={12} md={6} lg={4} key={index}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{craftsman.name}</Card.Title>
                <Card.Text>
                  Rating: {craftsman.averageRating}
                  <br />
                  Phone Number: {craftsman.number}
                  <br />
                  Email: {craftsman.email}
                  <br />
                  Skills: {craftsman.skills ? craftsman.skills.join(", ") : "No skills specified"}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TopCraftsmen;
