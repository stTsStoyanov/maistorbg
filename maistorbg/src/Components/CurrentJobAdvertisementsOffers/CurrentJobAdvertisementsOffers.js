import React, { useEffect, useState } from "react";
import { delayFunction } from "../../utilFunctions/utilFunctions";
import localStorageManager from "../../model/managers/localStorageManager";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CurrentJobAdvertisementsOffers.scss";
import CurrentOfferAuthorComponent from "./CurrentOfferAuthorComponent/CurrentOfferAuthorComponent";

export default function CurrentJobAdvertisementsOffers({ jobAdvertisement }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptedOfferId, setAcceptedOfferId] = useState(null);
  // const [updatedAdvertisement, setUpdatedAdvertisement] = useState(null);
  // const [updatedAdvertisemntsList, setUpdatedAdvertisementsList] = useState(null)

  useEffect(() => {
    delayFunction(localStorageManager.getItem, ["allOffers"]).then((allOffers) => {
      const jobOffers = allOffers.filter(
        (offer) => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId
      );
      setOffers(jobOffers);
      setLoading(false);
    });
  }, [jobAdvertisement.jobAdvertisementId]);

  const acceptOffer = (offerId) => {
    setAcceptedOfferId(offerId);
    delayFunction(localStorageManager.getItem, ["allOffers"])
      .then((offers) => {
        const updatedOffers = offers.map((jobOffer) => {
          if (jobOffer.offerId === offerId) {
            return {
              ...jobOffer,
              isAccepted: true,
              isReviewLeft: false,
              dateOfAcceptance: new Date().toLocaleString(),
            };
          } else if (jobOffer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId) {
            return {
              ...jobOffer,
              isAccepted: false,
              dateOfRejection: new Date().toLocaleString(),
            };
          }
          return jobOffer;
        });
        localStorageManager.setItem("allOffers", updatedOffers);
        setOffers(updatedOffers.filter((offer) => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId));
      });

    delayFunction(localStorageManager.getItem, ["allJobAdvertisements"])
      .then(advertisements => {
        const updatedAdvertisement = advertisements.find(advertisement => advertisement.jobAdvertisementId === jobAdvertisement.jobAdvertisementId);
        const updatedAdvertisementsList = advertisements.map((advertisement) => {
          if (advertisement.jobAdvertisementId === jobAdvertisement.jobAdvertisementId) {
            return { ...advertisement, isOfferTaken: true };
          }
          return advertisement;
        });
        localStorageManager.setItem("allJobAdvertisements", updatedAdvertisementsList);
        // setUpdatedAdvertisement(updatedAdvertisement);
        // setUpdatedAdvertisementsList(updatedAdvertisementsList);
      });
  };

  useEffect(() => {
    console.log(jobAdvertisement)
  }, [])

  const renderDate = (offer) => {
    if (offer.isAccepted === null) {
      return null
    } else {
      return <div className="offer-details">Статус: {offer.isAccepted ? `Офертата е приета на ${offer.dateOfAcceptance}` : `Офертата е отказана на ${offer.dateOfRejection}`}</div>
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="parent-div">
      {offers.map((offer) => (
        <div className="outer-card" key={offer.offerId}>
          <Card className="inner-card">
            {offer.offerAuthor && offer.offerAuthor.photo && (
              <Card.Img variant="top" src={offer.offerAuthor.photo} />
            )}
            <Card.Body>
              <div className="name">{offer.offerAuthor && offer.offerAuthor.name}</div>
              <div className="offer-details-container">
                <div className="offer-text">Оферта: {offer.offerText}</div>
                <div className="offer-details">Предложена сума: {offer.offeredSum}лв</div>
                <div className="offer-details">Време за изпълнение:{offer.offeredTerm} дни</div>
                <div className="offer-details">Дата на създаване: {offer.creationDate}</div>
                {offer.isAccepted === null ? null : (
                  <div className="offer-details">
                    {offer.isAccepted
                      ? `Офертата е приета на ${offer.dateOfAcceptance}`
                      : `Офертата е отказана на ${offer.dateOfRejection}`
                    }
                  </div>
                )}
              </div>
              {offer.isAccepted !== null && (
                <div className="button-container">
                  {!offer.isAccepted ? (
                    <div>Отказана оферта</div>
                  ) : (
                    <Link to={`/home/myprofile/user/currentoffers/review/${jobAdvertisement.jobAdvertisementId}`}>
                      <Button>Остави ревю</Button>
                    </Link>
                  )}
                </div>
              )}
              {offer.isAccepted === null && (
                <div className="button-container">
                  <Button onClick={() => acceptOffer(offer.offerId)}>Приеми офертата</Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );

}