// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import '../styles/Navbar.css'

function Navbar() {
    return (
        <nav className="Navbar">
            <ul className="Navbar__Links">
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/proyectos">Proyectos</Link></li>
                <li><Link to="/sobre-mi">Sobre mí</Link></li>
                <li><Link to="/contacto">Contacto</Link></li>
            </ul>
        </nav >
    );
}

export default Navbar;
