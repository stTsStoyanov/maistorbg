import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Review from "../../../model/classes/review";
import { delayFunction } from "../../../utilFunctions/utilFunctions";
import localStorageManager from "../../../model/managers/localStorageManager";
import LeftReview from "./LeftReview/LeftReview";
import './LeaveReviewFormComponent';

export default function LeaveReviewFormComponent({ craftsman, client, offer, handleReviewLeft, jobAdvertisement }) {
    const [reviewSummary, setReviewSummary] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [isReviewLeft, setIsReviewLeft] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newReview = new Review(craftsman.id, client.id, offer.offerId, reviewSummary, review, rating, jobAdvertisement.jobAdvertisementId);

        // Update the offer with the review information
        const updatedOffer = {
            ...offer,
            isReviewLeft: true,
            reviewId: newReview.id,
        };

        // Update the allOffers array in localStorage
        delayFunction(localStorageManager.getItem, ["allOffers"])
            .then(allOffers => {
                const updatedOffers = allOffers.map((o) => {
                    if (o.offerId === offer.offerId) {
                        return updatedOffer;
                    } else {
                        return o;
                    }
                });
                localStorageManager.setItem("allOffers", updatedOffers);
            });

        // Update the allReviews and users arrays in localStorage
        delayFunction(localStorageManager.getItem, ["allReviews"])
            .then(allReviews => {
                const updatedReviews = [...allReviews, newReview];
                localStorageManager.setItem("allReviews", updatedReviews);
            })
            .then(() => {
                delayFunction(localStorageManager.getItem, ["users"])
                    .then((allUsers) => {
                        const userToUpdate = allUsers.find((user) => user.id === craftsman.id);
                        const updatedAllRatings = [...userToUpdate.allRatings, parseInt(rating)];
                        const updatedAverageRating =
                            updatedAllRatings.reduce((accumulator, currentValue) => {
                                return accumulator + currentValue;
                            }, 0) / updatedAllRatings.length;
                        const updatedUser = {
                            ...userToUpdate,
                            averageRating: updatedAverageRating,
                            allRatings: updatedAllRatings,
                        };
                        const updatedUsersList = allUsers.map((user) => {
                            if (user.id === craftsman.id) {
                                return updatedUser;
                            } else {
                                return user;
                            }
                        });
                        localStorageManager.setItem("users", updatedUsersList);
                    });
            });

        // setReviewSummary("");
        // setReview("");
        // setRating(0);
        // handleReviewLeft();
        setIsReviewLeft(true)
    };

    useState(() => {
        if (offer.isReviewLeft) {
            setIsReviewLeft(true)
        }
    }, [])


    return (
        <div>
            {isReviewLeft ? (
                <LeftReview craftsman={craftsman} client={client} offer={offer} jobAdvertisement={jobAdvertisement}></LeftReview>
            ) : (
                <div className="review-form-wrapper">
                    <div className="review-form-container">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="reviewSummary">
                                <Form.Label>Review Summary</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    value={reviewSummary}
                                    onChange={(event) => setReviewSummary(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="review">
                                <Form.Label>Review</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={6}
                                    value={review}
                                    onChange={(event) => setReview(event.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="rating">
                                <Form.Label>Rating</Form.Label>
                                <Form.Control
                                    type="number"
                                    min={1}
                                    max={5}
                                    value={rating}
                                    onChange={(event) => setRating(event.target.value)}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            )}
        </div>
    )

}