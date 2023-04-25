import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
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
    <div className="reviews-containerr">
      <div className='reviews-container-specific-style'>
      <h2 className="text-center">Ревюта на най-добирте майстори:</h2>
        <Row className='specific-style-for-reviews-container'>
          {topCraftsmen.map((craftsman) => (
            <Col key={craftsman.id} sm={12} md={6} lg={4} className='column-custom-style-reviews'>
              <Card className="craftsman-card" style={{ width: "450px"}}>
                <div className="craftsman-image-container">
                  <Card.Img
                    variant="top"
                    src={craftsman.photo}
                    className="craftsman-image"
                    style={{ width: "450px", height: "550px" }}
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
      </div>
    </div>
  );
};

export default Reviews;



