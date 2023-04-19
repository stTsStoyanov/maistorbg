import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Button, Form} from 'react-bootstrap';
import './OffersDetails.scss';
import Offer from "../../model/classes/offer";

function OffersDetails() {
  const { state } = useLocation();
  const { offer } = state;
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
  const isClient = loggedUser ? loggedUser.isClient : false;

  const [showOfferForm, setShowOfferForm] = useState(false); // initialize state variable to false

  const handleOfferSubmit = (event, authorId, jobAdvertisementId) => {
    event.preventDefault(); // prevent default form submission behavior
    const offerText = event.target.elements.offerText.value;
    const offeredSum = event.target.elements.offeredSum.value;
    const offeredTerm = event.target.elements.offeredTerm.value;
    const newOffer = new Offer(authorId, jobAdvertisementId, offerText, offeredSum, offeredTerm);
    console.log('New offer:', newOffer);
    let offers = JSON.parse(localStorage.getItem("allOffers")) || []; // initialize offers to empty array if it doesn't exist in local storage
    offers.push(newOffer);
    localStorage.setItem("allOffers", JSON.stringify(offers));
  };

  const offerForm = (
    <Form className="formOffe" onSubmit={(event) => handleOfferSubmit(event, offer.authorId, offer.jobAdvertisementId)}>
      <Form.Group controlId="offerText">
        <Form.Label>Вашето предложение за офертата</Form.Label>
        <Form.Control type="text" placeholder="Въведете текст" name="offerText" pattern="[a-zA-Z]+" required />
      </Form.Group>
      <Form.Group controlId="offeredSum">
        <Form.Label>Предложете сума</Form.Label>
        <Form.Control type="number" placeholder="Въведете сума" name="offeredSum" min="1" onInput={(e) => {
      e.target.value = Math.max(0, parseInt(e.target.value) || 0) 
    }} required />
      </Form.Group>
      <Form.Group controlId="offeredTerm">
        <Form.Label>Предложете време за изпълнение</Form.Label>
        <Form.Control type="number" placeholder="Въведете дни" name="offeredTerm" min="1" onInput={(e) => {
      e.target.value = Math.max(0, parseInt(e.target.value) || 0) 
    }} required />
      </Form.Group>
      <Button variant="secondary" type="submit">Изпрати</Button>
    </Form>
  );
    

  return (
    <Card className="job-cardd">
      <Card.Img variant="top" src={offer.jobAdvertisementImage} alt="Job Advertisement" />
      <Card.Body>
        <Card.Title>{offer.jobAdvertisementTittle}</Card.Title>
        <Card.Text>{offer.jobAdvertisementText}</Card.Text>
        <Card.Text>Категория: {offer.category}</Card.Text>
        <Card.Text>Дата на създаване: {offer.creationDate}</Card.Text>
        {loggedUser && !isClient ? (
          <div>
            <Button variant="secondary" onClick={() => setShowOfferForm(true)}>Кандидаствай</Button>
            {showOfferForm ? offerForm : null}
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
}

export default OffersDetails;
