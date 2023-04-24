import React, { useEffect, useState } from "react";
import { delayFunction } from "../../utilFunctions/utilFunctions";
import localStorageManager from "../../model/managers/localStorageManager";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CurrentJobAdvertisementsOffers.scss";
import CurrentOfferAuthorComponent from "./CurrentOfferAuthorComponent/CurrentOfferAuthorComponent";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";
import CraftsmanPresentingCard from "./craftsmanPresentingCard.js";

export default function CurrentJobAdvertisementsOffers({ jobAdvertisement }) {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState(null)
  const [acceptedOfferId, setAcceptedOfferId] = useState(null);
  const [users, setUsers] = useState(null)

  const fetchData = async () => {
    try {
      const allOffers = await delayFunction(localStorageManager.getItem, ["allOffers"]);
      const jobOffers = allOffers.filter((offer) => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId);
      setOffers(jobOffers);

      const users = await delayFunction(localStorageManager.getItem, ["users"]);
      setAllUsers(users);

      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [jobAdvertisement.jobAdvertisementId])

  const acceptOffer = (offerId) => {
    setAcceptedOfferId(offerId);
    delayFunction(localStorageManager.getItem, ["allOffers"])
      .then((offers) => {
        const updatedOffers = offers.map((jobOffer) => {
          if (jobOffer.offerId === offerId) {
            return {
              ...jobOffer,
              hasBeenSeen: true,
              isAccepted: true,
              isReviewLeft: false,
              dateOfAcceptance: new Date().toLocaleString(),
            };
          } else if (jobOffer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId) {
            return {
              ...jobOffer,
              isAccepted: false,
              hasBeenSeen: true,
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
      });
  };

  const findCurrentUser = (offer) => {
    const craftsman = allUsers.find(user => user.id === offer.authorId);
    if (offer) {
      return <CraftsmanPresentingCard craftsman={craftsman} />
    } else {
      return null;
    }
  }

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
    return <SpinnerLoader />;
  }


  return (
    <div className="parent-div">
      {offers.map((offer) => (
        <div className="outer-card" key={offer.offerId}>
          <Card className="inner-card">
            {offer.authorId && offer.authorId.photo && (
              <Card.Img variant="top" src={offer.offerAuthor.photo} />
            )}
            <Card.Body>
              <div className="name">{offer.offerAuthor && offer.offerAuthor.name}</div>
              <div className="offer-details-container">
                <div className="offer-text"><strong>Оферта:</strong> {offer.offerText}</div>
                <div className="offer-details"><strong>Предложена сума: </strong>{offer.offeredSum}лв</div>
                <div className="offer-details"><strong>Време за изпълнение: </strong>{offer.offeredTerm} дни</div>
                <div className="offer-details"><strong>Дата на създаване:</strong> {offer.creationDate}</div>
                {offer.isAccepted === null ? null : (
                  <div className="offer-details">
                    {offer.isAccepted
                      ? <><strong>{'Офертата е приета на '}</strong>
                        {offer.dateOfAcceptance}
                      </>
                      : <><strong>{'Офертата е отказана на '}</strong>
                        {offer.dateOfRejection}
                      </>
                    }
                  </div>

                )}
              </div>
              {findCurrentUser(offer)}
              {offer.isAccepted !== null && (
                <div className="button-container">
                  {!offer.isAccepted ? (
                    <div className="button-left-align"><strong>Отказана оферта</strong></div>
                  ) : (
                    <Link className="button-left-align" to={`/home/myprofile/user/currentoffers/review/${jobAdvertisement.jobAdvertisementId}`}>
                      <Button>{offer.isAccepted ? "Виж детайли" : "Остави ревю"}</Button>
                    </Link>
                  )}
                </div>
              )}
              {offer.isAccepted === null && (
                <div className="button-container">
                  <Button className="button-left-align" onClick={() => acceptOffer(offer.offerId)}>Приеми офертата</Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );

}