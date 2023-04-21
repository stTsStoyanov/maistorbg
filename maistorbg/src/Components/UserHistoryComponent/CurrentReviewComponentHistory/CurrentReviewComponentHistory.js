// import React from "react";
// import { Card } from "react-bootstrap";
// import "./CurrentReviewComponentHistory.scss";

// export default function CurrentReviewComponentHistory({ currentReview }) {
//     console.log(currentReview)
//   const {
//     reviewSummary,
//     review,
//     rating,
//     craftsmanName,
//     creationDate,
//   } = currentReview;

//   return (
//     <div className="current-review-card-wrapper">
//       <Card className="current-review-card">
//         <Card.Body className="d-flex flex-column">
//           <Card.Title>{reviewSummary}</Card.Title>
//           <Card.Subtitle className="mb-2 text-muted">{craftsmanName}</Card.Subtitle>
//           <Card.Text>{review}</Card.Text>
//           <div className="d-flex justify-content-between">
//             <span>{rating}</span>
//             <span>{creationDate}</span>
//           </div>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }


// import React from "react";
// import { Card } from "react-bootstrap";
// import "./CurrentReviewComponentHistory.scss";

// export default function CurrentReviewComponentHistory({ currentReview, craftsmanName }) {
//   const {
//     reviewSummary,
//     review,
//     rating,
//     creationDate,
//   } = currentReview;

//   return (
//     <div className="current-review-card-wrapper">
//       <Card className="current-review-card">
//         <Card.Body className="d-flex flex-column">
//           <Card.Title>{reviewSummary}</Card.Title>
//           <Card.Subtitle className="mb-2 text-muted">{craftsmanName}</Card.Subtitle>
//           <Card.Text className="text-left">{review}</Card.Text>
//           <div className="d-flex justify-content-between">
//           <Card.Text className="text-left">{review}</Card.Text>
//           <Card.Text className="text-left">{review}</Card.Text>
//             <span>{rating}</span>
//             <span>{creationDate}</span>
//           </div>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }


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
                <Card.Body>
                    <Card.Title>{reviewSummary}</Card.Title>
                    <Card.Text>{review}</Card.Text>
                    <Card.Subtitle>Ревю за:{craftsmanName}</Card.Subtitle>
                    <Card.Text>Вашата оценка:{rating}</Card.Text>
                    <Card.Text>Дата на създаване: {creationDate}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}