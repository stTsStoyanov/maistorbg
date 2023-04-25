import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import CurrentJobAdvertisement from '../SpecificJobAdvertisement/CurrentJobAdvertisement/CurrentJobAdvertisement';
import "./UserMyProfileOffersComponents.scss";
import NotificationComponent from './NotificationComponent';
import { NavLink } from 'react-bootstrap';

const UserMyProfileOffersComponents = () => {
  const [jobAdvertisements, setJobAdvertisements] = useState([]);
  const [allOffers, setAllOffers] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const allOffers = JSON.parse(localStorage.getItem('allJobAdvertisements'));
    const userOffers = allOffers.filter((offer) => offer.authorId === loggedUser.id).reverse();
    const offers = JSON.parse(localStorage.getItem("allOffers"));
    setAllOffers(offers);
    setJobAdvertisements(userOffers);

  }, []);
  return (
    <div className="user-offers-container">
      <h2 className="user-offers-title">Твоите обяви</h2>
      {jobAdvertisements.length ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 user-offers-row">
          {jobAdvertisements.map((job) => {
            const unseenOffers = allOffers.filter(offer => offer.jobAdvertisementId === job.jobAdvertisementId && offer.hasBeenSeen === false);
            const notificationCount = unseenOffers.length;
            return (
              <Link
                to={`/home/myprofile/user/currentoffers/${job.jobAdvertisementId}`}
                style={{ textDecoration: 'none', position: 'relative' }}
                key={job.jobAdvertisementId}
                as="li"
              >
                <CurrentJobAdvertisement jobAdvertisement={job} />
                {notificationCount > 0 && <NotificationComponent number={notificationCount} />}
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="no-offers-text-container">
          <p className="no-offers-text">Все още нямаш създадени обяви</p>
        </div>
      )}
    </div>


  );
}

export default UserMyProfileOffersComponents;
