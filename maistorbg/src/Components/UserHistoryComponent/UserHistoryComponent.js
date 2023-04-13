import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from React Router

const UserHistoryComponent = ({ userName, imageUrl }) => {
  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex justify-content-center mt-4">
            <img
              src={
                imageUrl ||
                "https://via.placeholder.com/300x300.png?text=Default+Image"
              }
              alt="Profile"
              className="img-fluid profile-image"
            />
          </div>
          <div className="d-flex justify-content-center mt-4">
            <p className="display-4 text-center">
              Добре дошъл {userName} в твоя профил !
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserHistoryComponent;
