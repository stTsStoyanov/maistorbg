import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./UserMyInformationComponent.scss";
import localStorageManager from "../../model/managers/localStorageManager";

function MyProfileCraftmenInformationComponent({ user }) {
  const [updatedUser, setUpdatedUser] = useState(user);
  const [isSaved, setIsSaved] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [disableSave, setDisableSave] = useState(true);
  
  useEffect(() => {
    if (updatedUser.name && updatedUser.phoneNumber && dateOfBirth) {
      setDisableSave(false);
    } else {
      setDisableSave(true);
    }
  }, [updatedUser, dateOfBirth]);

  useEffect(() => {
    localStorageManager.getItem("loggedUser").then((loggedUser) => {
      if (loggedUser && loggedUser.name && loggedUser.phoneNumber) {
        setIsSaved(true);
      }
      if (loggedUser && loggedUser.dateOfBirth) {
        setDateOfBirth(loggedUser.dateOfBirth);
      }
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (event) => {
    const { value } = event.target;
    setDateOfBirth(value);
    setUpdatedUser((prevState) => ({
      ...prevState,
      dateOfBirth: value,
    }));
  };

  const handleSaveClick = () => {
    localStorageManager.setItem("loggedUser", updatedUser);
    setIsSaved(true);

    localStorageManager.getItem("users").then((allUsers) => {
      const userId = updatedUser.id;

      const updatedUsers = allUsers.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            name: updatedUser.name,
            phoneNumber: updatedUser.phoneNumber,
            dateOfBirth: updatedUser.dateOfBirth,
          };
        } else {
          return user;
        }
      });

      localStorageManager.setItem("users", updatedUsers);
    });
  };

  return (
    <div className="user-infoo">
      <h1>Твоята информация</h1>
      <Form>
        <Form.Group controlId="formBasicName">
          <Form.Label>Име</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={handleInputChange}
            readOnly={isSaved}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPhone">
          <Form.Label>Телефонен номер</Form.Label>
          <Form.Control
  type="tel"
  name="phoneNumber"
  value={updatedUser.phoneNumber}
  pattern="[0-9]*"
  inputMode="numeric"
  onKeyPress={(event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }}
  onPaste={(event) => {
    event.preventDefault();
  }}
  onChange={handleInputChange}
  readOnly={isSaved}
/>
        </Form.Group>

        <Form.Group controlId="formBasicDateOfBirth">
          <Form.Label>Дата на раждане</Form.Label>
          <Form.Control
            type="date"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={handleDateChange}
            readOnly={isSaved}
          />
          {!updatedUser.name && !updatedUser.phoneNumber && (
            <div>
              <Alert variant="danger">
                Моля въведете Вашите данни по-горе!
              </Alert>
            </div>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicUsername">
          <Form.Label>Потребителско име</Form.Label>
          <Form.Control type="text" value={updatedUser.username} readOnly />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Имейл</Form.Label>
          <Form.Control type="email" value={updatedUser.email} readOnly />
        </Form.Group>
        <Link to="/home/myprofile/user/myinformation/changepass">
          <Button variant="secondary">Смени парола</Button>
        </Link>
        {!isSaved && (
          <Button
          className="but"
          variant="secondary"
          onClick={handleSaveClick}
          disabled={disableSave}
        >
          Запази
        </Button>
        )}
      </Form>
    </div>
  );
}

export default MyProfileCraftmenInformationComponent;
