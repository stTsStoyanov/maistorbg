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

// import React from 'react';
// import Navbar from 'react-bootstrap/Navbar';
// import Nav from 'react-bootstrap/Nav';
// import { Link } from 'react-router-dom';
// import { Image } from 'react-bootstrap';
// import { BrowserRouter} from 'react-router-dom';

// export default function Navigation() {
//   return (
//     <Navbar bg="light" expand="lg">
//       <Navbar.Brand href="#home">My Website</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav">
//         <Nav className="mr-auto">
//           <Nav.Link as={Link} to="/">Home</Nav.Link>
//           <Nav.Link as={Link} to="/about">About</Nav.Link>
//           <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
//         </Nav>
//         <Nav>
//           <Nav.Link as={Link} to="/profile">
//             <Image
//               src="https://via.placeholder.com/40x40"
//               alt="Profile"
//               roundedCircle
//             />
//           </Nav.Link>
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// }

