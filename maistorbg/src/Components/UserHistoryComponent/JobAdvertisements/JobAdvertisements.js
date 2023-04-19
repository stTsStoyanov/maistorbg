import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './JobAdvertisements.css';
import AcceptOfferButton from '../../CurrentJobAdvertisementsOffers/AcceptOfferButton/AcceptOfferButton';

const JobAdvertisements = ({ jobAdvertisements, offers }) => {
  return (
    <div>
      {jobAdvertisements.map((jobAdvertisement) => (
        <Card key={jobAdvertisement.jobAdvertisementId}>
            <Row className="offer-header align-items-center">
            <Col className="text-center">
              <h6>Image</h6>
            </Col>
            <Col className="text-center">
              <h6>Advertisement Tittle</h6>
            </Col>
            <Col className="text-center">
              <h6>Advertisement Text</h6>
            </Col>
          </Row>
          <Row className="job-advertisement-row align-items-center">
            <Col>
              <img src={jobAdvertisement.jobAdvertisementImage} alt="" className="card-img-top" />
            </Col>
            <Col>
              <h5 className="card-title">{jobAdvertisement.jobAdvertisementTittle}</h5>
            </Col>
            <Col>
              <p className="card-text">{jobAdvertisement.jobAdvertisementText}</p>
            </Col>
          </Row>
          <Row className="offer-header align-items-center">
            <Col className="text-center">
              <h6>Offer Text</h6>
            </Col>
            <Col className="text-center">
              <h6>Offered Term</h6>
            </Col>
            <Col className="text-center">
              <h6>Offered Sum</h6>
            </Col>
            <Col className="text-center">
              <h6>Action</h6>
            </Col>
          </Row>
          {offers
            .filter((offer) => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId)
            .map((offer) => (
              <Row key={offer.offerId} className="offer-row align-items-center">
                <Col className="text-center">
                  {offer.offerText}
                </Col>
                <Col className="text-center">
                  {`${offer.offeredTerm} дни`}
                </Col>
                <Col className="text-center">
                  {`${offer.offeredSum} лева`}
                </Col>
                <Col className="text-center">
                  <AcceptOfferButton offer={offer}>Accept</AcceptOfferButton>
                </Col>
              </Row>
            ))}
        </Card>
      ))}
    </div>
  );
};

export default JobAdvertisements;
