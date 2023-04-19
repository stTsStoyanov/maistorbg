import React, { useEffect, useState } from "react";
import { delayFunction } from "../../utilFunctions/utilFunctions";
import localStorageManager from "../../model/managers/localStorageManager";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

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
                        return { ...jobOffer, isAccepted: true, isReviewLeft: false, dateOfAcceptance: new Date().toLocaleString()};
                    } else if (jobOffer.jobAdvertisementId === jobAdvertisement.jobAdvertisementId) {
                        return { ...jobOffer, isAccepted: false, dateOfRejection: new Date().toLocaleString() };
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
                            <div>
                                {!offer.isAccepted ? (
                                    <div>Offer accepted</div>
                                ) : (
                                    <Link to={`/home/myprofile/user/currentoffers/review/${jobAdvertisement.jobAdvertisementId}`}>
                                        <button>Review</button>
                                    </Link>
                                )}
                            </div>
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

// <Link to={`/home/myprofile/user/currentoffers/review/${jobAdvertisement.jobAdvertisementId}` >