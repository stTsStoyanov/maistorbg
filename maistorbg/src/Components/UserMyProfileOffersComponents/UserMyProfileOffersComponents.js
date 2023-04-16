import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';

const UserMyProfileOffersComponents = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const allOffers = JSON.parse(localStorage.getItem('allJobAdvertisements'));
    const userOffers = allOffers.filter((offer) => offer.authorId === loggedUser.id);
    setOffers(userOffers);
  }, []);

  return (
    <Container>
      <h2 className="mb-3">Твоите оферти</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
        {offers.map((offer) => (
          <div className="col mb-4" key={offer.jobAdvertisementId}>
            <Card className="h-100">
              <Card.Img
                variant="top"
                src={offer.jobAdvertisementImage}
                alt={offer.jobAdvertisementTittle}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title>{offer.jobAdvertisementTittle}</Card.Title>
                <Card.Text>{offer.jobAdvertisementText}</Card.Text>
                <Card.Text>{offer.category}</Card.Text>
                <Card.Text>{offer.creationDate}</Card.Text>
                <Card.Text>{offer.isOfferTaken ? 'Офертата е в процес на изпълнение от избрания от Вас майстор' : 'Офертата е все още свободна'}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default UserMyProfileOffersComponents;

