
// import React from 'react';
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import userManager from "../../model/managers/userManager"

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    userManager.login(formData)
    console.log(formData); // Replace with form submission logic
  };

//   console.log(formData)

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md="6">
          <h1 className="text-center mb-4">Вход</h1>
          <Form className="border p-4" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Име</Form.Label>
              <Form.Control
                type="text"
                placeholder="Моля, въведете вашето потребителско име"
                name="username"
                value={formData.username}
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


            <Button variant="primary" type="submit" className="btn btn-primary mb-3">
              Вход
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
