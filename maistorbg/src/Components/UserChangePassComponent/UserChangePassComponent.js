import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./UserChangePassComponent.scss";

function UserChangePassComponent() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const users = JSON.parse(localStorage.getItem('users'));
    const user = JSON.parse(localStorage.getItem('loggedUser'));
  
    if (user.password !== oldPassword) {
      setErrorMessage('Грешна стара парола! Моля опитайте отново!');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage('Паролите не съвпадат! Моля опитайте отново!');
      return;
    }

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
    setShowSuccessAlert(true);
    setTimeout(() => {
      setShowSuccessAlert(false);
      window.location.href = '/home';
    }, 900); 
  };

  const handleNewPasswordChange = (event) => {
    const password = event.target.value;
    setNewPassword(password);
    setButtonDisabled(password !== confirmNewPassword || oldPassword === '');
    const newPasswordInput = event.target;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      newPasswordInput.classList.add("is-invalid");
      setErrorMessage("Паролата трябва да има поне 8 знака, да съдържа главна и малка буква и цифра!");
    } else {
      newPasswordInput.classList.remove("is-invalid");
      setErrorMessage("");
    }
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
    setButtonDisabled(event.target.value !== newPassword || oldPassword === '');
    const confirmNewPasswordInput = event.target;
    if (!confirmNewPasswordInput.checkValidity()) {
      confirmNewPasswordInput.classList.add("is-invalid");
      setErrorMessage("Паролата трябва да има 8 знака,главна и малка буква и цифра!");
    } else {
      confirmNewPasswordInput.classList.remove("is-invalid");
      setErrorMessage("");
    }
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
    setButtonDisabled(event.target.value === '' || newPassword === '' || confirmNewPassword === '' || newPassword !== confirmNewPassword);
  }

  return (
    <div className="password-change-form-container">
      <h1 className="password-change-form-header">Смяна на паролата</h1>
      <Form onSubmit={handleSubmit} className="password-change-form">
      <Form.Group controlId="oldPassword">
  <Form.Label>Стара парола:</Form.Label>
  <Form.Control
    type="password"
    value={oldPassword}
    onChange={handleOldPasswordChange}
  />
</Form.Group>
        <Form.Group controlId="newPassword">
          <Form.Label>Вашата нова парола:</Form.Label>
          <Form.Control
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
 
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
        {showSuccessAlert && <Alert variant="success">Паролата Ви беше успешно променена!</Alert>}
        <Button variant="secondary" type="submit" disabled={!newPassword || !confirmNewPassword || !oldPassword}>
          Запази промените
        </Button>
      </Form>
    </div>
  );
}


export default UserChangePassComponent;
