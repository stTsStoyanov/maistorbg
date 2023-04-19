import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./MyProfileCraftmenInformationComponent.scss";

function MyProfileCraftmenInformationComponent({ user }) {
  const [showPassword, setShowPassword] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    localStorage.setItem('loggedUser', JSON.stringify(updatedUser));
  }

  return (
    <div className="user-infoo">
      <h1>Твоята информация</h1>
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Име</Form.Label>
          <Form.Control type="text" name="name" value={updatedUser.name} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicPhone">
          <Form.Label>Телефонен номер</Form.Label>
          <Form.Control type="tel" name="phoneNumber" value={updatedUser.phoneNumber} onChange={handleInputChange} />
        </Form.Group>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Потребителско име</Form.Label>
          <Form.Control type="text" value={updatedUser.username} readOnly />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Имейл</Form.Label>
          <Form.Control type="email" value={updatedUser.email} readOnly />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Парола</Form.Label>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            value={updatedUser.password}
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
        <Button variant="primary" onClick={handleSaveClick}>
          Запази
        </Button>
      </Form>
    </div>
  );
}

export default MyProfileCraftmenInformationComponent;
