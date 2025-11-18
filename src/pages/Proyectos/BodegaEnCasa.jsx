import { useEffect, useState } from 'react';
import '../Proyectos/styles/BodegaEnCasa.css'
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


    async function fetchCajas() {
        // Cargar Cajas
        const { data: dataCajas, error: errorCajas } = await supabase
            .from('Cajas')
            .select('*');

        if (errorCajas) {
            console.error('Error al cargar cajas:', errorCajas);
        } else {
            setCajas(dataCajas);
        }

        // Cargar Objetos
        const { data: dataObjetos, error: errorObjetos } = await supabase
            .from('Objetos')
            .select('*');

        if (errorObjetos) {
            console.error('Error al cargar objetos:', errorObjetos);
        } else {
            setObjetos(dataObjetos);
        }
    }


    useEffect(() => {
        setCargaPrimera(true);
    }, [])

    useEffect(() => {
        fetchCajas();
    }, []);

    /*------------------ funciones (USANDO SUPABASE) -------------------*/

    const agregarObjeto = async (e) => {
        e.preventDefault();

        const nuevoObjeto = {
            nombre: nombre,
            caja: parseInt(numeroCaja, 10) 
        }

        const { error } = await supabase
            .from('Objetos')
            .insert([nuevoObjeto]);

        if (error) {
            console.error('Error al agregar objeto:', error);
        } else {
            fetchCajas();
            setInputObjeto(false);
        }
        
        setNombre("");
        setNumeroCaja("");
    }



    const eliminarObjeto = async (objeto) => {
        console.log("Eliminando objeto con ID:", objeto.id_objeto);

        const { error } = await supabase
            .from('Objetos')
            .delete()
            .eq('id_objeto', objeto.id_objeto); 

        if (error) {
            console.error('Error al eliminar objeto:', error);
        } else {
            fetchCajas();
        }
    }

    const crearCaja = async () => {
      const numero_caja = (cajas.length > 0 ? cajas.length : 0) + 1;
  
      const nuevaCaja = {
          numero_caja: numero_caja,
          seccion: 'A' 
      }
      
      console.log("Creando caja:", nuevaCaja);
      
      const { error } = await supabase
          .from('Cajas')
          .insert([nuevaCaja]);
  
      if (error) {
          console.error('Error al crear caja:', error);
      } else {
          fetchCajas(); 
      }
  }

    const eliminarCaja = async (id)=> {
        console.log("Eliminando caja con ID:", id);
        
        const { error: errorCaja } = await supabase
            .from('Cajas')
            .delete()
            .eq('id_caja', id); 

        if (errorCaja) {
            console.error('Error al eliminar caja:', errorCaja);
        } else {
            const { error: errorObjetos } = await supabase
                .from('Objetos')
                .delete()
                .eq('caja', id);
                
            if (errorObjetos) {
                console.error('Error al eliminar objetos asociados:', errorObjetos);
            }
            
            fetchCajas();
        }
    }


    
    const cajasFiltradas = cajas.filter(caja => {
        if (!cosa) {
            return true;
        }

        const objetosEnCaja = objetos.filter(objeto => objeto.caja === caja.id_caja);

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
                    onClick={fetchCajas} 
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
                                    const textoBuscado = cosa.toLowerCase();
                                    const esEncontrado = cosa && objeto.nombre.toLowerCase().includes(textoBuscado);
                                    const claseCuadroObjeto = `cuadro__objeto ${esEncontrado ? 'objeto__encontrado' : ''}`;
                                    
                                    return (
                                    <ul key={index} className='ul__objeto'>
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