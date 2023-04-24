import React from "react";
import { Card } from "react-bootstrap";
import "./CurrentReviewComponentHistory.scss";

export default function CurrentReviewComponentHistory({ currentReview, craftsmanName }) {
    const {
        reviewSummary,
        review,
        rating,
        creationDate,
    } = currentReview;

    return (
        <div className="CurrentReviewComponentHistory">
            <Card className="current-review-history-component">
                <Card.Body className="card-body-review-component">
                    <Card.Text><strong>Резюме: </strong>{reviewSummary}</Card.Text>
                    <Card.Text><strong>Ревю: </strong>{review}</Card.Text>
                    <Card.Text><strong>Ревю за: </strong>{craftsmanName}</Card.Text>
                    <Card.Text><strong>Вашата оценка: </strong>{rating}</Card.Text>
                    <Card.Text><strong>Дата на създаване: </strong>{creationDate}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}