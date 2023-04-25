import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, InputGroup, FormControl, Button, Card, Image } from "react-bootstrap";
import debounce from "lodash/debounce";
import { useNavigate, Link } from 'react-router-dom';
import "./Craftsmen.scss"
import Advertisement from "./Advertisement";

const Craftsman = () => {
    const [craftsmenCategories, setCraftsmenCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedInput, setSelectedInput] = useState(null);

    const history = useNavigate();
    const categoryRef = useRef(null);
    const searchRef = useRef(null);
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || false;

    useEffect(() => {
        const categoriesFromLocalStorage = JSON.parse(localStorage.getItem("craftsmenCategories"));
        setCraftsmenCategories(categoriesFromLocalStorage);
        const usersFromLocalStorage = JSON.parse(localStorage.getItem("users"));
        setUsers(usersFromLocalStorage);
        setFilteredUsers(usersFromLocalStorage.filter(user => user.isClient === false));
    }, []);

    useEffect(() => {
        const filtered = users.filter(user => {
            if (user.isClient) {
                return false;
            }
            const skills = user.skills || [];
            return skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
        });
        setFilteredUsers(filtered);
    }, [searchQuery, users]);



    const handleSearch = debounce((event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchQuery(searchValue);

        const filteredData = filteredUsers.filter(item => {
            const skills = item.skills || [];
            return (
                item?.name?.toLowerCase().includes(searchValue) ||
                item?.email?.toLowerCase().includes(searchValue) ||
                item?.phoneNumber?.includes(searchValue) ||
                skills.some(skill => skill.toLowerCase().includes(searchValue))
            );
        });

        setSelectedInput(filteredData);

        if (searchRef.current) {
            searchRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, 500);




    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        const filtered = users.filter(user => {
            if (user.isClient) {
                return false;
            }
            const skills = user.skills || [];
            return skills.includes(category.category);
        });
        setFilteredUsers(filtered);

        if (categoryRef.current) {
            categoryRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };



    const handleClearFilters = () => {
        setSelectedInput(null)
        setSelectedCategory(null);
        setSearchQuery("");
        setFilteredUsers(users.filter(user => user.isClient === false));
    };


    return (
        <Container className="craftmenContainerPage">
            <Row className="mt-3">
                <Col>
                    <InputGroup>
                        <FormControl placeholder="Майстор с какви умения търсите? Например: заварчик, електричар, проектант..." onChange={handleSearch} />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mt-3">

                {craftsmenCategories.map((category, index) => (
                    <Col key={index} md={4} className="mb-3">
                        <Button variant="light" onClick={() => handleCategoryClick(category)}>
                            <Image src={category.picture} thumbnail fluid style={{ width: "250px", height: "250px", borderRadius: "10%" }} />
                            <h4 className="mt-3">{category.category}</h4>
                            <p className="">{category.information} </p>
                        </Button>
                    </Col>
                ))}

            </Row>
            <Row className="mt-3" ref={categoryRef}>
                {selectedCategory && (
                    <Col>
                        <Button variant="secondary" onClick={handleClearFilters}>Изчистване на филтъра</Button>
                        <h3 className="mt-3"> {selectedCategory.category}:</h3>
                        <Row>
                            {filteredUsers.map((user, index) => (
                                <Col key={index} md={4} className="mb-3">
                                    <Link to={`/home/craftsmen/${user.id}`}>
                                        <Card className="card-img">
                                            <Card.Img variant="top" src={user.photo} style={{ width: "250px", height: "285px" }} />
                                            <Card.Body>
                                                <Card.Title>{user.name}</Card.Title>
                                                {loggedUser && (
                                                    <Card.Text>
                                                        Телефонен номер: {user.phoneNumber}<br />
                                                        Имейл адрес: {user.email}<br />
                                                    </Card.Text>
                                                )}
                                                <Card.Text>
                                                    Рейтинг: {user.averageRating}<br />
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                )}

            </Row >




            <Row className="mt-3" ref={searchRef}>
                {selectedInput && (
                    <Col>
                        <Button variant="secondary" onClick={handleClearFilters}>
                            Изчистване на филтъра
                        </Button>
                        <h3 className="mt-3">Search Results:</h3>
                        {filteredUsers.length > 0 ? (
                            <Row>
                                {filteredUsers.map((user, index) => (
                                    <Col key={index} md={4} className="mb-3">
                                        <Link to={`/home/craftsmen/${user.id}`}>
                                            <Card className="card-img">
                                                <Card.Img variant="top" src={user.photo} style={{ width: "250px", height: "285px" }} />
                                                <Card.Body>
                                                    <Card.Title>{user.name}</Card.Title>
                                                    {loggedUser && (
                                                        <Card.Text>
                                                            Телефонен номер: {user.number}
                                                            <br />
                                                            Имейл адрес: {user.email}
                                                            <br />
                                                        </Card.Text>
                                                    )}
                                                    <Card.Text>
                                                        Рейтинг: {user.averageRating.toFixed(2)}
                                                        <br />
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Link>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <p>Не бяха намерени резултати.</p>
                        )}
                    </Col>
                )}
            </Row>
            <Row>
                <Advertisement></Advertisement>
            </Row>
        </Container>

    );
};

export default Craftsman;