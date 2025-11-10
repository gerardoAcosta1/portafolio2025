import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home";
import Projects from "./Pages/Projects";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProyectoPage from './pages/Proyectos/ProyectoPage';
import { enviarMensaje } from "./pages/utils/socket.js"

// En algún lugar de tu código, por ejemplo una función:


function App() {


  enviarMensaje("conectar base");


  return (

    <Router>

      <Navbar />
      <main className='main'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/proyectos' element={<Projects />} />
          <Route path='/sobre-mi' element={<About />} />
          <Route path='/contacto' element={<Contact />} />
          <Route path="/proyectos/:ruta" element={<ProyectoPage />} />

        </Routes>
      </main>
      <Footer />
    </Router>


  );
}

export default App
