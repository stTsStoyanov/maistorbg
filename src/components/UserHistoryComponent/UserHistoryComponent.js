import React, { useState, useEffect } from "react";
import localStorageManager from "../../model/managers/localStorageManager";
import { delayFunction } from "../../utilFunctions/utilFunctions";
import OfferCard from "./OfferCard/OfferCard";
import CraftsmanCardPresentingComponent from "./craftsmanCardPresentingComponent/craftsmanCardPresentingComponent";
import CurrentReviewComponentHistory from "./CurrentReviewComponentHistory/CurrentReviewComponentHistory";
import { Card } from 'react-bootstrap';
import "./UserHistoryComponent.scss"
import CardAdvertisementComponent from "./CardAdvertisementComponent/CardAdvertisementComponent";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";

export default function UserHistoryComponent() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [jobAdvertisements, setJobAdvertisements] = useState([]);
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(null)
  const [allReviews, setAllReviews] = useState(null)

  useEffect(() => {
    const fetchUserAndData = async () => {
      const [user, allJobAdvertisements, allOffers, userList, reviews] = await Promise.all([
        delayFunction(localStorageManager.getItem, ["loggedUser"]),
        delayFunction(localStorageManager.getItem, ["allJobAdvertisements"]),
        delayFunction(localStorageManager.getItem, ["allOffers"]),
        delayFunction(localStorageManager.getItem, ["users"]),
        delayFunction(localStorageManager.getItem, ["allReviews"])
      ]);
      setLoggedUser(user);
      setJobAdvertisements(allJobAdvertisements.filter(job => job.authorId === user.id));
      setOffers(allOffers);
      setUsers(userList)
      setAllReviews(reviews);
      setIsLoading(false);
    };

    fetchUserAndData();
  }, []);

  return (
    <div>
      <div className="history-header-text"><strong>Вашата История</strong></div>
      <div className="outer-container-history">
        {isLoading ? (
          <SpinnerLoader />
        ) : (
          jobAdvertisements.map((jobAdvertisement) => {
            const offer = offers.find((offer) => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId && offer.isAccepted);
            const craftsman = offer ? users.find(user => user.id === offer.authorId) : null;
            const currentReview = offer ? allReviews.find(review => review.jobAdvertisementId === offer.jobAdvertisementId) : null
            return (
              <div className="card-container-history-user" key={jobAdvertisement.id}>
                <div className="outer-card">
                  <Card.Body className="history-card-body">
                    <div className="advertisement-card-history">
                      <CardAdvertisementComponent jobAdvertisement={jobAdvertisement} />
                    </div>
                    <div>
                      <div>
                        {offer ? (
                          <OfferCard offer={offer} jobAdvertisementId={jobAdvertisement.jobAdvertisementId} />
                        ) : (
                          null
                        )}
                      </div>
                      <div>
                        {craftsman && <CraftsmanCardPresentingComponent craftsman={craftsman} />}
                      </div>
                    </div>
                    <div>
                      {currentReview && <CurrentReviewComponentHistory currentReview={currentReview} craftsmanName={craftsman.name} />}
                    </div>
                  </Card.Body>
                </div>
              </div>
            );
          })
        )}
      </div>
      <hr />
    </div>
);
}
