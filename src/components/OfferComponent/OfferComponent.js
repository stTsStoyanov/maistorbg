import React from "react";
import { Table } from "react-bootstrap";

function OfferDetailsTable({ offer }) {
  return (
    <Table striped bordered hover>
      <tbody>
        <tr>
          <td>Creation Date:</td>
          <td>{offer.creationDate}</td>
        </tr>
        <tr>
          <td>Offer Text:</td>
          <td>{offer.offerText}</td>
        </tr>
        <tr>
          <td>Offered Term:</td>
          <td>{offer.offeredTerm}</td>
        </tr>
        <tr>
          <td>Offered Sum:</td>
          <td>{offer.offeredSum}</td>
        </tr>
      </tbody>
    </Table>
  );
}

function OfferTableComponent({ offers }) {
    const handleButtonClick = (offer) => {
      const allOffers = JSON.parse(localStorage.getItem("allOffers"));
      const filteredOffers = allOffers.filter((jobOffer) => jobOffer.jobAdvertisementId === offer.jobAdvertisementId);
    };
  
    const filteredOffers = JSON.parse(localStorage.getItem("allOffers")).filter((jobOffer) => {
      return offers.some((offer) => offer.jobAdvertisementId === jobOffer.jobAdvertisementId);
    });
  
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Снимка</th>
            <th>Заглавие</th>
            <th>Обява</th>
            <th>Детайли</th>
          </tr>
        </thead>
        <tbody>
          {offers?.map((offer) => (
            <tr key={offer.id}>
              <td>
                <img src={offer.jobAdvertisementImage} alt={offer.jobAdvertisementTittle} style={{ maxWidth: "100px" }} />
              </td>
              <td>{offer.jobAdvertisementTittle}</td>
              <td>{offer.jobAdvertisementText}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleButtonClick(offer)}>
                  Детайли
                </button>
                {filteredOffers
                  .filter((jobOffer) => jobOffer.jobAdvertisementId === offer.jobAdvertisementId)
                  .map((jobOffer) => (
                    <OfferDetailsTable key={jobOffer.id} offer={jobOffer} />
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
  
  export default OfferTableComponent;
  