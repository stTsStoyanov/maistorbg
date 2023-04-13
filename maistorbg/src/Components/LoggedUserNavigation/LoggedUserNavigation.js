import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import "./LoggedUserNavigation.scss"
import userManager from '../../model/managers/userManager';
import localStorageManager from '../../model/managers/localStorageManager';

function NavBarLogged() {

    const handlerLogout = () =>{
        userManager.logout();
    }

    const user = JSON.parse(localStorage.getItem("loggedUser"));
    const logged = user.isClient;

    return (
        <Nav variant="pills" defaultActiveKey="/home" className='NavBar'>
            <Nav.Item>
                <Nav.Link eventKey="link-1" as={Link} to="/home" className='NavLink'>
                    Начало
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link eventKey="link-2" as={Link} to="/home/offers" className='NavLink'>
                    Всички обяви
                    </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link eventKey="link-3" as={Link} to="/home/craftsmen" className='NavLink'>
                    Майстори
                    </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-4" as={Link} to="/home" className='NavLink' onClick={handlerLogout}>
                    Изход   
                    </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-5" as={Link} to={logged ? "/home/myprofile/user" :"/home/myprofile/craftsmen" } className='NavLink' >
                    Профил   
                    </Nav.Link>
            </Nav.Item>

        </Nav>
    );
}

export default NavBarLogged;