// import React, { useEffect, useState } from "react";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import "./LeaveReviewFormComponent.scss";
// import { delayFunction } from "../../utilFunctions/utilFunctions";
// import localStorageManager from "../../model/managers/localStorageManager";
// import userManager from "../../model/managers/userManager";
// import LeaveReviewFormComponent from "./LeaveReviewFormComponent/LeaveReviewFormComponent";

// export default function LeaveReviewOfferComponent({ offer }) {
//     const [offerAuthor, setOfferAuthor] = useState(null);
//     const [offerAuthorId, setOfferAuthorId] = useState(null);
//     const [client, setClient] = useState(null);
//     const [isReviewLeft, setIsReviewLeft] = useState(false);


//     useEffect(() => {
//         delayFunction(localStorageManager.getItem, ["users"])
//             .then((allUsers) => {
//                 const user = allUsers.find((user) => user.id === offer.authorId);
//                 setOfferAuthor(user);
//                 setOfferAuthorId(user.id);
//             })
//             .catch((error) => {
//                 console.error("Failed to retrieve user from localStorage:", error);
//             });
//         userManager
//             .getLoggedUser()
//             .then((user) => {
//                 setClient(user);
//             });
//     }, [offer.authorId]);

//     useEffect(() => {
//         setIsReviewLeft(offer.isReviewLeft);
//     }, [offer.isReviewLeft]);

//     return (
//         <div>
//             <Card className="leave-review-form">
//                 <Card.Body>
//                     <Card.Title>{offer.offerText}</Card.Title>
//                     <Card.Subtitle className="mb-2 text-muted">
//                         Сума: {offer.offeredSum} | Период: {offer.offeredTerm} дни
//                     </Card.Subtitle>
//                     <Card.Text>
//                         <small className="text-muted">
//                             Дата на създаване:{" "}
//                             {new Date(offer.creationDate).toLocaleDateString()}
//                         </small>
//                     </Card.Text>
//                     <Card.Text>
//                         Офертата е била приета на {offer.dateOfAcceptance}
//                     </Card.Text>
//                     <Card.Text>
//                         <h5>Обявата беше извършена от:</h5>
//                     </Card.Text>
//                     {offerAuthor && (
//                         <Card className="author-card">
//                             <Card.Body className="d-flex align-items-center">
//                                 <img
//                                     className="mr-3"
//                                     src={offerAuthor.photo}
//                                     alt={offerAuthor.name}
//                                     width="80"
//                                     height="80"
//                                 />
//                                 <div>
//                                     <h6>{offerAuthor.name}</h6>
//                                     <p> {offerAuthor.skills.join(", ")}</p>
//                                 </div>
//                             </Card.Body>
//                         </Card>
//                     )}
//                 </Card.Body>
//             </Card>
//             {isReviewLeft ? (
//                 <div className="offer-accepted-message">
//                     <p>Offer has been accepted</p>
//                 </div>
//             ) : (
//                 <LeaveReviewFormComponent
//                     craftsman={offerAuthor}
//                     client={client}
//                     offer={offer}
//                 />
//             )}
//         </div>
//     );
// }


import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./LeaveReviewFormComponent.scss";
import { delayFunction } from "../../utilFunctions/utilFunctions";
import localStorageManager from "../../model/managers/localStorageManager";
import userManager from "../../model/managers/userManager";
import LeaveReviewFormComponent from "./LeaveReviewFormComponent/LeaveReviewFormComponent";

export default function LeaveReviewOfferComponent({ offer }) {
    const [offerAuthor, setOfferAuthor] = useState(null);
    const [offerAuthorId, setOfferAuthorId] = useState(null);
    const [client, setClient] = useState(null);
    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [reviewLeft, setReviewLeft] = useState(false);

    

    useEffect(() => {
        delayFunction(localStorageManager.getItem, ["users"])
            .then((allUsers) => {
                const user = allUsers.find((user) => user.id === offer.authorId);
                setOfferAuthor(user);
                setOfferAuthorId(user.id);
            })
            .catch((error) => {
                console.error("Failed to retrieve user from localStorage:", error);
            });
        userManager
            .getLoggedUser()
            .then((user) => {
                setClient(user);
            });
    }, [offer.authorId]);

    useEffect(() => {
        setIsReviewLeft(offer.isReviewLeft);
    }, [offer.isReviewLeft]);

    const handleReviewLeft = () => {
        setReviewLeft(true);
      };
      

    return (
        <div>
            <Card className="leave-review-form">
                <Card.Body>
                    <Card.Title>{offer.offerText}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                        Сума: {offer.offeredSum} | Период: {offer.offeredTerm} дни
                    </Card.Subtitle>
                    <Card.Text>
                        <small className="text-muted">
                            Дата на създаване:{" "}
                            {new Date(offer.creationDate).toLocaleDateString()}
                        </small>
                    </Card.Text>
                    <Card.Text>
                        Офертата е била приета на {offer.dateOfAcceptance}
                    </Card.Text>
                    <Card.Text>
                        <h5>Обявата беше извършена от:</h5>
                    </Card.Text>
                    {offerAuthor && (
                        <Card className="author-card">
                            <Card.Body className="d-flex align-items-center">
                                <img
                                    className="mr-3"
                                    src={offerAuthor.photo}
                                    alt={offerAuthor.name}
                                    width="80"
                                    height="80"
                                />
                                <div>
                                    <h6>{offerAuthor.name}</h6>
                                    <p> {offerAuthor.skills.join(", ")}</p>
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                </Card.Body>
            </Card>
            {isReviewLeft ? (
                <div className="offer-accepted-message">
                    <p>Вече сте оставили ревю за тази Офертата</p>
                </div>
            ) : (
                <LeaveReviewFormComponent
                    craftsman={offerAuthor}
                    client={client}
                    offer={offer}
                    handleReviewLeft={handleReviewLeft}
                />
            )}
        </div>
    );
}
