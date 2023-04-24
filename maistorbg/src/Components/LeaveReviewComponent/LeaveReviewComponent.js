

import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./LeaveReviewFormComponent/LeaveReviewFormComponent.scss";
import { delayFunction } from "../../utilFunctions/utilFunctions";
import localStorageManager from "../../model/managers/localStorageManager";
import userManager from "../../model/managers/userManager";
import LeaveReviewFormComponent from "./LeaveReviewFormComponent/LeaveReviewFormComponent";
import LeftReview from "./LeaveReviewFormComponent/LeftReview/LeftReview";

export default function LeaveReviewOfferComponent({ offer, jobAdvertisement }) {
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
        console.log(reviewLeft)
        setReviewLeft(true);
        console.log(reviewLeft)
    };

    return (
        <div className="offer-card-container">
            <Card className="offer-card">
                <Card.Body>
                    <div className="offer-card-info">
                        <Card.Text><strong>Описание: </strong>{offer.offerText}</Card.Text>
                        <div>
                            <strong>Сума: </strong> {offer.offeredSum}лв | <strong>Период: </strong> {offer.offeredTerm} дни
                        </div>
                        <Card.Text>
                            <strong>Дата на създаване:</strong>{" "}
                            {new Date(offer.creationDate).toLocaleDateString()}
                        </Card.Text>
                        <Card.Text>
                            <strong>Офертата е била приета на:</strong> {offer.dateOfAcceptance}
                        </Card.Text>
                        <Card.Text>
                            <strong>Обявата беше извършена от:</strong>
                        </Card.Text>
                        {offerAuthor && (
                            <Card className="author-card">
                                <Card.Body className="d-flex align-items-center background-color">
                                    <img
                                        className="mr-3 author-photo"
                                        src={offerAuthor.photo}
                                        alt={offerAuthor.name}
                                        width="100"
                                        height="100"
                                    />
                                    <div>
                                        <strong>{offerAuthor.name}</strong>
                                        <p><strong>{offerAuthor.skills.join(", ")}</strong></p>
                                    </div>
                                </Card.Body>
                            </Card>
                        )}
                    </div>
                </Card.Body>
            </Card>
            {isReviewLeft ? (
                <LeftReview
                    craftsman={offerAuthor}
                    client={client}
                    offer={offer}
                    jobAdvertisement={jobAdvertisement}
                />
            ) : (
                <LeaveReviewFormComponent
                    craftsman={offerAuthor}
                    client={client}
                    offer={offer}
                    jobAdvertisement={jobAdvertisement}
                />
            )}
        </div>
    );


}

    // return (
    //     <div>
    //         <Card className="leave-review-form">
    //             <Card.Body>
    //                 <Card.Title>{offer.offerText}</Card.Title>
    //                 <Card.Subtitle className="mb-2 text-muted">
    //                     Сума: {offer.offeredSum} | Период: {offer.offeredTerm} дни
    //                 </Card.Subtitle>
    //                 <Card.Text>
    //                     <small className="text-muted">
    //                         Дата на създаване:{" "}
    //                         {new Date(offer.creationDate).toLocaleDateString()}
    //                     </small>
    //                 </Card.Text>
    //                 <Card.Text>
    //                     Офертата е била приета на {offer.dateOfAcceptance}
    //                 </Card.Text>
    //                 <Card.Text>
    //                     <h5>Обявата беше извършена от:</h5>
    //                 </Card.Text>
    //                 {offerAuthor && (
    //                     <Card className="author-card">
    //                         <Card.Body className="d-flex align-items-center">
    //                             <img
    //                                 className="mr-3"
    //                                 src={offerAuthor.photo}
    //                                 alt={offerAuthor.name}
    //                                 width="80"
    //                                 height="80"
    //                             />
    //                             <div>
    //                                 <h6>{offerAuthor.name}</h6>
    //                                 <p> {offerAuthor.skills.join(", ")}</p>
    //                             </div>
    //                         </Card.Body>
    //                     </Card>
    //                 )}
    //             </Card.Body>
    //         </Card>
    //         {isReviewLeft ? (
    //            <LeftReview
    //            craftsman={offerAuthor}
    //            client={client}
    //            offer={offer}
    //            jobAdvertisement={jobAdvertisement}
    //            ></LeftReview>
    //         ) : (
    //             <LeaveReviewFormComponent
    //                 craftsman={offerAuthor}
    //                 client={client}
    //                 offer={offer}
    //                 jobAdvertisement={jobAdvertisement}
    //             />
    //         )}
    //     </div>
    // );


    // return (
    //   <div className="offer-card-container">
    //     <Card className="offer-card">
    //       <Card.Body>
    //         <div className="offer-header">
    //           <Card.Title className="offer-title">{offer.offerText}</Card.Title>
    //           <Card.Subtitle className="offer-subtitle">
    //             Сума: {offer.offeredSum} | Период: {offer.offeredTerm} дни
    //           </Card.Subtitle>
    //         </div>
    //         <Card.Text>
    //           <small className="offer-date">
    //             Дата на създаване:{" "}
    //             {new Date(offer.creationDate).toLocaleDateString()}
    //           </small>
    //         </Card.Text>
    //         <Card.Text>Офертата е била приета на {offer.dateOfAcceptance}</Card.Text>
    //         <Card.Text>
    //           <h5 className="offer-author-title">Обявата беше извършена от:</h5>
    //         </Card.Text>
    //         {offerAuthor && (
    //           <Card className="author-card">
    //             <Card.Body className="author-card-body">
    //               <img
    //                 className="author-photo"
    //                 src={offerAuthor.photo}
    //                 alt={offerAuthor.name}
    //                 width="80"
    //                 height="80"
    //               />
    //               <div>
    //                 <h6 className="author-name">{offerAuthor.name}</h6>
    //                 <p className="author-skills">{offerAuthor.skills.join(", ")}</p>
    //               </div>
    //             </Card.Body>
    //           </Card>
    //         )}
    //       </Card.Body>
    //     </Card>
    //     {isReviewLeft ? (
    //       <LeftReview
    //         craftsman={offerAuthor}
    //         client={client}
    //         offer={offer}
    //         jobAdvertisement={jobAdvertisement}
    //       />
    //     ) : (
    //       <LeaveReviewFormComponent
    //         craftsman={offerAuthor}
    //         client={client}
    //         offer={offer}
    //         jobAdvertisement={jobAdvertisement}
    //       />
    //     )}
    //   </div>
    // );
