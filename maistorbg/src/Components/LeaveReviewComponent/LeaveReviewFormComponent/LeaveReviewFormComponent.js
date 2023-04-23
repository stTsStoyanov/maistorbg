import { useEffect, useState } from "react";
import { Form, Button, Toast, Alert } from "react-bootstrap";
import Review from "../../../model/classes/review";
import { delayFunction } from "../../../utilFunctions/utilFunctions";
import localStorageManager from "../../../model/managers/localStorageManager";
import LeftReview from "./LeftReview/LeftReview";
import './LeaveReviewFormComponent';

export default function LeaveReviewFormComponent({ craftsman, client, offer, handleReviewLeft, jobAdvertisement }) {
    const [reviewSummary, setReviewSummary] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(1);
    const [isReviewLeft, setIsReviewLeft] = useState(false);
    const [showSummaryAlert, setShowSummaryAlert] = useState(false);
    const [showReviewAlert, setShowReviewAlert] = useState(false);
    const [showRatingAlert, setShowRatingAlert] = useState(false);
    const [formTouched, setFormTouched] = useState(false); // Add new state variable
    const [showSuccessToast, setShowSuccessToast] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormTouched(true);
        const summary = reviewSummary.trim();
        const reviewText = review.trim();
        const ratingNumber = parseInt(rating);

        if (summary.split(" ").length < 3) {
            setShowSummaryAlert(true);
            return;
        }
        if (reviewText.length < 30) {
            setShowReviewAlert(true);
            return;
        }
        if (isNaN(ratingNumber) || ratingNumber < 1 || ratingNumber > 5) {
            setShowRatingAlert(true);
            return;
        }

        const newReview = new Review(
            craftsman.id,
            client.id,
            offer.offerId,
            summary,
            reviewText,
            ratingNumber,
            jobAdvertisement.jobAdvertisementId
        );

        const updatedOffer = {
            ...offer,
            isReviewLeft: true,
            reviewId: newReview.id,
        };

        const allOffers = await delayFunction(localStorageManager.getItem, ["allOffers"]);
        const updatedOffers = allOffers.map((o) => (o.offerId === offer.offerId ? updatedOffer : o));
        localStorageManager.setItem("allOffers", updatedOffers);

        const allReviews = await delayFunction(localStorageManager.getItem, ["allReviews"]);
        const updatedReviews = [...allReviews, newReview];
        localStorageManager.setItem("allReviews", updatedReviews);

        const allUsers = await delayFunction(localStorageManager.getItem, ["users"]);
        const userToUpdate = allUsers.find((user) => user.id === craftsman.id);
        const updatedAllRatings = [...userToUpdate.allRatings, ratingNumber];
        const updatedAverageRating =
            updatedAllRatings.reduce((accumulator, currentValue) => accumulator + currentValue, 0) /
            updatedAllRatings.length;
        const updatedUser = {
            ...userToUpdate,
            averageRating: updatedAverageRating,
            allRatings: updatedAllRatings,
        };
        const updatedUsersList = allUsers.map((user) =>
            user.id === craftsman.id ? updatedUser : user
        );
        localStorageManager.setItem("users", updatedUsersList);
        console.log("success")
        setIsReviewLeft(true);
        setShowSuccessToast(true);
    };

    const summaryAlertClasses = `mt-3 ${(!formTouched || reviewSummary.split(/\s+/).length >= 3) ? 'd-none' : 'd-block'}`;
    const reviewAlertClasses = `mt-3 ${(!formTouched || review.length >= 30) ? 'd-none' : 'd-block'}`;
    const ratingAlertClasses = `mt-3 ${(!formTouched || (rating >= 1 && rating <= 5)) ? 'd-none' : 'd-block'}`;

    useEffect(() => {
        setIsReviewLeft(offer.isReviewLeft);
    }, [offer.isReviewLeft]);

    return (
        <div>
            {isReviewLeft ? (
                <LeftReview craftsman={craftsman} client={client} offer={offer} jobAdvertisement={jobAdvertisement}></LeftReview>
            ) : (
                <div className="review-form-wrapper">
                    <div className="review-form-container">
                        <Form onSubmit={handleSubmit} noValidate>
                            <Form.Group controlId="reviewSummary">
                                <Form.Label>Резюме на ревюто</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    defaultValue={reviewSummary}
                                    // onChange={(event) => setReviewSummary(event.target.value)}
                                    onChange={(event) => {
                                        setReviewSummary(event.target.value);
                                        setShowSummaryAlert(formTouched && event.target.value.trim().split(/\s+/).length < 3);
                                    }}
                                />
                                <Alert
                                    variant="danger"
                                    className={summaryAlertClasses}
                                >
                                    Резюмето на ревюто трябва да съдържа поне 3 думи.
                                </Alert>
                            </Form.Group>
                            <Form.Group controlId="review">
                                <Form.Label>Вашето ревю</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    value={review}
                                    // onChange={(event) => setReview(event.target.value)}
                                    onChange={(event) => {
                                        setReview(event.target.value);
                                        setShowReviewAlert(formTouched && event.target.value.trim().length < 30);
                                    }}
                                />
                                <Alert
                                    variant="danger"
                                    className={reviewAlertClasses}
                                // style={{ display: review.length >= 30 || review.length === 0 ? 'none' : 'block' }}
                                >
                                    Ревюто трябва да бъде поне 30 символа.
                                </Alert>
                            </Form.Group>
                            <Form.Group controlId="rating" className="mt-3">
                                <Form.Label>Вашата Оценка(1-5)</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="1"
                                    max="5"
                                    value={rating}
                                    onChange={(event) => {
                                        setRating(event.target.value);
                                        setShowRatingAlert(false); // hide alert when input is changed
                                    }}
                                    isInvalid={rating < 1 || rating > 5}
                                    className={rating < 1 || rating > 5 ? "is-invalid" : ""}
                                />
                                <Alert variant="danger" className="mt-3" style={{ display: rating < 1 || rating > 5 ? "block" : "none" }}>
                                    Моля въведете число от 1 до 5.
                                </Alert>
                            </Form.Group>


                            <Button variant="primary" type="submit">
                                Предай
                            </Button>
                        </Form>
                    </div>
                </div>
            )}
            <Toast
                show={showSuccessToast}
                onClose={() => setShowSuccessToast(false)}
                delay={5000}
                autohide
                className="toast-container"
            >
                <Toast.Header closeButton={true}>
                    <strong className="mr-auto">Успех!</strong>
                </Toast.Header>
                <Toast.Body>Ревюто беше изпратено успешно!</Toast.Body>
            </Toast>

        </div>
    );


}