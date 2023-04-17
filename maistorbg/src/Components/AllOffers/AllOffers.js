import React, { useState } from "react";
import { Card, ListGroup, Form, Button } from "react-bootstrap";
import debounce from "lodash/debounce";
import "./AllOffers.scss";
import OfferForm from "../CreateAnOffer/CreateAnOffer";
import Offer from "../../model/classes/offer";

function OffersList() {
  const allJobAdvertisements = JSON.parse(localStorage.getItem("allJobAdvertisements"));
  const [offers, setOffers] = useState(allJobAdvertisements);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState('null'); 
  const craftsmenCategories = JSON.parse(localStorage.getItem("craftsmenCategories"));
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  const handleSearchInputChange = debounce((event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredOffers = allJobAdvertisements.filter(
      (offer) => offer.jobAdvertisementTittle.toLowerCase().includes(searchValue)
    );
    setOffers(filteredOffers);
    setIsFiltered(true);
  }, 500);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filteredOffers = allJobAdvertisements.filter(
      (offer) => offer.category === category
    );
    setOffers(filteredOffers);
    setIsFiltered(true);
  };

  const handleCleanFilters = () => {
    setOffers(allJobAdvertisements);
    setSelectedCategory(null);
    setIsFiltered(false);
  };
  
  const handleButtonClick = (offer) => {
    setSelectedOffer(offer);
  }
  
  const renderButton = (offer) => {
    if (loggedUser && !loggedUser.isClient) {
      return (
        <>
          <Button variant="primary" onClick={() => handleButtonClick(offer)}>Apply</Button>
          {selectedOffer && selectedOffer.jobAdvertisementId === offer.jobAdvertisementId && (
            <OfferForm authorId={loggedUser.id} jobAdvertisementId={selectedOffer.jobAdvertisementId} onSubmit={handleOfferSubmit} />
          )}
        </>
      );
    }
    return null;
  };
  

  const handleOfferSubmit = (authorId, jobAdvertisementId, offerText, offeredSum, offeredTerm) => {
    const newOffer = new Offer(authorId, jobAdvertisementId, offerText, offeredSum, offeredTerm);
    console.log('New offer:', newOffer);
    let offers = JSON.parse(localStorage.getItem("allOffers"));
    offers.push(newOffer);
    localStorage.setItem("allOffers", JSON.stringify(offers));
  };
  
  const offerCards = offers.map((offer, index) => (
    <Card key={index} className="my-3">
      <Card.Img variant="top" src={offer.jobAdvertisementImage} className="card-img-top" />
      <Card.Body>
        <Card.Title>{offer.jobAdvertisementTittle}</Card.Title>
        <Card.Text>{offer.jobAdvertisementText}</Card.Text>
        {renderButton(offer)} 
      </Card.Body>
      <ListGroup variant="flush">
        <ListGroup.Item className="list-group-item">Категория: {offer.category}</ListGroup.Item>
        <ListGroup.Item className="list-group-item">Дата на създаване на обявата: {offer.creationDate}</ListGroup.Item>
      </ListGroup>
    </Card>
  ));

  const categoryItems = craftsmenCategories.map((category, index) => (
    <div key={index} className={`category mb-3 ${selectedCategory === category.category ? 'active' : ''}`} onClick={() => handleCategoryClick(category.category)}>
      <h4 className="text-center">{category.category}</h4>
      <img src={category.picture} alt={category.category} className="category-image" />
    </div>
  ));

  return (
    <div className="all-offers">
      <Form.Group controlId="formSearch">
        <Form.Control type="text" placeholder="Търсене по име" onChange={handleSearchInputChange} />
      </Form.Group>
      <div className="categories">{categoryItems}</div>
      {isFiltered && <Button variant="secondary" onClick={handleCleanFilters}>Изчисти всички филтри</Button>}
      <div className="offer-cards">{offerCards}</div>
    </div>
  );
}

export default OffersList;
