import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import userManager from "../../model/managers/userManager"
import "./Register.scss"

const RegistrationForm = () => {

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    isClient: false,
  });

  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');

  const history = useNavigate();

  const [formDataConfirm, setFormDataConfirm] = useState({
    confirmPassword: ''
  })

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value.trim() }));
    if (name === 'email') {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!isValidEmail) {
        setEmailError('Моля въведете валиден имайл адрес');
      } else {
        setEmailError('');
      }
    } else if (name === 'username') {
      const isValidUsername = /^[a-zA-Z0-9]{4,}$/.test(value);
      if (!isValidUsername) {
        setUsernameError('Потребителското име трябва да бъде поне 4 букви, без специални символи и да е на латиница')
      } else {
        setUsernameError('');
      }
    } else if (name === 'password') {
      const isValidPassword = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value);
      if (!isValidPassword) {
        setPasswordError('Паролата трябва да бъде поне 6 знака, трябва да съдържа, главна буква, цифра и специален знак')
      } else {
        setPasswordError('');
      }
    }
  };

  const handlePasswordConfirm = (event) => {
    const { name, value } = event.target;
    setFormDataConfirm((prevData) => ({ ...prevData, [name]: value.trim() }));

    if (value !== formData.password) {
      setConfirmPasswordError('Повторната парола не съответства')
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleisClientChange = (event) => {
    const { value } = event.target;

    setFormData((prevData) => ({ ...prevData, isClient: value }));
  };

  const isButtonDisabled = formData.password !== formDataConfirm.confirmPassword ||
    formData.username.includes(' ') ||
    formData.password.length < 6 ||
    !/[A-Z]/.test(formData.password) ||
    !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isButtonDisabled) {
      return;
    }

    userManager.register(formData)
      .then(response => {
        if (response) {
          setRegisterError('')
          setRegisterSuccess('Успешно се регистрирахте')
          history('/login')
        } else {
          setRegisterError('Потребителското име и/или имейл адреса е зает')
        }
      })


  };

  const handleFormValidation = () => {
    setIsFormValid(formData.email !== '' &&
      formData.username !== '' &&
      formData.password !== '' &&
      formDataConfirm.confirmPassword !== '');
  };

  return (
    // <div className="background-linear-gradient">border p-4
    <div style={{ position: "relative", height: "100%" }}>
      <Container className="my-5">
        <Row className="justify-content-md-center">
          <Col md="6">
            <h1 className="text-center mb-4">Регистрация</h1>
            <Form className="" onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email адрес</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Въведете, вашият email адрес"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mb-3"
                  required
                  title="Моля въведете валиден имйел адрес."
                />
              </Form.Group>
              {/* {emailError && (
              <Alert variant="danger" className="mt-4">
                {emailError}
              </Alert>
            )} */}
              {/* {emailError && (
              <div style={{  top: "bottom", display:"block"}}>
                <Alert variant="danger">{emailError}</Alert>
              </div>
            )} */}
              {emailError && (
                <div style={{ position: "absolute", bottom: "11", left: "75%", transform: "translateX(-50%)" }}>
                  <Alert variant="danger">{emailError}</Alert>
                </div>
              )}



              <Form.Group controlId="formUsername">
                <Form.Label>Потребителско име</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Моля, въведете псевдоним"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="mb-3"
                  required
                  pattern="^[^\s]*$"
                  title="Потребителското име не може да съдържа интервали."
                />
              </Form.Group>
              {usernameError && (
                <div style={{ position: "absolute", bottom: "11", left: "75%", transform: "translateX(-50%)" }}>
                  <Alert variant="danger">{usernameError}</Alert>
                </div>
              )}

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Парола</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Парола"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="mb-3"
                  required
                  minLength={6}
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
                  title="Паролата трябва да съдържа поне 6 символа, включващи главна и малка буква, цифра и специален символ."
                />
              </Form.Group>
              {passwordError && (
                <div style={{ position: "absolute", bottom: "11", left: "75%", transform: "translateX(-50%)" }}>
                  <Alert variant="danger">{passwordError}</Alert>
                </div>
              )}

              <Form.Group controlId="formConfirmPassword">
                <Form.Label>Потвърдете паролата</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Потвърдете паролата"
                  name="confirmPassword"
                  value={formDataConfirm.confirmPassword}
                  onChange={handlePasswordConfirm}
                  className="mb-3"
                  required
                  title="Паролата трябва да съдържа поне 6 символа, включващи главна и малка буква, цифра и специален символ."
                />
              </Form.Group>
              {confirmPasswordError && (
                <div style={{ position: "absolute", bottom: "11", left: "75%", transform: "translateX(-50%)" }}>
                  <Alert variant="danger">{confirmPasswordError}</Alert>
                </div>
              )}

              <Form.Group controlId="formBasicisClient">
                <Form.Label>Моля изберете вид потребител</Form.Label>
                <Form.Select
                  as="select"
                  name="isClient"
                  value={formData.isClient}
                  onChange={handleisClientChange}
                  className="mb-3"

                >
                  <option value='true'>Потребител</option>
                  <option value='false'>Майстор</option>

                </Form.Select>
                {/* Form.Controll */}
              </Form.Group>

              <Link to={'/login'}><h5 className="text-center mb-4">Вече имате профил?</h5></Link>

              <div className="text-center">
                <Button variant="primary" type="submit" disabled={isButtonDisabled} onClick={handleFormValidation}>
                  Регистрация
                </Button>
              </div>
            </Form>
            {/* {isFormValid ? (
            <Alert variant="success" className="mt-4">
              Формата е попълнена успешно.
            </Alert>
          ) : null} */}
            {registerSuccess ?
              <Alert variant="success" className="mt-4">
                {registerSuccess}
              </Alert>
              : null}
            {registerError ?
              <div style={{ position: "absolute", bottom: "22", left: "46%", transform: "translateX(-40%)", margin: "10px" }}>
                <Alert variant="danger">{registerError}</Alert>
              </div>
              : null}
          </Col>
        </Row>
      </Container>
      {/* </div> */}
    </div>
  );
};

export default RegistrationForm;



