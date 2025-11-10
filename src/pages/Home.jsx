import '../styles/Home.css'
import avatar from "../assets/imagen2.png";
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <section className="Home">
            <img src={avatar} alt="Mi Avatar" className="Home__Avatar" />

            <h1>¡Hola! Soy Gerardo A. B.</h1>
            <p>Desarrollador web en formación, apasionado por la tecnología y la creación de soluciones digitales.</p>
            <div className="Home__Buttons">
            <Link className='Home__Button' to="/proyectos">Ver proyectos</Link>
            <Link className='Home__Button' to="/contacto">Contáctame</Link>
            </div>
        </section>
    )
}

export default Home
