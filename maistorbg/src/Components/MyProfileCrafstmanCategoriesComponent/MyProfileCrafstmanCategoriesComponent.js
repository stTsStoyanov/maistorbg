import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './MyProfileCrafstmanCategoriesComponent.scss';

function CheckboxList() {
  const [checkboxes, setCheckboxes] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const categoriesData = JSON.parse(localStorage.getItem('craftsmenCategories'));
    if (categoriesData) {
      const categories = Object.entries(categoriesData).map(([key, value]) => ({
        id: key,
        label: value.category,
        checked: false,
      }));
      setCheckboxes(categories);
    }
  }, []);

  const handleCheckboxChange = (id) => {
    setCheckboxes(
      checkboxes.map((checkbox) =>
        checkbox.id === id ? { ...checkbox, checked: !checkbox.checked } : checkbox
      )
    );
  };

  const handleSaveClick = () => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if (loggedUser) {
      const selectedCategories = checkboxes.filter((checkbox) => checkbox.checked).map((checkbox) => checkbox.label);
      loggedUser.skills = selectedCategories;
      localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
  
      const users = JSON.parse(localStorage.getItem('users'));
      const userToUpdate = users.find((user) => user.id === loggedUser.id);
      if (userToUpdate) {
        userToUpdate.skills = selectedCategories;
        localStorage.setItem('users', JSON.stringify(users));
        setShowAlert(true);
        setTimeout(() => {
          navigate('/home'); 
        }, 800); 
      }
    }
  };
  

  return (
    <div className='container-checkboxx'>
      <Container className="checkbox-list">
        <Row>
          <Col>
            <h1>Моля изберета категориите, които съответстват на уменията Ви</h1>
            <Form className="center">
              {checkboxes.map((checkbox) => (
                <Form.Check className='checkbox'
                  key={checkbox.id}
                  type="checkbox"
                  id={checkbox.id}
                  label={checkbox.label}
                  checked={checkbox.checked}
                  onChange={() => handleCheckboxChange(checkbox.id)}
                />
              ))}
              {showAlert && (
              <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                Благодарим Ви, Вашата информация беше запазена успешно!
              </Alert>
            )}
              <Button variant="secondary" className='button, bnt' onClick={handleSaveClick}>Запазване на промените</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CheckboxList;
