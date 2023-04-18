import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './MyProfileCrafstmanCategoriesComponent.scss';
function CheckboxList() {
  const [checkboxes, setCheckboxes] = useState([]);


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
        alert('Благодарим Ви, Вашата информация беше запазена успешно!');
      }
    
    }

  };

  return (
    <div className='container-checkbox'>
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
            <Button variant="secondary" className='button' onClick={handleSaveClick}>Запазване на промените</Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
}

export default CheckboxList;
