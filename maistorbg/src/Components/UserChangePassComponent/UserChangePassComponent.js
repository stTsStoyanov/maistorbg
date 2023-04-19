import React, { useState} from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './UserChangePassComponent.scss';

function UserChangePassComponent() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Паролите не съвпадат! Моля опитайте отново!');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users'));
    const user = JSON.parse(localStorage.getItem('loggedUser'));

    const updatedUsers = users.map((u) => {
      if (u.id === user.id) {
        return {
          ...u,
          password: newPassword,
        };
      } else {
        return u;
      }
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('loggedUser', JSON.stringify({
      ...user,
      password: newPassword,
    }));
    setNewPassword('');
    setConfirmNewPassword('');
    setErrorMessage('');
    alert('Паролата Ви беше успешно променена!');
    window.location.href = '/home';
  };

  return (
    <div className="password-change-form-container">
      <h1 className="password-change-form-header">Смяна на паролата</h1>
      <Form onSubmit={handleSubmit} className="password-change-form">
        <Form.Group controlId="newPassword">
          <Form.Label>Вашата нова парола:</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="confirmNewPassword">
          <Form.Label>Повторете новата Ви парола:</Form.Label>
          <Form.Control
            type="password"
            value={confirmNewPassword}
            onChange={(event) => setConfirmNewPassword(event.target.value)}
          />
        </Form.Group>

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Button variant="secondary" type="submit" disabled={!newPassword || !confirmNewPassword}>
          Запази промените
        </Button>
      </Form>
    </div>
  );
}

export default UserChangePassComponent;