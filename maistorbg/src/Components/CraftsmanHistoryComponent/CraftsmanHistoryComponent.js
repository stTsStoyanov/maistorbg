import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import CurrentJobAdvertisement from './CurrentJobAdvertisement'
import CurrentOffer from './CurrentOffer';
import CurrentReview from './CurrentReview';
import './CraftsmanHistoryComponent.scss'
// import "./UserMyProfileOffersComponents.scss";

const UserMyProfileOffersComponents = () => {
  const [offers, setOffers] = useState([]);
  const [jobAdvertisement, setJobAdvertisement] = useState([]);

  const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));

  useEffect(() => { //on mounth i get all offers given by the craftsman
    
    const allOffers = JSON.parse(localStorage.getItem('allOffers'));
    const userOffers = allOffers.filter((offer) => offer.authorId === loggedUser.id).reverse();

    console.log("te ti oferta batce:", userOffers)
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
        <div >   {/* className="row row-cols-1 row-cols-sm-2 row-cols-md-3 user-offers-row" */}
          {jobAdvertisement.map((offer, index) => (
            <>
              <h3 className="text-center">Кандидатура №{index+1}</h3>
              <div className='offers-container'>
                {/* <div className='offers-container-child'> */}
                  
                  <CurrentJobAdvertisement jobAdvertisement={offer} />  
                  <CurrentOffer jobAdvertisement={offers[index]}/>
                  
                {/* </div> */}
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



// import React from "react";
// import { Table } from "react-bootstrap";
// // import "./OffersComponent.scss";

// function OfferTable({ offers }) { 
//   return (
//     <Table striped bordered hover>
//       <thead>
//         <tr>
//           <th>Снимка</th>
//           <th>Инфомация</th>
//           <th>Offer Comment</th>
//           <th>View Details</th>
//         </tr>
//       </thead>
//       <tbody>
//         {offers.map((offer) => (
//           <tr key={offer.id}>
//             <td>
//               <img src={offer.image} alt={offer.offerName} style={{ maxWidth: "100px" }} />
//             </td>
//             <td>{offer.offerName}</td>
//             <td>{offer.offerComment}</td>
//             <td>
//               <button className="btn btn-primary">View Details</button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// }
// function CraftsmanHistoryComponent() {
//     const offers = [
//       {
//         image:
//           "https://www.purina.bg/sites/default/files/styles/nppe_article_listing_image_and_description/public/2022-10/7-%D0%BF%D0%BE%D1%80%D0%BE%D0%B4%D0%B8-%D1%81%D0%B8%D0%B2%D0%B8-%D0%BA%D0%BE%D1%82%D0%BA%D0%B8_3.jpg?itok=PCV0kCv6",
//         author: 23432,
//         id: 23432,
//         offerName: "name",
//         offerComment: "tuk ima tekst dobaven ot user-a",
//       },
//       // additional offer objects here
//     ];
  
//     return (
//       <div>
//         <h1>Offer List</h1>
//         <OfferTable offers={offers} />
//       </div>
//     );
//   }
  
//   export default CraftsmanHistoryComponent;