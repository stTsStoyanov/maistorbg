import React, { useState, useEffect } from 'react';
import './Home.scss';
import TopCraftsmen from '../../components/HomePage/TopCraftsmen';
import Review from '../../components/HomePage/Review';
import Articles from '../../components/HomePage/Articles';
import Advertisement from '../../components/HomePage/Advertisement';
import localStorageManager from '../../model/managers/localStorageManager';
import { delayFunction } from '../../utilFunctions/utilFunctions';
import { Button, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import houseBanner from "../../images/house-banner.png"
import secondBanner from "../../images/banner2.jpg"
import thirdBanner from "../../images/banner3.jpg"


export default function Home() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [jobAdvertisements, setJobAdvertisements] = useState(null);
  const [allOffers, setAllOffers] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const fetchData = async () => {
    const user = await delayFunction(localStorageManager.getItem, ['loggedUser']);
    setLoggedUser(user);
    if (user && user.isClient === true) {
      const jobAds = await delayFunction(localStorageManager.getItem, ['allJobAdvertisements']);
      setJobAdvertisements(jobAds);
      const offers = await delayFunction(localStorageManager.getItem, ['allOffers']);
      setAllOffers(offers);
    }
  };

  useEffect(() => {
    const fetchDataAsync = async () => {
      await fetchData();
    };
    fetchDataAsync();
  }, []);

  useEffect(() => {
    const unseenOffer = allOffers && allOffers.find((offer) => !offer.hasBeenSeen);
    if (unseenOffer) {
      setShowToast(true);
      unseenOffer.hasBeenSeen = true;
    } else {
      setShowToast(false);
    }
  }, [allOffers]);

  const handleToastClose = () => {
    setShowToast(false);
  };

  return (
    <div className='home'>
      <TopCraftsmen />
      <div>
      <img src={thirdBanner} 
      style={{ width: '100%', maxHeight: '100%' }}
      />
      </div>
      <Review />
      <Advertisement />
      <Articles />
      {showToast && (
        <Toast
          onClose={() => setShowToast(false)}
          delay={5000}
          autohide
          className='toast-container font-color-toast'
          closeButton={true}
          bg='white'>
          <Toast.Body className="font-color-toast font-size-toast">Имате невидянa оферта!</Toast.Body>
        </Toast>
      )}
    </div>
  );
}
