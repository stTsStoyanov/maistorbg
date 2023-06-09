import { useParams } from 'react-router-dom';
import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "./CrafrsmenDetails.scss"


function CraftsmenDetails() {
    const { id } = useParams();
    const craftsmen = JSON.parse(localStorage.getItem('users'));
    const selectedCraftsmen = craftsmen.find((c) => c.id === parseInt(id));
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || false;

    useEffect(() => {

    }, []);

    if (!selectedCraftsmen) {
        return <div>Не беше намерен майстор със съответното ID.</div>;
    }

    const allReviews = JSON.parse(localStorage.getItem('allReviews'));
    const selectedCraftsmenReviews = allReviews.filter((r) => r.craftsmanId === parseInt(id));

    return (
        <Container className='crafrsmenDetails'>
            <Row>
                <Col md={12}>
                    <Card>

                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Card.Img variant="top" src={selectedCraftsmen.photo} alt={selectedCraftsmen.name} style={{ width: "300px", height: "350px" }} />
                                </Col>
                                <Col md={8}>
                                    <br></br>
                                    <Card.Title>{selectedCraftsmen.name}</Card.Title>
                                    {loggedUser && (
                                        <Card.Text>
                                            Имайл адрес: {selectedCraftsmen.email}

                                        </Card.Text>
                                    )}
                                    {loggedUser && (
                                        <Card.Text>
                                            Телефонен номер: {selectedCraftsmen.phoneNumber}
                                        </Card.Text>
                                    )}
                                    {selectedCraftsmenReviews.length > 0 ? (
                                        <div>
                                            <h3>Ревюта:</h3>
                                            {selectedCraftsmenReviews.slice(0, 3).map((r, index) => (
                                                <div key={index}>
                                                    <p>Рейтинг: {r.rating}</p>
                                                    <p>Ревю: {r.review}</p>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>Този майстор все още няма ревюта!</p>
                                    )}
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default CraftsmenDetails;