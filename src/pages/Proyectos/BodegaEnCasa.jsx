import { useEffect, useState } from 'react';
import '../Proyectos/styles/BodegaEnCasa.css'

import api from '../utils/api';

import { supabase } from '../utils/supabaseClient.js'; // Importa el cliente inicializado



const BodegaEnCasa = () => {

  
  const [sinSombra, setSinSombra] = useState(true)
  const [cajas, setCajas] = useState([])
  const [objetos, setObjetos] = useState([])
  const [nombre, setNombre] = useState("");
  const [numeroCaja, setNumeroCaja] = useState("");
  const [inputObjeto, setInputObjeto] = useState(false)
  const [cosa, setCosa] = useState(""); 
  const [cargaPrimera, setCargaPrimera] = useState(true); 
  /*------------------------useefectsss */
  useEffect(() => {
  //  api.getCajas().then(data => setCajas(data))
      setCargaPrimera(true);
  }, [])

  useEffect(() => {
    async function fetchCajas() {
      // 1. Usa .from('nombre_de_la_tabla')
      // 2. Usa .select('*') para seleccionar todas las columnas
      const { data, error } = await supabase
        .from('Cajas')
        .select('*');

      if (error) {
        console.error('Error al cargar productos:', error);
      } else {
        setCajas(data);
        console.log(data)
      }
      const { data: data2, error: error2 } = await supabase // <-- NOTA LA SINTAXIS
            .from('Objetos')
            .select('*');
      if (error2) {
        console.error('Error al cargar objetos:', error2);
      } else {
        setObjetos(data2);
        console.log(data2)
      }
    }
    fetchCajas();
  }, []);
  /*------------------ funciones -------------------*/
  /*const pruebaapi = () => {
    api.getCajas().then(data => setCajas(data))
    console.log(cajas)

    api.getObjetos().then(data => setObjetos(data))
  }*/

  const agregarObjeto = async (e) => {

    e.preventDefault();

    const objeto = {
      nombre: nombre,
      caja: parseInt(numeroCaja, 10)
    }

    console.log(objeto)
    
   // await api.crearObjeto(objeto).then(data => console.log(data))
   // await api.getObjetos().then(data => setObjetos(data))
    setNombre("")
    setNumeroCaja("")

  }



  const eliminarObjeto = async (objeto) => {
    console.log(objeto)
    //await api.eliminarObjeto(objeto)
    //await api.getObjetos().then(data => setObjetos(data))


  }

  const crearCaja = async () => {
    const numero_caja = cajas.length + 1

    const objeto = {
      numero_caja: numero_caja,
    }
    console.log(objeto)
    await api.crearCaja(objeto).then(data => console.log(data))
    await api.getObjetos().then(data => setObjetos(data))
    await api.getCajas().then(data => setCajas(data))

  }

  const eliminarCaja = async (id)=> {

    const objeto = {
      nombre: nombre,
      caja: parseInt(id, 10)
    }
    console.log(id)
    //await api.eliminarCaja(objeto).then(data => console.log(data));
   //await api.getCajas().then(data => setCajas(data)); 

  }


  /*------------------ LÓGICA DE FILTRADO -------------------*/
  
  const cajasFiltradas = cajas.filter(caja => {
    // Si el input está vacío, muestra todas las cajas
    if (!cosa) { // Simplificado: si cosa es nulo o cadena vacía
      return true;
    }

    // Encuentra todos los objetos que pertenecen a esta caja
    const objetosEnCaja = objetos.filter(objeto => objeto.caja === caja.id_caja);

    // Verifica si AL MENOS UN objeto en esta caja incluye el texto buscado
    const textoBuscado = cosa.toLowerCase();
    
    const contieneObjeto = objetosEnCaja.some(objeto => 
      objeto.nombre.toLowerCase().includes(textoBuscado)
    );

    return contieneObjeto;
  });
  
  /*--------- jsx --------------------------------------------*/
  return (
    <div className="container__bodega">

      <h1 className="titulo__bodega">Bodega </h1>
      <input type="text"
className='input__buscarObjeto'
      value={cosa}
      onChange={(e) => setCosa(e.target.value)}
      placeholder="Buscar objeto por nombre..."
      />
      <div className='cuerpo__bodega'>

        <div className='container__cabecera'>

        <button
          className={`boton__prueba ${sinSombra ? '' : 'sin__sombra'}`}
          
          onMouseDown={() => setSinSombra(false)}
          onMouseUp={() => setSinSombra(true)}
          onMouseLeave={() => setSinSombra(true)}
        > Actualizar </button>
        <button className='agregarObjeto' onClick={() => setInputObjeto(true)}>Agregar Objeto</button>
        <button className='agregar__caja' onClick={crearCaja}>agregar caja</button>
        </div>
        

        <div className='container__cajas'>

        <div className={`mensaje__inicial ${cargaPrimera ? '' : 'ocultar__mensajeInicial'}`}>
          <h3 className='desciption__inicial'>Esta es una aplicación sencilla para inventario, lo que hice fue agregar objetos en cajas y 
            poder buscarlo mediante su nombre y saber en qué caja se encuentran. Puede agregar una nueva caja, un nuevo objeto, o eliminar un objeto o caja existente</h3>
          <button className='button__inicial' onClick={() => setCargaPrimera(false)}> aceptar</button>
        </div>
          {cajasFiltradas.map(caja => ( 
            <div key={caja.id_caja} className='caja'>
              <h1 className='titulo__caja'>{caja.seccion}-{caja.numero_caja}<h2 className='eliminar__caja' onClick={()=> eliminarCaja(caja.id_caja)}>X</h2></h1>
              
              <div className='container__objetos'>
                {objetos && objetos.filter(objeto => objeto.caja == caja.id_caja).map((objeto, index) => {
                  // 🟢 LÓGICA PARA RESALTAR EL OBJETO
                  const textoBuscado = cosa.toLowerCase();
                  const esEncontrado = cosa && objeto.nombre.toLowerCase().includes(textoBuscado);
                  const claseCuadroObjeto = `cuadro__objeto ${esEncontrado ? 'objeto__encontrado' : ''}`;
                  
                  return (
                  <ul key={index} className='ul__objeto'>
                    {/* 🟢 APLICACIÓN DE LA CLASE CONDICIONAL */}
                    <div className={claseCuadroObjeto}> 
                      <li className='nombre__objeto'>{objeto.nombre}</li>
                      <h4 className='eliminar__objeto' onClick={() => eliminarObjeto(objeto)}>x</h4>
                    </div>
                  </ul>
                  );
                })}
              </div>
              <div className='Pie__Caja'></div>
            </div>
          ))}
        </div>
        <form action="" onSubmit={agregarObjeto} className={`input__objeto ${inputObjeto ? '' : 'ocultarInputObjeto'}`}>
          <h3 className='cerrar__input' onClick={() => setInputObjeto(false)}>x</h3>
          <h2 className='Titulo__Agregar__Objeto'>Agregar Objeto</h2>
          <input type="text" className='input' placeholder="Nombre Objeto" value={nombre} onChange={(e) => setNombre(e.target.value)}></input>
          <input type="text" className='input' placeholder="numero caja " value={numeroCaja} onChange={(e) => setNumeroCaja(e.target.value)} ></input>
          <button type="submit" className='input__button'>Entrar</button>

        </form>

      </div>

    </div>
  )
}

export default BodegaEnCasa