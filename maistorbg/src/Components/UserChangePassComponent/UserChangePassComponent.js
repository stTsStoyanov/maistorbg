import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./UserChangePassComponent.scss";
import userManager from "../../model/managers/userManager";
import localStorageManager from "../../model/managers/localStorageManager";

function UserChangePassComponent() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const handlerLogoutCraftsmen = () => {
    userManager.logout();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const users = await localStorageManager.getItem("users");
    const user = await localStorageManager.getItem("loggedUser");

    if (user.password !== oldPassword) {
      setErrorMessage("Грешна стара парола! Моля опитайте отново!");
      return;
    }
    if (newPassword === oldPassword) {
      setErrorMessage(
        "Новата парола не може да бъде същата като старата! Моля опитайте отново!"
      );
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Паролите не съвпадат! Моля опитайте отново!");
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

     localStorageManager.setItem("users", updatedUsers);
     localStorageManager.setItem("loggedUser", {
      ...user,
      password: newPassword,
    });

    setNewPassword("");
    setConfirmNewPassword("");
    setErrorMessage("");
    setShowSuccessAlert(true);

    setTimeout(() => {
      setShowSuccessAlert(false);
      userManager.logout();
      window.location.href = "/home";
    }, 1000);
  };

  const handleNewPasswordChange = (event) => {
    const password = event.target.value;
    setNewPassword(password);
    const newPasswordInput = event.target;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const isValid = newPasswordInput.checkValidity();

    if (!passwordRegex.test(password)) {
      newPasswordInput.classList.add("is-invalid");
      setErrorMessage(
        "Паролата трябва да има поне 8 знака, да съдържа главна и малка буква и цифра!"
      );
    } else {
      newPasswordInput.classList.remove("is-invalid");
      setErrorMessage("");
    }

    setButtonDisabled(
      !passwordRegex.test(password) ||
        password !== confirmNewPassword ||
        oldPassword === ""
    );
  };

  const handleConfirmNewPasswordChange = (event) => {
    const confirmPassword = event.target.value;
    setConfirmNewPassword(confirmPassword);
    const confirmNewPasswordInput = event.target;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (confirmPassword !== newPassword) {
      confirmNewPasswordInput.classList.add("is-invalid");
      setErrorMessage("Паролите не съвпадат! Моля опитайте отново!");
    } else if (!passwordRegex.test(newPassword)) {
      confirmNewPasswordInput.classList.add("is-invalid");
      setErrorMessage(
        "Паролата трябва да има поне 8 знака, да съдържа главна и малка буква и цифра!"
      );
    } else {
      confirmNewPasswordInput.classList.remove("is-invalid");
      setErrorMessage("");
    }

    setButtonDisabled(
      !passwordRegex.test(newPassword) ||
        confirmPassword !== newPassword ||
        oldPassword === ""
    );
  };

  const handleOldPasswordChange = (event) => {
    setOldPassword(event.target.value);
    setButtonDisabled(
      event.target.value === "" ||
        newPassword === "" ||
        confirmNewPassword === "" ||
        newPassword !== confirmNewPassword
    );
  };

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
            onChange={handleConfirmNewPasswordChange}
          />
        </Form.Group>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        {showSuccessAlert && (
          <Alert variant="success">Паролата Ви беше успешно променена!</Alert>
        )}
        <Button variant="secondary" type="submit" disabled={buttonDisabled}>
          Запази промените
        </Button>
      </Form>
    </div>
  );
}

export default UserChangePassComponent;
