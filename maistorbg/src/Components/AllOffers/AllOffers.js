import React, { useState, useRef,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, ListGroup, Form, Button, Pagination } from "react-bootstrap";
import debounce from "lodash/debounce";
import "./AllOffers.scss";
import localStorageManager from "../../model/managers/localStorageManager";

const OFFERS_PER_PAGE = 8;
function AllOffers() {
  const [allJobAdvertisements, setAllJobAdvertisements] = useState([]);
  const [offers, setOffers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [craftsmenCategories, setCraftsmenCategories] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const navigate = useNavigate();
  const offerCardsContainerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    localStorageManager.getItem("allJobAdvertisements").then((data) => {
      const reversedData = data.reverse();
      setAllJobAdvertisements(reversedData);
      setOffers(reversedData);
    });

    localStorageManager.getItem("craftsmenCategories").then((data) => {
      setCraftsmenCategories(data);
    });

    localStorageManager.getItem("loggedUser").then((data) => {
      setLoggedUser(data);
    });
  }, []);

  const handleSearchInputChange = debounce((event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredOffers = allJobAdvertisements.filter((offer) =>
      offer.jobAdvertisementTittle.toLowerCase().includes(searchValue)
    );
    setOffers(filteredOffers);
    setIsFiltered(true);
    setCurrentPage(1); // Reset to first page when searching
    offerCardsContainerRef.current.scrollIntoView({ behavior: "smooth" });
  }, 500);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filteredOffers = allJobAdvertisements.filter(
      (offer) => offer.category === category
    );
    setOffers(filteredOffers);
    setIsFiltered(true);
    setCurrentPage(1); 
    offerCardsContainerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const searchInputRef = useRef(null);

  const handleCleanFilters = () => {
    setOffers(allJobAdvertisements);
    setSelectedCategory(null);
    setIsFiltered(false);
    setCurrentPage(1); 
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  const handleButtonClick = (offer) => {
    setSelectedOffer(offer);
  };
  const filteredOffers = isFiltered ? offers : allJobAdvertisements;
  const startIndex = (currentPage - 1) * OFFERS_PER_PAGE;
  const endIndex = startIndex + OFFERS_PER_PAGE;
  const currentPageOffers = filteredOffers.slice(startIndex, endIndex);
  const offerCards = currentPageOffers.map((offer, index) => (
    <div
      className="offerCardsCont"
      key={offer.jobAdvertisementId}
      onClick={() => {
        navigate(`/home/offers/${offer.jobAdvertisementId}`, {
          state: { id: offer.jobAdvertisementId, offer: offer },
        });
      }}
    >
      <Card key={index} className="my-3">
        <Card.Img
          variant="top"
          src={offer.jobAdvertisementImage[0]}
          className="card-img-top"
        />
        <Card.Body>
          <Card.Title>{offer.jobAdvertisementTittle}</Card.Title>
          <Card.Text>{offer.jobAdvertisementText}</Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item className="list-group-item">
            Категория: {offer.category}
          </ListGroup.Item>
          <ListGroup.Item className="list-group-item">
            Дата на създаване на обявата: {offer.creationDate}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  ));
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const totalPages = Math.ceil(offers.length / OFFERS_PER_PAGE);
  const paginationButtons = [];
  for (let i = 1; i <= totalPages; i++) {
    paginationButtons.push(
      <Button
        key={i}
        variant="secondary"
        onClick={() => handlePageChange(i)}
        active={i === currentPage}
      >
        {i}
      </Button>
    );
  }
  const categoryItems = craftsmenCategories.map((category, index) => (
    <div
      key={index}
      className={`category mb-3 ${
        selectedCategory === category.category ? "active" : ""
      }`}
      onClick={() => handleCategoryClick(category.category)}
    >
      <h4 className="text-center">{category.category}</h4>
      <img
        src={category.picture}
        alt={category.category}
        className="category-image"
      />
    </div>
  ));
  return (
    <div className="all-offersss">
      <h1 className="header">Всички текущи обяви</h1>
      <div className="search-containerInput">
        <Form.Group controlId="formSearch">
          <Form.Control
            type="text"
            placeholder="Търсене по име"
            onChange={handleSearchInputChange}
            size="lg"
            ref={searchInputRef}
          />
        </Form.Group>
        {isFiltered && (
          <Button variant="secondary" onClick={handleCleanFilters}>
            Изчисти филтрите
          </Button>
        )}
      </div>
      <div className="categoriesS">{categoryItems}</div>
      <div className="offer-cardsCont" ref={offerCardsContainerRef}>
        {offerCards}
      </div>
      <Pagination className="mt-3">{paginationButtons}</Pagination>
    </div>
  );
}
export default AllOffers;
