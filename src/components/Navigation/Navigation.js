import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';

import "./Navigation.scss"

function Navigation() {

  return (
    <Navbar>
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link} to="/home/catalog">
            Catalog
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} eventKey="link-1" to="/home/offers">
            Offers
          </Nav.Link>
        </Nav.Item>
       

      <Navbar.Collapse className="justify-content-end">
        <Link to="/profile">
          <Image
            src={"../../images/userImg.jpg"}
            alt="Profile"
            roundedCircle
            width={40}
            height={40}
            className="ml-auto"
          />
        </Link>
      </Navbar.Collapse>

      </Nav>
      
    </Navbar>
  );
}

export default Navigation;