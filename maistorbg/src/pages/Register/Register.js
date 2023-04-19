import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import userManager from "../../model/managers/userManager"

const RegistrationForm = () => {

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    isClient: false,
  });

  const history = useNavigate();

  const [formDataConfirm, setFormDataConfirm] = useState({
    confirmPassword: ''
  })

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordConfirm = (event) => {
    const { name, value } = event.target;
    setFormDataConfirm((prevData) => ({ ...prevData, [name]: value }));
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
    .then(response =>{
      if(response){
        history('/login')
      }
    })
    console.log(formData);

    
  };

  const handleFormValidation = () => {
    setIsFormValid(formData.email !== '' &&
      formData.username !== '' &&
      formData.password !== '' &&
      formDataConfirm.confirmPassword !== '');
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md="6">
          <h1 className="text-center mb-4">Регистрация</h1>
          <Form className="border p-4" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email адрес</Form.Label>
              <Form.Control
                type="email"
                placeholder="Въведете, вашият email адрес"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="mb-3"
                required
                title="Моля въведете валиден имйел адрес."
              />
            </Form.Group>

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

            <Form.Group controlId="formBasicisClient">
              <Form.Label>Вид потребител</Form.Label>
              <Form.Control
                as="select"
                name="isClient"
                value={formData.isClient}
                onChange={handleisClientChange}
                className="mb-3"
              >
                <option value='true'>Потребител</option>
                <option value='false'>Майстор</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isButtonDisabled} onClick={handleFormValidation}>
              Регистрация
            </Button>
          </Form>
          {isFormValid ? (
            <Alert variant="success" className="mt-4">
              Формата е попълнена успешно.
            </Alert>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;






// // import React from 'react';
// import React, { useEffect ,useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Container, Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import userManager from "../../model/managers/userManager"

// const RegistrationForm = () => {

//   const [formData, setFormData] = useState({
//     email: '',
//     username: '',
//     password: '',
//     isClient: false,
//   });

//   const history = useNavigate();

//   const [formDataConfirm , setFormDataConfirm] = useState({
//     confirmPassword: ''
//   })

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handlePasswordConfirm = (event) => {
//     const { name, value } = event.target;
//     setFormDataConfirm((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleisClientChange = (event) => {
//     const { value } = event.target;


//     setFormData((prevData) => ({ ...prevData, isClient: value }));
//   };

//   const isButtonDisabled = formData.password !== formDataConfirm.confirmPassword;

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     userManager.register(formData)
//     console.log(formData);
//     history('/login')
//   };


//   useEffect( () => {

//   },[])
// //   console.log(formData)

//   return (
//     <Container className="my-5">
//       <Row className="justify-content-md-center">
//         <Col md="6">
//           <h1 className="text-center mb-4">Регистрация</h1>
//           <Form className="border p-4" onSubmit={handleSubmit}>


//             <Form.Group controlId="formBasicEmail">
//               <Form.Label>Email адрес</Form.Label>
//               <Form.Control
//                 type="email"
//                 placeholder="Въведете, вашият email адрес"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 className="mb-3"
//               />
//             </Form.Group>


//             <Form.Group controlId="formUsername">
//             <Form.Label>Потребителско име</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Моля, въведете псевдоним"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 className="mb-3"
//               />
//             </Form.Group>

//             <Form.Group controlId="formBasicPassword">
//               <Form.Label>Парола</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Парола"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 className="mb-3"
//               />
//             </Form.Group>

//             <Form.Group controlId="formConfirmPassword">
//               <Form.Label>Повторна парола</Form.Label>
//               <Form.Control
//                 type="password"
//                 placeholder="Повторна парола"
//                 name="confirmPassword"
//                 value={formDataConfirm.confirmPassword}
//                 onChange={handlePasswordConfirm}
//                 className="mb-3"
//               />
//             </Form.Group>

//             <Form.Group controlId="formBasicisClient">
//               <Form.Label>Вид потребител</Form.Label>
//               <Form.Control
//                 as="select"
//                 name="isClient"
//                 value={formData.isClient}
//                 onChange={handleisClientChange}
//                 className="mb-3"
//               >
//                 <option value='true'>Потребител</option>
//                 <option value='false'>Майстор</option>
//               </Form.Control>
//             </Form.Group>

//             <Button variant="primary" type="submit" className="btn btn-primary mb-3" disabled={isButtonDisabled} >
//               Регистрация
//             </Button>
//           </Form>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default RegistrationForm;
