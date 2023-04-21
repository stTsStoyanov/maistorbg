// import React from 'react';
// import { Card } from 'react-bootstrap';

// export default function CraftsmanCardPresentingComponent ({ craftsman }) {
//   const { photo, name, averageRating, skills } = craftsman;
//   const formattedSkills = skills.join(', ');

//   return (
//     <Card>
//       <Card.Img variant="top" src={photo} />
//       <Card.Body>
//         <Card.Title>{name}</Card.Title>
//         <Card.Text>Average rating: {averageRating.toFixed(2)}</Card.Text>
//         <Card.Text>Skills: {formattedSkills}</Card.Text>
//       </Card.Body>
//     </Card>
//   );
// }


import React from 'react';
import { Card } from 'react-bootstrap';
import './CraftsmanCardPresentingComponent.scss';

export default function CraftsmanCardPresentingComponent ({ craftsman }) {
  const { photo, name, averageRating, skills } = craftsman;

  return (
    <div className="craftsman-card-grid">
      <img className="craftsman-card-photo" src={photo} alt={name} />
      {/* <div className="craftsman-card-details"> */}
        {/* <Card.Body> */}
          <div className="craftsman-card-rating">Average rating: {averageRating.toFixed(2)}</div>
          <div className="craftsman-card-name">{name}</div>
          <div className="craftsman-card-skills">{skills.map(skill => <div>{skill}</div>)}</div>
        {/* </Card.Body> */}
      {/* </div> */}
    </div>
  );
}