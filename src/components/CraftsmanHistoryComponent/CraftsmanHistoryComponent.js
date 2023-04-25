import React, { useState, useEffect } from 'react';
import CurrentJobAdvertisement from './CurrentJobAdvertisement'
import CurrentOffer from './CurrentOffer';

const UserMyProfileOffersComponents = () => {
  const [offers, setOffers] = useState([]);
  const [jobAdvertisement, setJobAdvertisement] = useState([]);

  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

  useEffect(() => {
    
    const allOffers = JSON.parse(localStorage.getItem('allOffers'));
    const userOffers = allOffers.filter((offer) => offer.authorId === loggedUser.id).reverse();
    setOffers(userOffers);
  }, []);

  useEffect(() => {

    const allJobAdvertisement = JSON.parse(localStorage.getItem('allJobAdvertisements'));

    const filteredJobs = allJobAdvertisement.filter(job => {
      return offers.some(offer => offer.jobAdvertisementId === job.jobAdvertisementId);
    });

    setJobAdvertisement(filteredJobs);
  }, [offers]);

  return (

    <div className="user-offers-container">
      <h2 className="user-offers-title">Твоята история</h2>
      {offers.length ? (
        <div >  
          {jobAdvertisement.map((offer, index) => (
            <>
              <h3 className="text-center">Кандидатура №{index+1}</h3>
              <div className='offers-container'>
                  <CurrentJobAdvertisement jobAdvertisement={offer} />  
                  <CurrentOffer jobAdvertisement={offers[index]}/>
              </div>
              </>

          ))}
        </div>
      ) : (
        <div className="no-offers-text-container">
          <p className="no-offers-text">Все още нямаш кандидатури по обяви</p>
        </div>
      )}
    </div>


  );
}

export default UserMyProfileOffersComponents;