import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./OfferCard.scss"

export default function OfferCard({ offer, jobAdvertisementId }) {
  const {
    offerText,
    offeredSum,
    offeredTerm,
    creationDate,
    dateOfAcceptance,
    isReviewLeft,
  } = offer;

  return (
    <Card className="OfferCard">
      <Card.Body>
        <Row>
          <Col><b>Offer Text:</b></Col>
          <Col>{offerText}</Col>
        </Row>
        <Row>
          <Col><b>Offered Sum:</b></Col>
          <Col>{offeredSum}</Col>
        </Row>
        <Row>
          <Col><b>Offered Term:</b></Col>
          <Col>{offeredTerm}</Col>
        </Row>
        <Row>
          <Col><b>Creation Date:</b></Col>
          <Col>{creationDate}</Col>
        </Row>
        <Row>
          <Col><b>Date of Acceptance:</b></Col>
          <Col>{dateOfAcceptance}</Col>
        </Row>
        <Row>
          <Col className='centered-button-text'>
            {isReviewLeft ? (
              <span><b>Вече има оставено ревю</b></span>
            ) : (
                <Link to={`/home/myprofile/user/currentoffers/review/${jobAdvertisementId}`}>
              <Button variant="primary">Остави Ревю</Button>
              </Link>
            )}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
