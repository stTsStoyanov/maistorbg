// import React, { useState, useEffect } from "react";
// import localStorageManager from "../../model/managers/localStorageManager";
// import { delayFunction } from "../../utilFunctions/utilFunctions";
// import { Spinner } from "react-bootstrap";
// import CurrentJobAdvertisement from "../SpecificJobAdvertisement/CurrentJobAdvertisement/CurrentJobAdvertisement";

// export default function UserHistoryComponent() {
//   const [loggedUser, setLoggedUser] = useState(null);
//   const [jobAdvertisements, setJobAdvertisements] = useState([]);
//   const [offers, setOffers] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserAndData = async () => {
//       const user = await delayFunction(localStorageManager.getItem, ["loggedUser"]);
//       setLoggedUser(user);
//       const allJobAdvertisements = await localStorageManager.getItem("allJobAdvertisements");
//       setJobAdvertisements(allJobAdvertisements.filter(job => job.authorId === user.id));
//       const allOffers = await localStorageManager.getItem("allOffers");
//       setOffers(allOffers);
//       setIsLoading(false);
//     };
//     fetchUserAndData();
//   }, []);

//   return (
//     <div>
//       {isLoading ? (
//         <Spinner animation="border" role="status">
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//       ) : (
//         jobAdvertisements.map((jobAdvertisement) => (
//           <div
//             style={{ textDecoration: 'none' }}
//             key={jobAdvertisement.id}
//           >
//             <CurrentJobAdvertisement jobAdvertisement={jobAdvertisement} />
//           </div>
//         ))
//       )}
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import localStorageManager from "../../model/managers/localStorageManager";
import { delayFunction } from "../../utilFunctions/utilFunctions";
import CurrentJobAdvertisement from "../SpecificJobAdvertisement/CurrentJobAdvertisement/CurrentJobAdvertisement";
import OfferCard from "./OfferCard/OfferCard";
import CraftsmanCardPresentingComponent from "./craftsmanCardPresentingComponent/craftsmanCardPresentingComponent";
import CurrentReviewComponentHistory from "./CurrentReviewComponentHistory/CurrentReviewComponentHistory";
import { Card, Row, Col, Button } from 'react-bootstrap';
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
      <div>История</div>
      <div className="outer-container-history">
        {isLoading ? (
          <SpinnerLoader />
        ) : (
          jobAdvertisements.map((jobAdvertisement) => {
            const offer = offers.find((offer) => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId && offer.isAccepted);
            const craftsman = offer ? users.find(user => user.id === offer.authorId) : null;
            console.log(craftsman)
            const currentReview = offer ? allReviews.find(review => review.jobAdvertisementId === offer.jobAdvertisementId) : null
            console.log(currentReview)
            return (
              <div className="card-container-history-user" key={jobAdvertisement.id}>
                <Card className="outer-card">
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
                </Card>
              </div>
            );
          })
        )}
      </div>
      <hr />
    </div>
  );
  // return (
  //   <div>
  //     {isLoading ? (
  //       <Spinner animation="border" role="status">
  //         <span className="visually-hidden">Loading...</span>
  //       </Spinner>
  //     ) : (
  //       jobAdvertisements.map((jobAd) => {
  //         const offer = offers.find((o) => o.jobAdvertisementId === jobAd.jobAdvertisementId && o.isAccepted);
  //         const craftsman = offer ? users.find(u => u.id === offer.authorId) : null;
  //         const review = offer ? allReviews.find(r => r.jobAdvertisementId === offer.jobAdvertisementId) : null;
  //         return (
  //           <div className="card-container-history-user" key={jobAd.id}>
  //             <Card>
  //               <Card.Body>
  //                 <div>
  //                   <CurrentJobAdvertisement jobAdvertisement={jobAd} />
  //                 </div>
  //                 {offer && (
  //                   <div>
  //                     <OfferCard offer={offer} jobAdvertisementId={jobAd.jobAdvertisementId} />
  //                     {craftsman && <CraftsmanCardPresentingComponent craftsman={craftsman} />}
  //                     {review && <CurrentReviewComponentHistory currentReview={review} craftsmanName={craftsman.name} />}
  //                   </div>
  //                 )}
  //                 {!offer && <div>Някой дебне</div>}
  //               </Card.Body>
  //             </Card>
  //           </div>
  //         );
  //       })
  //     )}
  //   </div>

  // )


}
