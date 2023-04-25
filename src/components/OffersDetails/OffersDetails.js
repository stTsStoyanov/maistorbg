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
  const [offerText, setOfferText] = useState("");
const [offeredSum, setOfferedSum] = useState("");
const [offeredTerm, setOfferedTerm] = useState("");
const [showTextLengthAlert, setShowTextLengthAlert] = useState(false);
const handleOfferTextChange = (event) => {
  const value = event.target.value;
  setOfferText(value);
  setShowTextLengthAlert(value.length > 0 && value.length < 25);
};
const handleOfferedSumChange = (event) => {
  setOfferedSum(event.target.value);
};
const handleOfferedTermChange = (event) => {
  setOfferedTerm(event.target.value);
};

const isFormValid = () => {
  return (
    offerText.length >= 25 &&
    offeredSum !== "" &&
    offeredTerm !== "" &&
    offeredSum > 0 &&
    offeredTerm > 0
  );
};

  useEffect(() => {
    const fetchData = async () => {
      const user = await localStorageManager.getItem("loggedUser");
      setLoggedUser(user);
      setIsClient(user ? user.isClient : false);
      setIsLoading(false)
    };
    fetchData();
  }, []);
  const showOfferForms = () => {
    setShowOfferForm(true);
    setHideButton(true);
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
          value={offerText}
          onChange={handleOfferTextChange}
          required
          
        />
      </Form.Group>
      <Form.Group controlId="offeredSum">
        <Form.Label>Въведета цена в лв</Form.Label>
        <Form.Control
          type="number"
          placeholder="Въведете сума"
          name="offeredSum"
          onChange={handleOfferedSumChange}
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
          value={offeredTerm}
          onChange={handleOfferedTermChange}
          min="1"

          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value) || 0);
          }}
          required
 
        />
           {showTextLengthAlert ? (
          <Alert variant="danger" className="offer-details-alerts">
            Въведете минимум 25 символа.
          </Alert>
        ) : null}
        {showAlert ? (
          <Alert variant="success">Предложението е изпратено!</Alert>
        ) : null}
      </Form.Group>
      <Button variant="secondary" type="submit" disabled={!isFormValid()}>
        Изпрати
      </Button>
    </Form>
  );


  return (
    <div>
      {isLoading ? (
        <SpinnerLoader />
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
                      <Card.Text>Нямате нужните умения за тази обява.</Card.Text>
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
