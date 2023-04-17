import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./MyProfileCraftmenInformationComponent.scss";

function MyProfileCraftmenInformationComponent({ user }) {
  const [showPassword, setShowPassword] = useState(false);
  const { name, email, password, number, username } = user;
  const craftsmenCategories = JSON.parse(localStorage.getItem("craftsmenCategories"));

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const categoryRows = [];
  for (let i = 0; i < craftsmenCategories.length; i += 5) {
    const categories = craftsmenCategories.slice(i, i + 5);
    const categoryCheckboxes = categories.map((category) => {
      return (
        <Form.Check
          key={category.category}
          type="checkbox"
          label={category.category}
        />
      );
    });
    categoryRows.push(
      <div key={i} className="row mb-3">
        {categoryCheckboxes}
      </div>
    );
  }

  return (
    <div className="user-info">
      <h1>Твоята информация</h1>
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Име</Form.Label>
          <Form.Control type="text" value={name} readOnly />
        </Form.Group>

        <Form.Group controlId="formBasicPhone">
          <Form.Label>Телефонен номер</Form.Label>
          <Form.Control type="tel" value={number} readOnly />
        </Form.Group>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Потребителско име</Form.Label>
          <Form.Control type="text" value={username} readOnly />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Имейл</Form.Label>
          <Form.Control type="email" value={email} readOnly />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Парола</Form.Label>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            value={password}
            readOnly
          />
        </Form.Group>

        <Button variant="secondary" onClick={togglePasswordVisibility}>
          {showPassword ? 'Скрий' : 'Покажи'} парола
        </Button>
        <Link to="/home/myprofile/craftsmen/myinformation/changepass">
          <Button variant="secondary">
            Смени парола
          </Button>
        </Link>

        {categoryRows}
      </Form>
    </div>
  );
}

export default MyProfileCraftmenInformationComponent;
