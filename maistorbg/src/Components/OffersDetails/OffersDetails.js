import React from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './OffersDetails.scss';
import Offer from "../../model/classes/offer";

function OffersDetails() {
  const { state } = useLocation();
  const { offer } = state;  
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
  const isClient = loggedUser ? loggedUser.isClient : false;

  const handleOfferSubmit = (authorId, jobAdvertisementId, offerText, offeredSum, offeredTerm) => {
    let newOffer = new Offer(authorId, jobAdvertisementId, offerText, offeredSum, offeredTerm);
    console.log('New offer:', newOffer);
    let offers = JSON.parse(localStorage.getItem("allOffers"));
    offers.push(newOffer);
    localStorage.setItem("allOffers", JSON.stringify(offers));
  };

  return (
    <Card className="job-cardd">
      <Card.Img variant="top" src={offer.jobAdvertisementImage} alt="Job Advertisement" />
      <Card.Body>
        <Card.Title>{offer.jobAdvertisementTittle}</Card.Title>
        <Card.Text>{offer.jobAdvertisementText}</Card.Text>
        <Card.Text>Категория: {offer.category}</Card.Text>
        <Card.Text>Дата на създаване: {offer.creationDate}</Card.Text>
        {loggedUser || !isClient ? (
          <Button variant="secondary" onClick={() => handleOfferSubmit(loggedUser.id, offer.jobAdvertisementId, "Offer text", 100, "Offered term")}>
            Кандидаствай
          </Button>
        ): null}
      </Card.Body>
    </Card>
  );
  
  
}

export default OffersDetails;

