import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./CraftManProfile.scss"; // Import SCSS file

const CraftManProfile = ({ userName, imageUrl }) => {
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
              Майстор {userName}, добре дошъл в твоя профил !
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex justify-content-center">
            <Link to="/home/myprofile/craftsmen/history" className="btn btn-secondary btn-lg mx-3">
              <span className="btn-text">Твоята история</span>
              <span className="btn-icon"></span>
            </Link>
            <Link to="/home/myprofile/craftsmen/application" className="btn btn-secondary btn-lg mx-3">
              <span className="btn-text">Твоите кандидаствания</span>
              <span className="btn-icon"></span>
            </Link>
            <Link to="/home/myprofile/craftsmen/myinformation" className="btn btn-secondary btn-lg mx-3">
              <span className="btn-text">Твоята информация</span>
              <span className="btn-icon"></span>
            </Link>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <Link to="/home" className="btn btn-secondary btn-lg">
              <span className="btn-text" style={{ whiteSpace: "pre-wrap" }}>
                Изход профил
              </span>
              <span className="btn-icon"></span>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CraftManProfile;
