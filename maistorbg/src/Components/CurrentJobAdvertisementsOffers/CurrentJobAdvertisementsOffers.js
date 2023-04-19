

// import React, { useEffect, useState } from "react";
// import { delayFunction } from "../../utilFunctions/utilFunctions";
// import localStorageManager from "../../model/managers/localStorageManager";
// import { Card, Button } from "react-bootstrap";
// import AcceptOfferButton from "./AcceptOfferButton/AcceptOfferButton";

// export default function CurrentJobAdvertisementsOffers({ jobAdvertisement }) {
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     delayFunction(localStorageManager.getItem, ["allOffers"]).then((allOffers) => {
//       const jobOffers = allOffers.filter(
//         (offer) => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId
//       );
//       setOffers(jobOffers);
//       setLoading(false);
//     });
//   }, [jobAdvertisement.jobAdvertisementId]);

//   const handleOfferAcceptance = (offerId) => {
//     // handle offer acceptance logic here
//   };

//   const handleOfferRejection = (offerId) => {
//     // handle offer rejection logic here
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {offers.map((offer) => (
//         <Card className="mb-4" key={offer.offerId}>
//           <Card.Body className="d-flex flex-row">
//             <div className="flex-grow-1">
//               <Card.Title>{offer.offerText}</Card.Title>
//               <Card.Subtitle className="mb-2 text-muted">{offer.offeredSum}</Card.Subtitle>
//               <Card.Text>{offer.offeredTerm}</Card.Text>
//               <Card.Text>{offer.creationDate}</Card.Text>
//             </div>
//             {offer.isAccepted === null ? (
//               <AcceptOfferButton offer={offer}>Accept</AcceptOfferButton>
//             ) : offer.isAccepted ? (
//               <div>Offer accepted</div>
//             ) : (
//               <div>Offer rejected</div>
//             )}
//           </Card.Body>
//         </Card>
//       ))}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { delayFunction } from "../../utilFunctions/utilFunctions";
// import localStorageManager from "../../model/managers/localStorageManager";
// import { Card } from "react-bootstrap";
// import AcceptOfferButton from "./AcceptOfferButton/AcceptOfferButton";

// export default function CurrentJobAdvertisementsOffers({ jobAdvertisement }) {
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [acceptedOfferId, setAcceptedOfferId] = useState(null);

//   useEffect(() => {
//     delayFunction(localStorageManager.getItem, ["allOffers"]).then((allOffers) => {
//       const jobOffers = allOffers.filter(
//         (offer) => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId
//       );
//       setOffers(jobOffers);
//       setLoading(false);
//     });
//   }, [jobAdvertisement.jobAdvertisementId, offers]);

//   const handleButtonClick = (offerId) => {
//     setAcceptedOfferId(offerId);
//     delayFunction(localStorageManager.getItem, ["allOffers"]).then((allOffers) => {
//         const jobOffers = allOffers.filter(
//           (offer) => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId
//         );
//         setOffers(jobOffers);
//         setLoading(false);
//       });
//   };

//   const handleOfferRejection = (offerId) => {
//     setAcceptedOfferId(offerId);
//     // handle offer rejection logic here
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {offers.map((offer) => (
//         <Card className="mb-4" key={offer.offerId}>
//           <Card.Body className="d-flex flex-row">
//             <div className="flex-grow-1">
//               <Card.Title>{offer.offerText}</Card.Title>
//               <Card.Subtitle className="mb-2 text-muted">{offer.offeredSum}</Card.Subtitle>
//               <Card.Text>{offer.offeredTerm}</Card.Text>
//               <Card.Text>{offer.creationDate}</Card.Text>
//             </div>
//             {offer.offerId === acceptedOfferId ? (
//               offer.isAccepted ? (
//                 <div>Offer accepted</div>
//               ) : (
//                 <div>Offer rejected</div>
//               )
//             ) : (
//               <AcceptOfferButton offer={offer} onClick={() => handleButtonClick()}>
//                 Accept
//               </AcceptOfferButton>
//             )}
//           </Card.Body>
//         </Card>
//       ))}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { delayFunction } from "../../utilFunctions/utilFunctions";
// import localStorageManager from "../../model/managers/localStorageManager";
// import { Card } from "react-bootstrap";

// export default function CurrentJobAdvertisementsOffers({ jobAdvertisement }) {
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [acceptedOfferId, setAcceptedOfferId] = useState(null);

//   useEffect(() => {
//     delayFunction(localStorageManager.getItem, ["allOffers"]).then((allOffers) => {
//       const jobOffers = allOffers.filter(
//         (offer) => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId
//       );
//       setOffers(jobOffers);
//       setLoading(false);
//     });
//   }, [jobAdvertisement.jobAdvertisementId]);

//   const acceptOffer = (offerId) => {
//     setAcceptedOfferId(offerId);
//     delayFunction(localStorageManager.getItem, ["allOffers"])
//       .then((offers) => {
//         const updatedOffers = offers.map((jobOffer) => {
//           if (jobOffer.offerId === offerId) {
//             return { ...jobOffer, isAccepted: true };
//           } else if (jobOffer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId) {
//             return { ...jobOffer, isAccepted: false };
//           }
//           return jobOffer;
//         });
//         localStorageManager.setItem("allOffers", updatedOffers);
//         setOffers(updatedOffers);
//       });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {offers.map((offer) => (
//         <Card className="mb-4" key={offer.offerId}>
//           <Card.Body className="d-flex flex-row">
//             <div className="flex-grow-1">
//               <Card.Title>{offer.offerText}</Card.Title>
//               <Card.Subtitle className="mb-2 text-muted">{offer.offeredSum}</Card.Subtitle>
//               <Card.Text>{offer.offeredTerm}</Card.Text>
//               <Card.Text>{offer.creationDate}</Card.Text>
//             </div>
//             {offer.isAccepted ? (
//               <div>Offer accepted</div>
//             ) : (
//               <button onClick={() => acceptOffer(offer.offerId)}>Accept</button>
//             )}
//           </Card.Body>
//         </Card>
//       ))}
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import { delayFunction } from "../../utilFunctions/utilFunctions";
// import localStorageManager from "../../model/managers/localStorageManager";
// import { Card } from "react-bootstrap";

// export default function CurrentJobAdvertisementsOffers({ jobAdvertisement }) {
//   const [offers, setOffers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [acceptedOfferId, setAcceptedOfferId] = useState(null);

//   useEffect(() => {
//     delayFunction(localStorageManager.getItem, ["allOffers"]).then((allOffers) => {
//       const jobOffers = allOffers.filter(
//         (offer) => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId
//       );
//       setOffers(jobOffers);
//       setLoading(false);
//     });
//   }, [jobAdvertisement.jobAdvertisementId]);

//   const acceptOffer = (offerId) => {
//     setAcceptedOfferId(offerId);
//     delayFunction(localStorageManager.getItem, ["allOffers"])
//       .then((offers) => {
//         const updatedOffers = offers.map((jobOffer) => {
//           if (jobOffer.offerId === offerId) {
//             return { ...jobOffer, isAccepted: true };
//           } else if (
//             jobOffer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId &&
//             jobOffer.isAccepted === null
//           ) {
//             return { ...jobOffer, isAccepted: false };
//           }
//           return jobOffer;
//         });
//         localStorageManager.setItem("allOffers", updatedOffers);
//         setOffers(updatedOffers);
//       });
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {offers.map((offer) => (
//         <Card className="mb-4" key={offer.offerId}>
//           <Card.Body className="d-flex flex-row">
//             <div className="flex-grow-1">
//               <Card.Title>{offer.offerText}</Card.Title>
//               <Card.Subtitle className="mb-2 text-muted">{offer.offeredSum}</Card.Subtitle>
//               <Card.Text>{offer.offeredTerm}</Card.Text>
//               <Card.Text>{offer.creationDate}</Card.Text>
//             </div>
//             {offer.isAccepted === true ? (
//               <div>Offer accepted</div>
//             ) : offer.isAccepted === false ? (
//               <div>Offer rejected</div>
//             ) : (
//               <button onClick={() => acceptOffer(offer.offerId)}>Accept</button>
//             )}
//           </Card.Body>
//         </Card>
//       ))}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { delayFunction } from "../../utilFunctions/utilFunctions";
import localStorageManager from "../../model/managers/localStorageManager";
import { Card } from "react-bootstrap";

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
            return { ...jobOffer, isAccepted: true };
          } else if (jobOffer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId) {
            return { ...jobOffer, isAccepted: false };
          }
          return jobOffer;
        });
        localStorageManager.setItem("allOffers", updatedOffers);
        setOffers(updatedOffers.filter((offer) => offer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId));
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {offers.map((offer) => (
        <Card className="mb-4" key={offer.offerId}>
          <Card.Body className="d-flex flex-row">
            <div className="flex-grow-1">
              <Card.Title>{offer.offerText}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{offer.offeredSum}</Card.Subtitle>
              <Card.Text>{offer.offeredTerm}</Card.Text>
              <Card.Text>{offer.creationDate}</Card.Text>
            </div>
            {offer.isAccepted !== null && (
              <div>{offer.isAccepted ? "Offer accepted" : "Offer rejected"}</div>
            )}
            {offer.isAccepted === null && (
              <button onClick={() => acceptOffer(offer.offerId)}>Accept</button>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
