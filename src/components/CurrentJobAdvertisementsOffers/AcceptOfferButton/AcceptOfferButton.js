import React, { useState } from "react";
import localStorageManager from "../../../model/managers/localStorageManager";
import { delayFunction } from "../../../utilFunctions/utilFunctions";
import { Button } from "react-bootstrap";

const AcceptOfferButton = ({ offer, children }) => {
    const [newOffers, setNewOffers] = useState(null)
    const acceptOffer = () => {

        delayFunction(localStorageManager.getItem, ["allOffers"])
            .then(offers => {
                const updatedOffers = offers.map((jobOffer) => {
                    if (jobOffer.jobAdvertisementId === offer.jobAdvertisementId && jobOffer.offerId === offer.offerId) {
                        return { ...jobOffer, isAccepted: true };
                    } else if (jobOffer.jobAdvertisementId === offer.jobAdvertisementId) {
                        return { ...jobOffer, isAccepted: false };
                    }
                    return jobOffer;
                })
                localStorageManager.setItem("allOffers", updatedOffers)
            })
    }

    return (
        <Button onClick={() => acceptOffer()}>{children}</Button>
    )
}

export default AcceptOfferButton;
