

import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
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
        userManager
            .getLoggedUser()
            .then((user) => {
                setClient(user);
            });
    }, [offer.authorId]);

    useEffect(() => {
        setIsReviewLeft(offer.isReviewLeft);
    }, [offer.isReviewLeft]);

    return (
        <div className="offer-card-container">
            <Card className="offer-card">
                <Card.Body>
                    <div className="offer-card-info">
                        <Card.Text className="offer-card-header-text"><strong>Оферта</strong></Card.Text>
                        <Card.Text><strong>Описание: </strong>{offer.offerText}</Card.Text>
                        <div>
                            <strong>Сума: </strong> {offer.offeredSum}лв | <strong>Период: </strong> {offer.offeredTerm} дни
                        </div>
                        <Card.Text>
                            <strong>Дата на създаване:</strong>{" "}
                            {offer.creationDate}
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