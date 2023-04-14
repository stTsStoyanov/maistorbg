//SECOND OPTION


import React, { useEffect, useState } from 'react';
import { Card, CardDeck } from 'react-bootstrap';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // get reviews from local storage and sort them by rating in descending order
    const allReviews = JSON.parse(localStorage.getItem('allReviews')) || [];
    const sortedReviews = allReviews.sort((a, b) => b.rating - a.rating);

    // get the first 6 reviews and update state
    const topReviews = sortedReviews.slice(0, 6);
    setReviews(topReviews);
  }, []);

  return (
    <CardDeck>
      {reviews.map((review) => {
        // find the user and job advertisement associated with the review
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((user) => user.id === review.craftsmanId);

        const jobAdvertisements = JSON.parse(localStorage.getItem('allJobAdvertisements')) || [];
        const jobAdvertisement = jobAdvertisements.find((jobAdvertisement) => jobAdvertisement.id === review.jobAdvertisements);

        return (
          <Card key={review.id}>
            <Card.Img variant="top" src={user.photo} />
            <Card.Body>
              <Card.Title>{review.reviewSummery}</Card.Title>
              <Card.Subtitle>{review.craftsmanName}</Card.Subtitle>
              <Card.Text>{jobAdvertisement.category}</Card.Text>
            </Card.Body>
          </Card>
        );
      })}
    </CardDeck>
  );
};

export default Reviews;





//FIRST OPTION


// import React from 'react';
// import { Card } from 'react-bootstrap';

// const Reviews = () => {
//   // Get data from local storage
//   const allReviews = JSON.parse(localStorage.getItem('allReviews')) || [];
//   const allJobAdvertisements = JSON.parse(localStorage.getItem('allJobAdvertisements')) || [];
//   const users = JSON.parse(localStorage.getItem('users')) || [];

//   // Sort reviews by rating
//   allReviews.sort((a, b) => b.rating - a.rating);

//   // Get first 6 reviews
//   const topSixReviews = allReviews.slice(0, 6);

//   return (
//     <div>
//       {topSixReviews.map((review) => {
//         // Find user and job advertisement for this review
//         const user = users.find((user) => user.id === review.craftsmanId);
//         const jobAd = allJobAdvertisements.find((jobAd) => jobAd.id === review.jobAdvertisements);

//         // Get category from job advertisement
//         const category = jobAd ? jobAd.category : '';

//         return (
//           <Card key={review.id}>
//             <Card.Img variant="top" src={user.photo} />
//             <Card.Body>
//               <Card.Title>{review.reviewSummery}</Card.Title>
//               <Card.Text>
//                 Craftsman: {review.craftsmanName}
//                 <br />
//                 Category: {category}
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         );
//       })}
//     </div>
//   );
// };

// export default Reviews;




// import React from "react";
// import { Card, Col, Container, Row } from "react-bootstrap";
// import "./TopCraftsmen.scss"

// const Review = () => {
//   // Retrieve the array of users and craftsmen from local storage
// //   const usersAndCraftsmen = JSON.parse(localStorage.getItem("users")) || [];

// //   // Filter the array to get only the craftsmen
// //   const craftsmen = usersAndCraftsmen.filter((person) => !person.isClient);

// //   // Sort the array in descending order by average rating and slice the top 5
// //   const topCraftsmen = craftsmen
// //     .sort((a, b) => b.averageRating - a.averageRating)
// //     .slice(0, 6);
//     const topCraftsmen = [];
//   return (
//     // <Container style={{ border: "1px solid black", padding: "20px" }} className="mx-md-5 my-5">

//     // <Container
//     // style={{ border: "1px solid black", padding: "20px" }}
//     // className="mx-md-5 my-5 text-center">

//     <Container style={{ border: "1px solid black", padding: "20px" }} className="mx-md-5 my-5">

//       <h2 className="text-center">Top 6 Craftsmen Reviews</h2>
//       <Row>
//         {topCraftsmen.map((craftsman, index) => (
//           <Col sm={12} md={6} lg={4} key={index}>
//             <Card className="mb-3">
//               <Card.Body>
//                 <Card.Title>{craftsman.name}</Card.Title>
//                 <Card.Text>
//                   Rating: {craftsman.averageRating}
//                   <br />
//                   Phone Number: {craftsman.number}
//                   <br />
//                   Email: {craftsman.email}
//                   <br />
//                   Skills: {craftsman.skills ? craftsman.skills.join(", ") : "No skills specified"}
//                 </Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };

// export default Review;
