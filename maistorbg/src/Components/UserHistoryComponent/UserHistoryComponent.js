import React from "react";
import { Table } from "react-bootstrap";
// import "./OffersComponent.scss";

function OfferTable({ offers }) { 
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Снимка</th>
          <th>Инфомация</th>
          <th>Offer Comment</th>
          <th>View Details</th>
        </tr>
      </thead>
      <tbody>
        {offers.map((offer) => (
          <tr key={offer.id}>
            <td>
              <img src={offer.image} alt={offer.offerName} style={{ maxWidth: "100px" }} />
            </td>
            <td>{offer.offerName}</td>
            <td>{offer.offerComment}</td>
            <td>
              <button className="btn btn-primary">View Details</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
function UserHistoryComponent() {
    const offers = [
      {
        image:
          "https://www.purina.bg/sites/default/files/styles/nppe_article_listing_image_and_description/public/2022-10/7-%D0%BF%D0%BE%D1%80%D0%BE%D0%B4%D0%B8-%D1%81%D0%B8%D0%B2%D0%B8-%D0%BA%D0%BE%D1%82%D0%BA%D0%B8_3.jpg?itok=PCV0kCv6",
        author: 23432,
        id: 23432,
        offerName: "name",
        offerComment: "tuk ima tekst dobaven ot user-a",
      },
      // additional offer objects here
    ];
  
    return (
      <div>
        <h1>Offer List</h1>
        <OfferTable offers={offers} />
      </div>
    );
  }
  
  export default UserHistoryComponent;
