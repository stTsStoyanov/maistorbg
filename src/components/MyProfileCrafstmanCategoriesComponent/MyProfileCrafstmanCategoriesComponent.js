import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./MyProfileCrafstmanCategoriesComponent.scss";
import localStorageManager from "../../model/managers/localStorageManager";

function CheckboxList() {
  const [checkboxes, setCheckboxes] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    localStorageManager
      .getItem("craftsmenCategories")
      .then((categoriesData) => {
        if (categoriesData) {
          const categories = Object.entries(categoriesData).map(
            ([key, value]) => ({
              id: key,
              label: value.category,
              checked: false,
            })
          );
          setCheckboxes(categories);
        }
      });
  }, []);

  const handleCheckboxChange = (id) => {
    setCheckboxes(
      checkboxes.map((checkbox) =>
        checkbox.id === id
          ? { ...checkbox, checked: !checkbox.checked }
          : checkbox
      )
    );
  };

  const handleSaveClick = () => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) {
      const selectedCategories = checkboxes
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.label);
      loggedUser.skills = selectedCategories;

      localStorageManager.setItem("loggedUser", loggedUser);

      localStorageManager.getItem("users").then((users) => {
        const userToUpdate = users.find((user) => user.id === loggedUser.id);
        if (userToUpdate) {
          userToUpdate.skills = selectedCategories;

          localStorageManager.setItem("users", users);
          setShowAlert(true);
          setTimeout(() => {
            navigate("/home");
          }, 800);
        }
      });
    }
  };

  return (
    <div className="container-checkboxx">
      <Container className="checkbox-list">
        <Row>
          <Col>
            <h1>
              Моля изберета категориите, които съответстват на уменията Ви
            </h1>
            <Form className="center">
              {checkboxes.map((checkbox) => (
                <Form.Check
                  className="checkbox"
                  key={checkbox.id}
                  type="checkbox"
                  id={checkbox.id}
                  label={checkbox.label}
                  checked={checkbox.checked}
                  onChange={() => handleCheckboxChange(checkbox.id)}
                />
              ))}
              {showAlert && (
                <Alert
                  variant="success"
                  onClose={() => setShowAlert(false)}
                  dismissible
                >
                  Благодарим Ви, Вашата информация беше запазена успешно!
                </Alert>
              )}
              <Button
                variant="secondary"
                className="button, bnt"
                onClick={handleSaveClick}
              >
                Запазване на промените
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CheckboxList;
