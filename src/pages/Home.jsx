import '../styles/Home.css'
import avatar from "../assets/imagen2.png";


const Home = () => {
    return (
        <section className="Home">
            <img src={avatar} alt="Mi Avatar" className="Home__Avatar" />

            <h1>¡Hola! Soy Gerardo A. B.</h1>
            <p>Desarrollador web en formación, apasionado por la tecnología y la creación de soluciones digitales.</p>
            <div className="Home__Buttons">
                <a className='Home__Button' href="/proyectos">Ver proyectos</a>
                <a className='Home__Button' href="/contacto">Contáctame</a>
            </div>
        </section>
    )
}

export default Home
