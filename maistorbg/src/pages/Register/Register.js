
// import React from 'react';
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'regular',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUserTypeChange = (event) => {
    const { value } = event.target;
    setFormData((prevData) => ({ ...prevData, userType: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData); // Replace with form submission logic
  };

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

            <Form.Group controlId="formBasicUserType">
              <Form.Label>Вид потребител</Form.Label>
              <Form.Control
                as="select"
                name="userType"
                value={formData.userType}
                onChange={handleUserTypeChange}
                className="mb-3"
              >
                <option value="regular">Потребител</option>
                <option value="craftsmen">Майстор</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="btn btn-primary mb-3">
              Регистрация
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
