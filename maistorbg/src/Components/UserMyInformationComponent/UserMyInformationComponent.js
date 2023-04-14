import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './UserMyInformationComponent.scss';

function UserMyInformationComponent({ user }) {
  const [showPassword, setShowPassword] = useState(false);
  const { name, email, password, number, username } = user;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = () => {
    // TODO: implement password change functionality
    console.log('Password changed!');
  };

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
          <Form.Label>потребителско име</Form.Label>
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

        <Link to="/home/myprofile/user/myinformation/changepass">
          <Button variant="secondary">
            Смени парола
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default UserMyInformationComponent;