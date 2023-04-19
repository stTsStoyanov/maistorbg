import React, { useState, useEffect } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link } from "react-router-dom";
import CurrentJobAdvertisement from '../SpecificJobAdvertisement/CurrentJobAdvertisement/CurrentJobAdvertisement';
import CurrentJobAdvertisementsOffers from '../CurrentJobAdvertisementsOffers/CurrentJobAdvertisementsOffers';

const UserMyProfileOffersComponents = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const allOffers = JSON.parse(localStorage.getItem('allJobAdvertisements'));
    const userOffers = allOffers.filter((offer) => offer.authorId === loggedUser.id);
    setOffers(userOffers);
  }, []);

  return (
    <div>
      <h2 className="mb-3">Твоите обяви</h2>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
        {offers.map((offer) => (
          <Link to={`/home/myprofile/user/currentoffers/${offer.jobAdvertisementId}`}>
            <CurrentJobAdvertisement jobAdvertisement={offer}></CurrentJobAdvertisement>
            </Link>
        ))}
          </div>
    </div>
  );
};

export default UserMyProfileOffersComponents;

