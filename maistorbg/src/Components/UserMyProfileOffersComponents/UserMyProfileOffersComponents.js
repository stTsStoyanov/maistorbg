import React from "react";
import { Card, Button } from "react-bootstrap";

function OfferCard({ offer }) {
  return (
    <Card className="my-3 p-3 border" sm>
      <Card.Img
        variant="top"
        src={offer.image}
        style={{ maxHeight: "200px" }}
      />
      <Card.Body>
        <Card.Title>{offer.offerName}</Card.Title>
        <Card.Text>{offer.offerComment}</Card.Text>
        <Button variant="primary">View Details</Button>
      </Card.Body>
    </Card>
  );
}

function OfferList({ offers }) {
  return (
    <div className="row">
      {offers.map((offer) => (
        <div key={offer.id} className="col-md-6 mb-3">
          <OfferCard offer={offer} />
        </div>
      ))}
    </div>
  );
}

function UserMyProfileOffersComponents() {
  const offers = [
    {
      image:
        "https://www.purina.bg/sites/default/files/styles/nppe_article_listing_image_and_description/public/2022-10/7-%D0%BF%D0%BE%D1%80%D0%BE%D0%B4%D0%B8-%D1%81%D0%B8%D0%B2%D0%B8-%D0%BA%D0%BE%D1%82%D0%BA%D0%B8_3.jpg?itok=PCV0kCv6",
      author: 23432,
      id: 23432,
      offerName: "name",
      offerComment: "tuk ima tekst dobaven ot user-a",
    },

    {
      image:
        "https://media.istockphoto.com/id/1182393363/photo/alexander-nevsky-cathedral-in-sofia-bulgaria-taken-in-may-2019-taken-in-hdr.jpg?s=612x612&w=0&k=20&c=pxdKXGCg5wnU1cpK-0em0FAISx0aV5o18l2FaU5u94M=",
      author: 2343244,
      id: 234324444444,
      offerName: "name",
      offerComment: "tuk ima tekst dobaven ot user-a",
    },
    {
      image:
        "https://media.istockphoto.com/id/1182393363/photo/alexander-nevsky-cathedral-in-sofia-bulgaria-taken-in-may-2019-taken-in-hdr.jpg?s=612x612&w=0&k=20&c=pxdKXGCg5wnU1cpK-0em0FAISx0aV5o18l2FaU5u94M=",
      author: 23432445,
      id: 2343244444445,
      offerName: "name",
      offerComment: "tuk ima tekst dobaven ot user-a",
    },
    {
      image:
        "https://media.istockphoto.com/id/1182393363/photo/alexander-nevsky-cathedral-in-sofia-bulgaria-taken-in-may-2019-taken-in-hdr.jpg?s=612x612&w=0&k=20&c=pxdKXGCg5wnU1cpK-0em0FAISx0aV5o18l2FaU5u94M=",
      author: 23432446,
      id: 2343244444446,
      offerName: "name",
      offerComment: "tuk ima tekst dobaven ot user-a",
    },
    {
      image:
        "https://media.istockphoto.com/id/1182393363/photo/alexander-nevsky-cathedral-in-sofia-bulgaria-taken-in-may-2019-taken-in-hdr.jpg?s=612x612&w=0&k=20&c=pxdKXGCg5wnU1cpK-0em0FAISx0aV5o18l2FaU5u94M=",
      author: 23432447,
      id: 2343244444447,
      offerName: "name",
      offerComment: "tuk ima tekst dobaven ot user-a",
    },
  ];

  return (
    <div>
      <h1>Offer List</h1>
      <OfferList offers={offers} />
    </div>
  );
}

export default UserMyProfileOffersComponents;