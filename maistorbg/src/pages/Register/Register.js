
// import React from 'react';
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: '',
    isClient: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleisClientChange = (event) => {
    const { value } = event.target;


    setFormData((prevData) => ({ ...prevData, isClient: value }));
  };

  const isButtonDisabled = formData.password !== formData.confirmPassword;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // Replace with form submission logic
  };

//   console.log(formData)

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md="6">
          <h1 className="text-center mb-4">Регистрация</h1>
          <Form className="border p-4" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Имена</Form.Label>
              <Form.Control
                type="text"
                placeholder="Моля, въведете вашите имена"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email адрес</Form.Label>
              <Form.Control
                type="email"
                placeholder="Въведете, вашият email адрес"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Телефонен номер</Form.Label>
              <Form.Control
                type="phone"
                placeholder="Въведете, вашият телефонен номер"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formUsername">
            <Form.Label>Псевдоним</Form.Label>
              <Form.Control
                type="text"
                placeholder="Моля, въведете псевдоним"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Парола</Form.Label>
              <Form.Control
                type="password"
                placeholder="Парола"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword">
              <Form.Label>Повторна парола</Form.Label>
              <Form.Control
                type="password"
                placeholder="Повторна парола"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="mb-3"
              />
            </Form.Group>

            <Form.Group controlId="formBasicisClient">
              <Form.Label>Вид потребител</Form.Label>
              <Form.Control
                as="select"
                name="isClient"
                value={formData.isClient}
                onChange={handleisClientChange}
                className="mb-3"
              >
                <option value='true'>Потребител</option>
                <option value='false'>Майстор</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="btn btn-primary mb-3" disabled={isButtonDisabled} >
              Регистрация
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
