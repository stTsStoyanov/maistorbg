//FIRST OPTION

import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import './Review.scss';

const Reviews = () => {
  const allReviews = JSON.parse(localStorage.getItem('allReviews')) || [];
  const users = JSON.parse(localStorage.getItem('users')) || [];

  const topCraftsmenIds = allReviews
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)
    .map((review) => review.craftsmanId);

  const topCraftsmen = users.filter((user) => topCraftsmenIds.includes(user.id));

  return (
    <div className="reviews-container">
      <Container style={{ border: "1px solid black", padding: "20px" }}>
      <h2 className="text-center">Ревюта на най-добирте майстори:</h2>
        <Row>
          {topCraftsmen.map((craftsman) => (
            <Col key={craftsman.id} sm={12} md={6} lg={4}>
              <Card className="craftsman-card" style={{ width: "350px"}}>
                <div className="craftsman-image-container">
                  <Card.Img
                    variant="top"
                    src={craftsman.photo}
                    className="craftsman-image"
                    style={{ width: "350px", height: "450px" }}
                  />
                </div>
                <Card.Body>
                  <Card.Title className="craftsman-name">
                    Майстор: {craftsman.name}
                  </Card.Title>
                  <Card.Subtitle className="craftsman-reviewer">
                    Ревю от: {' '}
                    {allReviews.find(
                      (review) => review.craftsmanId === craftsman.id
                    )?.clientName}
                  </Card.Subtitle>
                  <Card.Text className="craftsman-review-summary">
                    {allReviews.find(
                      (review) => review.craftsmanId === craftsman.id
                    )?.reviewSummary}
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

export default Reviews;



