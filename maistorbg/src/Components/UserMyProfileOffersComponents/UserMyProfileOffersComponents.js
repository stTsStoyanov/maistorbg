// import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom";
// import CurrentJobAdvertisement from '../SpecificJobAdvertisement/CurrentJobAdvertisement/CurrentJobAdvertisement';

// const UserMyProfileOffersComponents = () => {
//   const [offers, setOffers] = useState([]);

//   useEffect(() => {
//     const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
//     const allOffers = JSON.parse(localStorage.getItem('allJobAdvertisements'));
//     const userOffers = allOffers.filter((offer) => offer.authorId === loggedUser.id);
//     setOffers(userOffers);
//   }, []);

//   return (
//     <div>
//       <h2 className="mb-3">Твоите обяви</h2>
//       <div className="row row-cols- row-cols-sm-2 row-cols-md-3">
//         {offers.map((offer) => (
//           <Link to={`/home/myprofile/user/currentoffers/${offer.jobAdvertisementId}`}>
//             <CurrentJobAdvertisement jobAdvertisement={offer}></CurrentJobAdvertisement>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default UserMyProfileOffersComponents;



import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import CurrentJobAdvertisement from '../SpecificJobAdvertisement/CurrentJobAdvertisement/CurrentJobAdvertisement';
import "./UserMyProfileOffersComponents.scss";

const UserMyProfileOffersComponents = () => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const allOffers = JSON.parse(localStorage.getItem('allJobAdvertisements'));
    const userOffers = allOffers.filter((offer) => offer.authorId === loggedUser.id).reverse();
    setOffers(userOffers);
  }, []);
  return (
    // <div className="user-offers-container">
    //   <h2 className="user-offers-title">Твоите обяви</h2>
    //   {offers.length ? (
    //     <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 user-offers-row">
    //       {offers.map((offer) => (
    //         <Link
    //           to={`/home/myprofile/user/currentoffers/${offer.jobAdvertisementId}`}
    //           style={{ textDecoration: 'none' }}
    //           key={offer.id}
    //         >
    //           <CurrentJobAdvertisement jobAdvertisement={offer} />
    //         </Link>
    //       ))}
    //     </div>
    //   ) : (
    //     <p>Все още нямаш създадени обяви</p>
    //   )}
    // </div>
    <div className="user-offers-container">
      <h2 className="user-offers-title">Твоите обяви</h2>
      {offers.length ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 user-offers-row">
          {offers.map((offer) => (
            <Link
              to={`/home/myprofile/user/currentoffers/${offer.jobAdvertisementId}`}
              style={{ textDecoration: 'none' }}
              key={offer.id}
            >
              <CurrentJobAdvertisement jobAdvertisement={offer} />
            </Link>
          ))}
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
