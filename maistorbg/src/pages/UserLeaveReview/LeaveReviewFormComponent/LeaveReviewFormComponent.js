import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Review from "../../../model/classes/review";

export default function LeaveReviewFormComponent({ craftsman, client, offer }) {
  const [reviewSummary, setReviewSummary] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newReview = new Review(craftsman.id, client.id, offer.offerId, reviewSummary, review, rating);
    console.log(newReview); // you can replace this with your actual code to save the review
  };

  return (
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
  );
}
