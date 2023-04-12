import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import "./NavBar.scss"

function NavBar() {
    return (
        <Nav variant="pills" defaultActiveKey="/home" className='NavBar'>
            <Nav.Item>
                <Nav.Link eventKey="link-1" as={Link} to="/home/register" className='NavLink'>
                    Регистрация
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2" as={Link} to="/home/login" className='NavLink'>
                    Вход
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-3" as={Link} to="/home/offers" className='NavLink'>
                    Всички обяви
                    </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-4" as={Link} to="/home/craftsmen" className='NavLink'>
                    Майстори
                    </Nav.Link>
            </Nav.Item>
            {/* <Nav.Item>
                <Nav.Link eventKey="disabled" disabled>
                    Disabled
                </Nav.Link>
            </Nav.Item> */}
        </Nav>
    );
}

export default NavBar;