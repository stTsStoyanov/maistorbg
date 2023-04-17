// import React, { useState, useEffect } from 'react';
// import { Card, Container, Button, Form, FormControl, InputGroup } from 'react-bootstrap';

// const Craftsman = () => {
//   const [users, setUsers] = useState([]);
//   const [craftsmenCategories, setCraftsmenCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
//     setUsers(storedUsers);

//     const storedCraftsmenCategories = JSON.parse(localStorage.getItem('craftsmenCategories')) || [];
//     setCraftsmenCategories(storedCraftsmenCategories);
//   }, []);

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     const filteredUsers = users.filter(
//       (user) => !user.isClient && user.skills.includes(category.category)
//     );
//     setSearchResults(filteredUsers);
//   };

//   const handleClearFilters = () => {
//     setSelectedCategory(null);
//     setSearchResults([]);
//   };

//   const handleSearch = (event) => {
//     const searchTerm = event.target.value;
//     setSearchTerm(searchTerm);

//     const debounceTimeout = setTimeout(() => {
//       const filteredUsers = users.filter(
//         (user) =>
//           !user.isClient &&
//           ['name', 'skills', 'email', 'number'].some(
//             (property) => user[property].toLowerCase().includes(searchTerm.toLowerCase())
//           )
//       );
//       setSearchResults(filteredUsers);
//     }, 500);

//     return () => clearTimeout(debounceTimeout);
//   };

//   return (
//     <Container>
//       <h1>My Page</h1>
//       <InputGroup className="mb-3">
//         <FormControl
//           placeholder="Search for craftsmen..."
//           aria-label="Search"
//           aria-describedby="basic-addon2"
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//         <Button variant="outline-secondary" id="button-addon2" onClick={() => setSearchTerm('')}>
//           Clear
//         </Button>
//       </InputGroup>
//       <Container>
//         {craftsmenCategories.map((category) => (
//           <div key={category.id}>
//             <h3>{category.category}</h3>
//             <Card onClick={() => handleCategoryClick(category)} style={{ cursor: 'pointer' }}>
//               <Card.Img variant="top" src={category.picture} />
//               <Card.Body>
//                 <Card.Title>{category.category}</Card.Title>
//                 <Card.Text>{category.information}</Card.Text>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </Container>
//       {selectedCategory && (
//         <>
//           <h3>Results for category: {selectedCategory.category}</h3>
//           <Container>
//             {searchResults.map((user) => (
//               <Card key={user.id}>
//                 <Card.Img variant="top" src={user.photo} />
//                 <Card.Body>
//                   <Card.Title>{user.name}</Card.Title>
//                   <Card.Text>{user.skills.join(', ')}</Card.Text>
//                   <Card.Text>{user.email}</Card.Text>
//                   <Card.Text>{user.number}</Card.Text>
//                   <Card.Text>Rating: {user.averageRating}</Card.Text>
//                 </Card.Body>
//               </Card>
//             ))}
//           </Container>
//           <Button onClick={handleClearFilters}>Clear filters</Button>
//         </>
//       )}
//     </Container>
//   );
// };


// export default Craftsman;



import React, { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, FormControl, Button, Card, Image } from "react-bootstrap";

const Craftsman = () => {
  const [craftsmenCategories, setCraftsmenCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    // Load craftsmen categories from local storage
    const categoriesFromLocalStorage = JSON.parse(localStorage.getItem("craftsmenCategories"));
    setCraftsmenCategories(categoriesFromLocalStorage);

    // Load all users from local storage
    const usersFromLocalStorage = JSON.parse(localStorage.getItem("users"));
    setUsers(usersFromLocalStorage);
    setFilteredUsers(usersFromLocalStorage.filter(user => user.isClient === false));
  }, []);

  useEffect(() => {
    // Filter users based on search query
    const filtered = users.filter(user => {
      if (user.isClient) {
        return false;
      }
      const skills = user.skills || [];
      return skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    });
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filtered = users.filter(user => {
      if (user.isClient) {
        return false;
      }
      const skills = user.skills || [];
      return skills.includes(category.category);
    });
    setFilteredUsers(filtered);
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setFilteredUsers(users.filter(user => user.isClient === false));
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <InputGroup>
            <FormControl placeholder="Search for a skill" value={searchQuery} onChange={handleSearch} />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        {craftsmenCategories.map(category => (
          <Col key={category.id} md={4} className="mb-3">
            <Button variant="light" onClick={() => handleCategoryClick(category)}>
              <Image src={category.picture} thumbnail fluid />
              <h4 className="mt-3">{category.category}</h4>
              <p>{category.information}</p>
            </Button>
          </Col>
        ))}
      </Row>
      <Row className="mt-3">
        {selectedCategory && (
          <Col>
            <Button variant="secondary" onClick={handleClearFilters}>Clear Filters</Button>
            <h3 className="mt-3">Craftsmen for {selectedCategory.category}:</h3>
            <Row>
              {filteredUsers.map(user => (
                <Col key={user.id} md={4} className="mb-3">
                  <Card>
                    <Card.Img variant="top" src={user.photo} />
                    <Card.Body>
                      <Card.Title>{user.name}</Card.Title>
                      <Card.Text>
                        Phone: {user.number}<br />
                        Email: {user.email}<br />
                        Rating: {user.averageRating}<br />
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Craftsman;















// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, InputGroup, FormControl, Button, Image } from 'react-bootstrap';

// const MyPage = () => {
//   const [users, setUsers] = useState([]);
//   const [craftsmenCategories, setCraftsmenCategories] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredResults, setFilteredResults] = useState([]);

//   // fetch users and craftsmenCategories from local storage on mount
//   useEffect(() => {
//     const usersFromLocalStorage = localStorage.getItem('users');
//     if (usersFromLocalStorage) {
//       setUsers(JSON.parse(usersFromLocalStorage));
//     }

//     const craftsmenCategoriesFromLocalStorage = localStorage.getItem('craftsmenCategories');
//     if (craftsmenCategoriesFromLocalStorage) {
//       setCraftsmenCategories(JSON.parse(craftsmenCategoriesFromLocalStorage));
//     }
//   }, []);

//   // debounce searchQuery updates
//   useEffect(() => {
//     const debounceTimeout = setTimeout(() => {
//       const filteredUsers = users.filter(user => !user.isClient && Object.values(user).some(value => String(value).toLowerCase().includes(searchQuery.toLowerCase())));
//       setFilteredResults(filteredUsers);
//     }, 500);

//     return () => clearTimeout(debounceTimeout);
//   }, [users, searchQuery]);

//   const handleCategoryClick = category => {
//     const filteredUsers = users.filter(user => !user.isClient && user.category === category);
//     setFilteredResults(filteredUsers);
//   };

//   const handleClearFilters = () => {
//     setSearchQuery('');
//     setFilteredResults([]);
//   };

//   return (
//     <Container>
//       <Row className="mb-3">
//         <Col>
//           <InputGroup>
//             <FormControl placeholder="Search for craftsmen..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
//           </InputGroup>
//         </Col>
//       </Row>
//       <Row>
//         {craftsmenCategories.map(({ picture, category, information }) => (
//           <Col key={category} md={4} className="mb-3">
//             <Button variant="link" onClick={() => handleCategoryClick(category)}>
//               <div className="text-black text-center mb-3">{category}</div>
//               <Image src={picture} fluid rounded className="mx-auto d-block" style={{ width: '200px', height: '200px' }} />
//               <p className="text-black">{information}</p>
//             </Button>
//           </Col>
//         ))}
//       </Row>
//       {filteredResults.length > 0 && (
//         <>
//           <Row className="mt-5">
//             <Col>
//               <Button variant="danger" onClick={handleClearFilters}>Clear filters</Button>
//             </Col>
//           </Row>
//           <Row className="mt-5">
//             {filteredResults.map(({ id, name, category, description, image }) => (
//               <Col key={id} md={4} className="mb-3">
//                 <Image src={image} fluid rounded className="mx-auto d-block" style={{ width: '200px', height: '200px' }} />
//                 <h3>{name}</h3>
//                 <p>{category}</p>
//                 <p>{description}</p>
//               </Col>
//             ))}
//           </Row>
//         </>
//       )}
//     </Container>
//   );
// };
