import React, { useState } from "react";
import { Card, ListGroup, Form, Button } from "react-bootstrap";
import debounce from "lodash/debounce";
import "./AllOffers.scss";


function OffersList() {
  const allJobAdvertisements = JSON.parse(localStorage.getItem("allJobAdvertisements"));
  const [offers, setOffers] = useState(allJobAdvertisements);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const craftsmenCategories = JSON.parse(localStorage.getItem("craftsmenCategories"));

  const handleSearchInputChange = debounce((event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredOffers = allJobAdvertisements.filter(
      (offer) => offer.offerTittle.toLowerCase().includes(searchValue)
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

  const offerCards = offers.map((offer, index) => (
    <Card key={index} className="my-3">
      <Card.Img variant="top" src={offer.offerImage} className="card-img-top" />
      <Card.Body>
        <Card.Title>{offer.offerTittle}</Card.Title>
        <Card.Text>{offer.offerText}</Card.Text>
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
    <>
      <Form.Group controlId="formSearch">
        <Form.Control type="text" placeholder="Search by name" onChange={handleSearchInputChange} />
      </Form.Group>
      <div className="categories">{categoryItems}</div>
      {isFiltered && <Button variant="secondary" onClick={handleCleanFilters}>Clean All Filters</Button>}
      <div className="offer-cards">{offerCards}</div>
    </>
  );
}

export default OffersList;
