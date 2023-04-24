import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, Button, Form, Alert, Carousel } from "react-bootstrap";
import "./OffersDetails.scss";
import Offer from "../../model/classes/offer";
import { useNavigate } from "react-router-dom";
import localStorageManager from "../../model/managers/localStorageManager";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
import { Link } from "react-router-dom";

function OffersDetails() {
  const { state } = useLocation();
  const { offer } = state;
  const [loggedUser, setLoggedUser] = useState({});
  const [isClient, setIsClient] = useState(false);
  const navigate = useNavigate();
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [hideButton, setHideButton] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await localStorageManager.getItem("loggedUser");
        setLoggedUser(user);
        setIsClient(user ? user.isClient : false);
        console.log(loggedUser)
        setIsLoading(false)
      } catch (error) {
        console.log("Error fetching data from local storage:", error);
      }
    };
    fetchData();
  }, []);
  const showOfferForms = () => {
    setShowOfferForm(true);
    setHideButton(true); // Add this line to hide the button
  };


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
    localStorageManager.setItem("allOffers", offers);
    setShowAlert(true);

    setTimeout(() => {
      navigate("/home/offers");
    }, 800);
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
    <div>
      {isLoading ? (
        <SpinnerLoader/>
        ) : (
          <Card className="job-cardd">
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
              <div>
                <Card.Text>Обявата е вече взета от друг майстор!</Card.Text>
              </div>
            ) : (
              <div>
                {loggedUser.skills === null ? (
                  <>
                  <Card.Text>Все още не сте избрали категория на експертиза</Card.Text>
                  <Link to={"/home/myprofile/craftsmen/addskills"}>
                  <Button variant="secondary">
                    Изберете умения
                  </Button>
                  </Link>
                  </>
                ) : loggedUser.skills.includes(offer.category) ? (
                  <Button
  variant="secondary"
  onClick={showOfferForms} 
  style={{ display: hideButton ? "none" : "block" }} 
>
  Кандидаствай
</Button>
                ) : (
                  <div>you do not have the needed skill</div>
                )}
                {showOfferForm ? offerForm : null}
              </div>
            )}
          </div>
        ) : null}
      </Card.Body>

    </Card>
          )}
    </div>
  );

}

export default OffersDetails;
