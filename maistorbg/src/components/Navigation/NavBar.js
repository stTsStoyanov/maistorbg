import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import "./NavBar.scss"
import localStorageManager from '../../model/managers/localStorageManager';

function NavBar() {
    const logged = localStorageManager.loggedUser();

    return (
        <Nav variant="pills" defaultActiveKey="/home" className='NavBar' sticky="top">
            <Nav.Item>
                <Nav.Link eventKey="link-1" as={Link} to="/register" className='NavLink'>
                    Регистрация
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2" as={Link} to="/login" className='NavLink'>
                    Вход
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-3" as={Link} to="/home" className='NavLink'>
                    Начало
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-4" as={Link} to="/home/offers" className='NavLink' >
                    Всички обяви
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-5" as={Link} to="/home/craftsmen" className='NavLink' >
                    Майстори
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
}

export default NavBar;
