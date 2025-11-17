import { useState } from 'react'
import '../styles/Projects.css'
import imgContador from '../assets/Imagenes proyectos/image7.png';
import imgPersonal from '../assets/Imagenes proyectos/personal.png';
import imgTareas from '../assets/Imagenes proyectos/tareas.png';
import { Link } from 'react-router-dom';

const Projects = () => {

  const [proyectos, setProyectos] = useState([
    { 
      id: 1, 
      nombre: "Ecommerce", 
      // 🟢 En lugar de la ruta interna, guardamos la URL externa completa
      ruta: "https://ecommercefinal2025.netlify.app", 
      descripcion: "trata de una página de ecommerce, se desarrollada tanto el back como el front", 
      imagen: imgContador,
      esExterno: true // 🟢 Bandera para identificar el link externo
    },
    { id: 2, nombre: "Bodega en casa", ruta: "/proyectos/Bodega", descripcion: "Aplicación de inventario en casa", imagen: imgPersonal, esExterno: false },
    { id: 3, nombre: "Casino", ruta: "/proyectos/casino", descripcion: "Aplicación de juego de casino (tragamonedas)", imagen: imgTareas, esExterno: false }
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

            {/* 🟢 Lógica Condicional para el Enlace */}
            {proyecto.esExterno ? (
              <a 
                className='Target__verMas' 
                href={proyecto.ruta} 
                target="_blank" /* 🟢 Abre en nueva pestaña */
                rel="noopener noreferrer" /* 🟢 Recomendado por seguridad */
              >
                Ir a Página
              </a>
            ) : (
              <Link 
                className='Target__verMas' 
                to={proyecto.ruta}
              >
                Ir a Página
              </Link>
            )}
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