import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import "./TopCraftsmen.scss";
import { delayFunction } from "../../utilFunctions/utilFunctions";
import localStorageManager from "../../model/managers/localStorageManager";
import SpinnerLoader from "../SpinnerLoader/SpinnerLoader";

const TopCraftsmen = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [topCraftsmen, setTopCraftsmen] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const usersAndCraftsmen = await delayFunction(localStorageManager.getItem, ["users"]);
      const craftsmen = usersAndCraftsmen.filter((person) => !person.isClient);
      const topCraftsmen = craftsmen
        .sort((a, b) => b.averageRating - a.averageRating)
        .slice(0, 6);

      setTopCraftsmen(topCraftsmen);

      const user = await delayFunction(localStorageManager.getItem, ["loggedUser"]);
      setLoggedUser(user);
      
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <SpinnerLoader />;
  }

  return (
    <div className="top-craftsmen">
      <div className="mx-md-5 my-5 reviews-container">
        <h2 className="text-center">Топ 6 майстора!</h2>
        <Row className="specific-role-style">
          {topCraftsmen.map((craftsman, index) => (
            <Col sm={1} md={6} lg={4} key={index} className="column-custom-style">
              <Card className="craftsman-card mb-3">
                <div className="craftsman-image-container">
                  <Card.Img variant="top" src={craftsman.photo} className="craftsman-image" />
                </div>
                <Card.Body>
                  <Card.Title className="craftsman-name">{craftsman.name}</Card.Title>
                  <Card.Text className="craftsman-reviewer">
                    Рейтинг: {craftsman.averageRating}
                    <br />
                    {loggedUser && <span>Телефонен номер: {craftsman.phoneNumber}<br /></span>}
                    {loggedUser && <span>Имейл адрес: {craftsman.email}<br /></span>}
                    Умения: {craftsman.skills ? craftsman.skills.join(", ") : "No skills specified"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default TopCraftsmen;
