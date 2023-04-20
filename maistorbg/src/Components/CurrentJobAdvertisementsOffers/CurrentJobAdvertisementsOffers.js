// import React, { useEffect, useState } from "react";
// import { delayFunction } from "../../utilFunctions/utilFunctions";
// import localStorageManager from "../../model/managers/localStorageManager";
// import { Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import "./CurrentJobAdvertisementsOffers.scss"
// import CurrentOfferAuthorComponent from "./CurrentOfferAuthorComponent/CurrentOfferAuthorComponent";

// export default function CurrentJobAdvertisementsOffers({ jobAdvertisement }) {
//     const [offers, setOffers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [acceptedOfferId, setAcceptedOfferId] = useState(null);

//     useEffect(() => {
//         delayFunction(localStorageManager.getItem, ["allOffers"]).then((allOffers) => {
//             const jobOffers = allOffers.filter(
//                 (offer) => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId
//             );
//             setOffers(jobOffers);
//             setLoading(false);
//         });
//     }, [jobAdvertisement.jobAdvertisementId]);

//     const acceptOffer = (offerId) => {
//         setAcceptedOfferId(offerId);
//         delayFunction(localStorageManager.getItem, ["allOffers"])
//             .then((offers) => {
//                 const updatedOffers = offers.map((jobOffer) => {
//                     if (jobOffer.offerId === offerId) {
//                         return { ...jobOffer, isAccepted: true, isReviewLeft: false, dateOfAcceptance: new Date().toLocaleString() };
//                     } else if (jobOffer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId) {
//                         return { ...jobOffer, isAccepted: false, dateOfRejection: new Date().toLocaleString() };
//                     }
//                     return jobOffer;
//                 });
//                 localStorageManager.setItem("allOffers", updatedOffers);
//                 setOffers(updatedOffers.filter((offer) => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId));
//             });
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="parent-div">
//             {offers.map((offer) => (
//                 <Card className="mb-4" key={offer.offerId}>
//                     <Card.Body className="d-flex flex-row">
//                         <div className="flex-grow-1">
//                             <Card.Title>{offer.offerText}</Card.Title>
//                             <Card.Subtitle className="mb-2 text-muted">{offer.offeredSum}</Card.Subtitle>
//                             <Card.Text>{offer.offeredTerm}</Card.Text>
//                             <Card.Text>{offer.creationDate}</Card.Text>
//                         </div>
//                         {offer.isAccepted !== null && (
//                             <div>
//                                 {!offer.isAccepted ? (
//                                     <div>Отказана оферта</div>
//                                 ) : (
//                                     <Link to={`/home/myprofile/user/currentoffers/review/${jobAdvertisement.jobAdvertisementId}`}>
//                                         <Button>Остави ревю</Button>
//                                     </Link>
//                                 )}
//                             </div>
//                         )}
//                         {offer.isAccepted === null && (
//                             <button onClick={() => acceptOffer(offer.offerId)}>Приеми обявата</button>
//                         )}
//                         <CurrentOfferAuthorComponent offer={offer}></CurrentOfferAuthorComponent>
//                     </Card.Body>
//                 </Card>
//             ))}
//         </div>
//     );
// }



// import React, { useEffect, useState } from "react";
// import { delayFunction } from "../../utilFunctions/utilFunctions";
// import localStorageManager from "../../model/managers/localStorageManager";
// import { Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import "./CurrentJobAdvertisementsOffers.scss";
// import CurrentOfferAuthorComponent from "./CurrentOfferAuthorComponent/CurrentOfferAuthorComponent";

// export default function CurrentJobAdvertisementsOffers({ jobAdvertisement }) {
//     const [offers, setOffers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [acceptedOfferId, setAcceptedOfferId] = useState(null);

//     useEffect(() => {
//         delayFunction(localStorageManager.getItem, ["allOffers"]).then((allOffers) => {
//             const jobOffers = allOffers.filter(
//                 (offer) => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId
//             );
//             setOffers(jobOffers);
//             setLoading(false);
//         });
//     }, [jobAdvertisement.jobAdvertisementId]);

