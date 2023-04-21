import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, InputGroup, FormControl, Button, Card, Image, Form } from "react-bootstrap";
import debounce from "lodash/debounce";
import { useNavigate, Link } from 'react-router-dom';

const Craftsman = () => {
  const [craftsmenCategories, setCraftsmenCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedInput, setSelectedInput] = useState(null);

  const history = useNavigate();
  const categoryRef = useRef(null);
  const searchRef = useRef(null);

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



  const handleSearch = debounce((event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchQuery(searchValue);
  
    const filteredData = filteredUsers.filter(item => {
      const skills = item.skills || [];
      return (
        item?.name?.toLowerCase().includes(searchValue) ||
        item?.email?.toLowerCase().includes(searchValue) ||
        item?.phoneNumber?.includes(searchValue) ||
        skills.some(skill => skill.toLowerCase().includes(searchValue))
      );
    });
  
    setSelectedInput(filteredData);
  
    if (searchRef.current) {
      searchRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, 500);
  
  


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

    if (categoryRef.current) {
      categoryRef.current.scrollIntoView({ behavior: "smooth" });
    //   window.scrollTo(0, categoryRef.current.offsetTop);
    }
  };



  const handleClearFilters = () => {
    setSelectedInput(null)
    setSelectedCategory(null);
    setSearchQuery("");
    setFilteredUsers(users.filter(user => user.isClient === false));
  };


    return (
        <Container>
            <Row className="mt-3">
                <Col>
                    <InputGroup>
                        <FormControl placeholder="Майстор с какви умения търсите? Например: заварчик, електричар, проектант..." onChange={handleSearch} />
                    </InputGroup>
                </Col>
            </Row>
            <Row className="mt-3">
                {craftsmenCategories.map(category => (
                    <Col key={category.id} md={4} className="mb-3">
                        <Button variant="light" onClick={() => handleCategoryClick(category)}>
                            <Image src={category.picture} thumbnail fluid style={{ width: "250px", height: "250px" }} />
                            <h4 className="mt-3">{category.category}</h4>
                            <p>{category.information}</p>
                        </Button>
                    </Col>
                ))}
            </Row>
            <Row className="mt-3" ref={categoryRef}>
                {selectedCategory && (
                    <Col>
                        <Button variant="secondary" onClick={handleClearFilters}>Clear Filters</Button>
                        <h3 className="mt-3">Craftsmen for {selectedCategory.category}:</h3>
                        <Row>
                            {filteredUsers.map((user, index) => (
                                <Col key={index} md={4} className="mb-3">
                                    <Link to={`/home/craftsmen/${user.id}`}>
                                        <Card>
                                            <Card.Img variant="top" src={user.photo} style={{ width: "250px", height: "300px" }} />
                                            <Card.Body>
                                                <Card.Title>{user.name}</Card.Title>
                                                <Card.Text>
                                                    Phone: {user.number}<br />
                                                    Email: {user.email}<br />
                                                    Rating: {user.averageRating}<br />
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                )}
                
            </Row >

            

            <Row className="mt-3" ref={searchRef}>
                {selectedInput && (
                    <Col>
                        <Button variant="secondary" onClick={handleClearFilters}>
                            Clear Filters
                        </Button>
                        <h3 className="mt-3">Search Results:</h3>
                        {filteredUsers.length > 0 ? (
                            <Row>
                                {filteredUsers.map((user, index) => (
                                    <Col key={index} md={4} className="mb-3">
                                        <Card>
                                            <Card.Img variant="top" src={user.photo} style={{ width: "250px", height: "300px" }} />
                                            <Card.Body>
                                                <Card.Title>{user.name}</Card.Title>
                                                <Card.Text>
                                                    Phone: {user.number}
                                                    <br />
                                                    Email: {user.email}
                                                    <br />
                                                    Rating: {user.averageRating}
                                                    <br />
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        ) : (
                            <p>No results found.</p>
                        )}
                    </Col>
                )}
            </Row>
        </Container>
        
    );
};

export default Craftsman;








// import React, { useState, useEffect, useRef } from "react";
// import { Container, Row, Col, InputGroup, FormControl, Button, Card, Image, Form } from "react-bootstrap";
// import debounce from "lodash/debounce";
// import { useNavigate, Link } from 'react-router-dom';

// const Craftsman = () => {
//   const [craftsmenCategories, setCraftsmenCategories] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedInput, setSelectedInput] = useState(null);

//   const history = useNavigate();
//   const categoryRef = useRef(null);
//   const searchRef = useRef(null);

//   useEffect(() => {
//     // Load craftsmen categories from local storage
//     const categoriesFromLocalStorage = JSON.parse(localStorage.getItem("craftsmenCategories"));
//     setCraftsmenCategories(categoriesFromLocalStorage);

//     // Load all users from local storage
//     const usersFromLocalStorage = JSON.parse(localStorage.getItem("users"));
//     setUsers(usersFromLocalStorage);
//     setFilteredUsers(usersFromLocalStorage.filter(user => user.isClient === false));
//   }, []);

//   useEffect(() => {
//     // Filter users based on search query
//     let test = [];
//     const filtered = users.filter(user => {
//       if (user.isClient) {
//         return false;
//       }
//       const skills = user.skills || [];
//     //   console.log(skills)

//     //   return skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
//     });
//     setFilteredUsers(filtered);
//     // console.log(test)
//   }, [searchQuery, users]);


  
//   const handleSearch = debounce((event) => {
//     const searchValue = event.target.value.toLowerCase();
//     setSearchQuery(searchValue);
  
//     const filtered = users.filter(user => {
//       if (user.isClient) {
//         return false;
//       }
//       const skills = user.skills || [];
//       return skills.some(skill => skill.toLowerCase().includes(searchValue));
//     });
//     setFilteredUsers(filtered);
  
//     if (searchRef.current) {
//       searchRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, 500);
  

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     const filtered = users.filter(user => {
//       if (user.isClient) {
//         return false;
//       }
//       const skills = user.skills || [];
//       return skills.includes(category.category);
//     });
//     setFilteredUsers(filtered);

//     if (categoryRef.current) {
//       categoryRef.current.scrollIntoView({ behavior: "smooth" });
//     //   window.scrollTo(0, categoryRef.current.offsetTop);
//     }
//   };



//   const handleClearFilters = () => {
//     setSelectedInput(null)
//     setSelectedCategory(null);
//     setSearchQuery("");
//     setFilteredUsers(users.filter(user => user.isClient === false));
//   };


//     return (
//         <Container>
//             <Row className="mt-3">
//                 <Col>
//                     <InputGroup>
//                         <FormControl placeholder="Майстор с какви умения търсите? Например: заварчик, електричар, проектант..." onChange={handleSearch} />
//                     </InputGroup>
//                 </Col>
//             </Row>
//             <Row className="mt-3">
//                 {craftsmenCategories.map(category => (
//                     <Col key={category.id} md={4} className="mb-3">
//                         <Button variant="light" onClick={() => handleCategoryClick(category)}>
//                             <Image src={category.picture} thumbnail fluid style={{ width: "250px", height: "250px" }} />
//                             <h4 className="mt-3">{category.category}</h4>
//                             <p>{category.information}</p>
//                         </Button>
//                     </Col>
//                 ))}
//             </Row>
//             <Row className="mt-3" ref={categoryRef}>
//                 {selectedCategory && (
//                     <Col>
//                         <Button variant="secondary" onClick={handleClearFilters}>Clear Filters</Button>
//                         <h3 className="mt-3">Craftsmen for {selectedCategory.category}:</h3>
//                         <Row>
//                             {filteredUsers.map((user, index) => (
//                                 <Col key={index} md={4} className="mb-3">
//                                     {/* <Button variant="outline-light" onClick={handleCraftsmanClick(user.id)} style={{}}> */}
//                                     <Link to={`/home/craftsmen/${user.id}`}>
//                                         <Card>
//                                             <Card.Img variant="top" src={user.photo} style={{ width: "250px", height: "300px" }} />
//                                             <Card.Body>
//                                                 <Card.Title>{user.name}</Card.Title>
//                                                 <Card.Text>
//                                                     Phone: {user.number}<br />
//                                                     Email: {user.email}<br />
//                                                     Rating: {user.averageRating}<br />
//                                                 </Card.Text>
//                                             </Card.Body>
//                                         </Card>
//                                         {/* </Button> */}
//                                     </Link>
//                                 </Col>
//                             ))}
//                         </Row>
//                     </Col>
//                 )}
                
//             </Row >

            

//             <Row className="mt-3">
//                 {selectedInput && (
//                     <Col>
//                         <Button variant="secondary" onClick={handleClearFilters}>
//                             Clear Filters
//                         </Button>
//                         <h3 className="mt-3">Search Results:</h3>
//                         {filteredUsers.length > 0 ? (
//                             <Row>
//                                 {filteredUsers.map((user, index) => (
//                                     <Col key={index} md={4} className="mb-3">
//                                         <Card>
//                                             <Card.Img variant="top" src={user.photo} style={{ width: "250px", height: "300px" }} />
//                                             <Card.Body>
//                                                 <Card.Title>{user.name}</Card.Title>
//                                                 <Card.Text>
//                                                     Phone: {user.number}
//                                                     <br />
//                                                     Email: {user.email}
//                                                     <br />
//                                                     Rating: {user.averageRating}
//                                                     <br />
//                                                 </Card.Text>
//                                             </Card.Body>
//                                         </Card>
//                                     </Col>
//                                 ))}
//                             </Row>
//                         ) : (
//                             <p>No results found.</p>
//                         )}
//                     </Col>
//                 )}
//             </Row>
//         </Container>
        
//     );
// };

// export default Craftsman;

















// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, InputGroup, FormControl, Button, Card, Image, Form } from "react-bootstrap";
// import debounce from "lodash/debounce";
// import { useNavigate, Link } from 'react-router-dom';



// const Craftsman = () => {
//     const [craftsmenCategories, setCraftsmenCategories] = useState([]);
//     const [users, setUsers] = useState([]);
//     const [filteredUsers, setFilteredUsers] = useState([]);

//     const [searchQuery, setSearchQuery] = useState("");
//     const [selectedCategory, setSelectedCategory] = useState(null);
//     const [selectedInput, setSelectedInput] = useState(null);

//     const history = useNavigate();


//     useEffect(() => {
//         // Load craftsmen categories from local storage
//         const categoriesFromLocalStorage = JSON.parse(localStorage.getItem("craftsmenCategories"));
//         setCraftsmenCategories(categoriesFromLocalStorage);

//         // Load all users from local storage
//         const usersFromLocalStorage = JSON.parse(localStorage.getItem("users"));
//         setUsers(usersFromLocalStorage);
//         setFilteredUsers(usersFromLocalStorage.filter(user => user.isClient === false));
//     }, []);

//     useEffect(() => {
//         // Filter users based on search query
//         const filtered = users.filter(user => {
//             if (user.isClient) {
//                 return false;
//             }
//             const skills = user.skills || [];
//             return skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
//         });
//         setFilteredUsers(filtered);
//     }, [searchQuery, users]);




//     const handleSearch = debounce((event) => {
//         const searchValue = event.target.value.toLowerCase();
//         setSearchQuery(searchValue);

//         const filteredOffers = filteredUsers.filter(
//             // (user) => user.skills.toLowerCase().includes(searchValue)
//             (user) =>
//                 ['name', 'skills', 'email', 'phoneNumber'].some(
//                     (property) => user[property].includes(searchQuery))

//         )

//         console.log(searchValue)
//         setSelectedInput(filteredOffers);
//         console.log(filteredOffers)

//     }, 500);




//     const handleCategoryClick = (category) => {
//         setSelectedCategory(category);
//         const filtered = users.filter(user => {
//             if (user.isClient) {
//                 return false;
//             }
//             const skills = user.skills || [];
//             return skills.includes(category.category);
//         });
//         setFilteredUsers(filtered);
//     };

//     const handleCraftsmanClick = (id) => {
//         history(`/home/craftsmen/${id}`);
//     };


//     const handleClearFilters = () => {
//         setSelectedInput(null)
//         setSelectedCategory(null);
//         setSearchQuery("");
//         setFilteredUsers(users.filter(user => user.isClient === false));
//     };



//     return (
//         <Container>
//             <Row className="mt-3">
//                 <Col>
//                     <InputGroup>
//                         <FormControl placeholder="Майстор с какви умения търсите? Например: заварчик, електричар, проектант..." onChange={handleSearch} />
//                     </InputGroup>
//                 </Col>
//             </Row>
//             <Row className="mt-3">
//                 {craftsmenCategories.map(category => (
//                     <Col key={category.id} md={4} className="mb-3">
//                         <Button variant="light" onClick={() => handleCategoryClick(category)}>
//                             <Image src={category.picture} thumbnail fluid style={{ width: "250px", height: "250px" }} />
//                             <h4 className="mt-3">{category.category}</h4>
//                             <p>{category.information}</p>
//                         </Button>
//                     </Col>
//                 ))}
//             </Row>
//             <Row className="mt-3">
//                 {selectedCategory && (
//                     <Col>
//                         <Button variant="secondary" onClick={handleClearFilters}>Clear Filters</Button>
//                         <h3 className="mt-3">Craftsmen for {selectedCategory.category}:</h3>
//                         <Row>
//                             {filteredUsers.map((user, index) => (
//                                 <Col key={index} md={4} className="mb-3">
//                                     {/* <Button variant="outline-light" onClick={handleCraftsmanClick(user.id)} style={{}}> */}
//                                     <Link to={`/home/craftsmen/${user.id}`}>
//                                         <Card>
//                                             <Card.Img variant="top" src={user.photo} style={{ width: "250px", height: "300px" }} />
//                                             <Card.Body>
//                                                 <Card.Title>{user.name}</Card.Title>
//                                                 <Card.Text>
//                                                     Phone: {user.number}<br />
//                                                     Email: {user.email}<br />
//                                                     Rating: {user.averageRating}<br />
//                                                 </Card.Text>
//                                             </Card.Body>
//                                         </Card>
//                                         {/* </Button> */}
//                                     </Link>
//                                 </Col>
//                             ))}
//                         </Row>
//                     </Col>
//                 )}
//             </Row>


//             <Row className="mt-3">
//                 {selectedInput && (
//                     <Col>
//                         <Button variant="secondary" onClick={handleClearFilters}>
//                             Clear Filters
//                         </Button>
//                         <h3 className="mt-3">Search Results:</h3>
//                         {filteredUsers.length > 0 ? (
//                             <Row>
//                                 {filteredUsers.map((user, index) => (
//                                     <Col key={index} md={4} className="mb-3">
//                                         <Card>
//                                             <Card.Img variant="top" src={user.photo} style={{ width: "250px", height: "300px" }} />
//                                             <Card.Body>
//                                                 <Card.Title>{user.name}</Card.Title>
//                                                 <Card.Text>
//                                                     Phone: {user.number}
//                                                     <br />
//                                                     Email: {user.email}
//                                                     <br />
//                                                     Rating: {user.averageRating}
//                                                     <br />
//                                                 </Card.Text>
//                                             </Card.Body>
//                                         </Card>
//                                     </Col>
//                                 ))}
//                             </Row>
//                         ) : (
//                             <p>No results found.</p>
//                         )}
//                     </Col>
//                 )}
//             </Row>
//         </Container>
//     );
// };

// export default Craftsman;