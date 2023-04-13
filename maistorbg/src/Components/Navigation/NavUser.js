// import Nav from "react-bootstrap/Nav";
// import { Link } from "react-router-dom";
// import "./NavBar.scss";

// function NavBarUser() {
//   return (
//     <Nav variant="pills" defaultActiveKey="/" className="NavBar">
//       <Nav.Item>
//         <Nav.Link
//           eventKey="link-1"
//           as={Link}
//           to="/register"
//           className="NavLink"
//         >
//           История на обявите
//         </Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link eventKey="link-2" as={Link} to="/" className="NavLink">
//           Твоите обяви
//         </Nav.Link>
//       </Nav.Item>
//       <Nav.Item>
//         <Nav.Link
//           eventKey="link-4"
//           as={Link}
//           to="/home/offers"
//           className="NavLink"
//         >
//           Информация за потребителя
//         </Nav.Link>
//       </Nav.Item>
//     </Nav>
//   );
// }

// export default NavBarUser;

import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from React Router
import "./NavUser.scss"; // Import SCSS file
import userManager from "../../model/managers/userManager";

const ProfilePage = ({ userName, imageUrl }) => {

  const handlerLogout = () =>{
    userManager.logout();
}

  return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex justify-content-center mt-4">
            <img
              src={
                imageUrl ||
                "https://via.placeholder.com/300x300.png?text=Default+Image"
              }
              alt="Profile"
              className="img-fluid profile-image"
            />
          </div>
          <div className="d-flex justify-content-center mt-4">
            <p className="display-4 text-center">
              Добре дошъл {userName} в твоя профил !
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="d-flex justify-content-center">
            <Link to="/home/myprofile/user/history" className="btn btn-secondary btn-lg mx-3">
              <span className="btn-text">Твоята история</span>
              <span className="btn-icon"></span>
            </Link>
            <Link to="/home/myprofile/user/currentoffers" className="btn btn-secondary btn-lg mx-3">
              <span className="btn-text">Твоите обяви</span>
              <span className="btn-icon"></span>
            </Link>
            <Link to="/route3" className="btn btn-secondary btn-lg mx-3">
              <span className="btn-text">Твоята информация</span>
              <span className="btn-icon"></span>
            </Link>
          </div>
          <div className="d-flex justify-content-center mt-4" onClick={handlerLogout}>
            <Link to="/home" className="btn btn-secondary btn-lg">
              <span className="btn-text" style={{ whiteSpace: "pre-wrap" }}>
                Изход профил
              </span>
              <span className="btn-icon"></span>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfilePage;
