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

    const parsedRating = parseInt(rating);

    return (
        <div className="CurrentReviewComponentHistory">
            <Card className="current-review-history-component">
                <Card.Body className="card-body-review-component">
                    <Card.Text className="review-history-component-header"><strong>Вашето Ревю</strong></Card.Text>
                    <Card.Text><strong>Резюме: </strong>{reviewSummary}</Card.Text>
                    <Card.Text><strong>Ревю: </strong>{review}</Card.Text>
                    {craftsmanName ? (
                        <Card.Text><strong>Ревю за: </strong>{craftsmanName}</Card.Text>
                    ) : null}
                    <Card.Text><strong>Вашата оценка: </strong>
                        {[...Array(parsedRating)].map((_, i) => (
                            <span key={i} style={{ color: "#c0c00a", fontSize: "26px" }}>&#9733;</span>
                        ))}
                    </Card.Text>
                    <Card.Text><strong>Дата на създаване: </strong>{creationDate}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

