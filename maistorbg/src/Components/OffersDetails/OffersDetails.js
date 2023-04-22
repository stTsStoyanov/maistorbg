import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, Button, Form, Alert, Carousel } from "react-bootstrap";
import "./OffersDetails.scss";
import Offer from "../../model/classes/offer";
import { useNavigate } from "react-router-dom";
import localStorageManager from "../../model/managers/localStorageManager";

function OffersDetails() {
  const { state } = useLocation();
  const { offer } = state;
  const [loggedUser, setLoggedUser] = useState({});
  const [isClient, setIsClient] = useState(false);
  const navigate = useNavigate();
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    localStorageManager.getItem("loggedUser").then((user) => {
      setLoggedUser(user);
      setIsClient(user ? user.isClient : false);
    });
  }, []);

  const handleOfferSubmit = async (event, authorId, jobAdvertisementId) => {
    event.preventDefault();
    const offerText = event.target.elements.offerText.value;
    const offeredSum = event.target.elements.offeredSum.value;
    const offeredTerm = event.target.elements.offeredTerm.value;
    const newOffer = new Offer(
      loggedUser.id,
      jobAdvertisementId,
      offerText,
      offeredSum,
      offeredTerm
    );

    console.log("New offer:", newOffer);
    const offers = (await localStorageManager.getItem("allOffers")) || [];
    offers.push(newOffer);
    await localStorageManager.setItem("allOffers", offers);
    setShowAlert(true);

    setTimeout(() => {
      navigate("/home/offers"); // use navigate from react-router-dom instead of window.location.href
    }, 800); // wait for 2 seconds before navigating to the other page
  };

  const offerForm = (
    <Form
      className="formOffe"
      onSubmit={(event) =>
        handleOfferSubmit(event, offer.authorId, offer.jobAdvertisementId)
      }
    >
      <Form.Group controlId="offerText">
        <Form.Label>Вашето предложение за офертата</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Въведете текст"
          name="offerText"
          required
        />
      </Form.Group>
      <Form.Group controlId="offeredSum">
        <Form.Label>Въведета цена в лв</Form.Label>
        <Form.Control
          type="number"
          placeholder="Въведете сума"
          name="offeredSum"
          min="1"
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value) || 0);
          }}
          required
        />
      </Form.Group>
      <Form.Group controlId="offeredTerm">
        <Form.Label>Предложете време за изпълнение в дни</Form.Label>
        <Form.Control
          type="number"
          placeholder="Въведете време в дни"
          name="offeredTerm"
          min="1"
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value) || 0);
          }}
          required
        />
        {showAlert ? (
          <Alert variant="success">Предложението е изпратено!</Alert>
        ) : null}
      </Form.Group>
      <Button variant="secondary" type="submit">
        Изпрати
      </Button>
    </Form>
  );

  return (
    <Card className="job-cardd">
      {/* <Card.Img variant="top" src={offer.jobAdvertisementImage[0]} alt="Job Advertisement" /> */}
      <Carousel>
        {offer.jobAdvertisementImage.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 carousel-image"
              src={image}
              alt={`Job Advertisement ${index}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <Card.Body>
        <Card.Title>{offer.jobAdvertisementTittle}</Card.Title>
        <Card.Text>{offer.jobAdvertisementText}</Card.Text>
        <Card.Text>Категория: {offer.category}</Card.Text>
        <Card.Text>Дата на създаване: {offer.creationDate}</Card.Text>

        {loggedUser && !isClient ? (
          <div>
            {offer.isOfferTaken ? (
              <Card.Text>Обявата е вече взета от друг майстор!</Card.Text>
            ) : (
              <div>
                <Button
                  variant="secondary"
                  onClick={() => setShowOfferForm(true)}
                >
                  Кандидаствай
                </Button>
                {showOfferForm ? offerForm : null}
              </div>
            )}
          </div>
        ) : null}
      </Card.Body>
    </Card>
  );
}

export default OffersDetails;