//     const acceptOffer = (offerId) => {
//         setAcceptedOfferId(offerId);
//         delayFunction(localStorageManager.getItem, ["allOffers"])
//             .then((offers) => {
//                 const updatedOffers = offers.map((jobOffer) => {
//                     if (jobOffer.offerId === offerId) {
//                         return {
//                             ...jobOffer,
//                             isAccepted: true,
//                             isReviewLeft: false,
//                             dateOfAcceptance: new Date().toLocaleString(),
//                         };
//                     } else if (jobOffer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId) {
//                         return {
//                             ...jobOffer,
//                             isAccepted: false,
//                             dateOfRejection: new Date().toLocaleString(),
//                         };
//                     }
//                     return jobOffer;
//                 });
//                 localStorageManager.setItem("allOffers", updatedOffers);
//                 setOffers(updatedOffers.filter((offer) => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId));
//             });
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="parent-div">
//             {offers.map((offer) => (
//                 <div className="card-container" key={offer.offerId}>
//                     <div className="offer-details-container">
//                         <div className="offer-text">{offer.offerText}</div>
//                         <div className="offer-details">{offer.offeredSum}</div>
//                         <div className="offer-details">{offer.offeredTerm}</div>
//                         <div className="offer-details">{offer.creationDate}</div>
//                     </div>
//                     <div className="card-and-button-container">
//                         <Card className="inner-card">
//                             <Card.Img variant="top" src={offer.offerAuthor.photo || "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"} />
//                             <Card.Body>
//                                 <Card.Title>{offer.offerAuthor.name}</Card.Title>
//                                 {offer.isAccepted !== null && (
//                                     <div>
//                                         {!offer.isAccepted ? (
//                                             <div>Отказана оферта</div>
//                                         ) : (
//                                             <Link to={`/home/myprofile/user/currentoffers/review/${jobAdvertisement.jobAdvertisementId}`}>
//                                                 <Button>Остави ревю</Button>
//                                             </Link>
//                                         )}
//                                     </div>
//                                 )}
//                                 {offer.isAccepted === null && <button onClick={() => acceptOffer(offer.offerId)}>Accept</button>}
//                             </Card.Body>
//                         </Card>
//                     </div>
//                     <CurrentOfferAuthorComponent offer={offer}></CurrentOfferAuthorComponent>
//                 </div>
//             ))}
//         </div>
//     )
// }


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
    };

    const renderDate = (offer) => {
        if (offer.isAccepted === null) {
            return null
        } else {
            return  <div className="offer-details">Статус: {offer.isAccepted ? `Офертата е приета на ${offer.dateOfAcceptance}` : `Офертата е отказана на ${offer.dateOfRejection}`}</div>
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
                      <button onClick={() => acceptOffer(offer.offerId)}>Accept</button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      );
      
}



{/* // return (
//     <div className="parent-div">
//         {offers.map((offer) => ( */}
//             <div className="card-container" key={offer.offerId}>
//                 <div className="offer-details-container">
//                     <div className="offer-text">{offer.offerText}</div>
//                     <div className="offer-details">{offer.offeredSum}</div>
//                     <div className="offer-details">{offer.offeredTerm}</div>
//                     <div className="offer-details">{offer.creationDate}</div>
//                 </div>
//                 <div className="card-and-button-container">
//                     <Card className="inner-card">
//                         {offer.offerAuthor && offer.offerAuthor.photo && (
//                             <Card.Img variant="top" src={offer.offerAuthor.photo} />
//                         )}
//                         <Card.Body>
//                             <Card.Title>{offer.offerAuthor && offer.offerAuthor.name}</Card.Title>
//                             {offer.isAccepted !== null && (
//                                 <div>
//                                     {!offer.isAccepted ? (
//                                         <div>Отказана оферта</div>
//                                     ) : (
//                                         <Link to={`/home/myprofile/user/currentoffers/review/${jobAdvertisement.jobAdvertisementId}`}>
//                                             <Button>Остави ревю</Button>
//                                         </Link>
//                                     )}
//                                 </div>
//                             )}
//                             {offer.isAccepted === null && <button onClick={() => acceptOffer(offer.offerId)}>Accept</button>}
//                         </Card.Body>
//                     </Card>
//                 </div>
//                 <CurrentOfferAuthorComponent offer={offer}></CurrentOfferAuthorComponent>
//             </div>
//         ))
//         }
//     </div >
// )
