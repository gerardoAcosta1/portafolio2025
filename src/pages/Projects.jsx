import { useState } from 'react'
import '../styles/Projects.css'
import imgContador from '../assets/Imagenes proyectos/digital.png';
import imgPersonal from '../assets/Imagenes proyectos/personal.png';
import imgTareas from '../assets/Imagenes proyectos/tareas.png';
import { Link } from 'react-router-dom';
const Projects = () => {

  const [proyectos, setProyectos] = useState([
    { id: 1, nombre: "Contador React", ruta: "contador" ,descripcion: "Contador de clicks usando useState.", imagen: imgContador },
    { id: 2, nombre: "Bodega en casa", ruta: "Bodega", descripcion: "Aplicación de inventario en casa", imagen: imgPersonal },
    { id: 3, nombre: "Casino",  ruta: "casino", descripcion: "Aplicación de juego de casino (tragamonedas)", imagen: imgTareas }
  ]);
  return (
    <div className="Projects__main page-enter">
      <h1 className="Projects__title">Proyectos</h1>
      <p className="Projects__description">
        Algunos de mis trabajos recientes:
      </p>
      <div className="Projects__container">
        {proyectos.map(proyecto => (
          <div className="Target__container" key={proyecto.id}>
            <h2 className="Target__title">{proyecto.nombre}</h2>

            <img src={proyecto.imagen} className="Target__imagen" />


            <p className="Target__description">{proyecto.descripcion}</p>
       
             <Link className='Target__verMas'  to={`/proyectos/${proyecto.ruta}`}>Ir a Página</Link>
            </div>
        ))}
      </div>
      <section className="contact-cta">
        <h2>¿Hablamos?</h2>
        <p>Si tienes un proyecto en mente o preguntas, escríbeme sin compromiso.</p>
        <a href="mailto:tu@correo.com" className="btn-contact">Escríbeme</a>
      </section>
    </div>
  )
}

export default Projects
