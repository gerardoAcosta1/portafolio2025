import { useEffect, useState } from 'react'
import '../estilos/Timer.css'
const Timer = () => {

    const [tiempo, setTiempo] = useState(0);
    const [detener, setDetener] = useState(false)
    const [activo, setActivo] = useState(false)
    const [activo2, setActivo2] = useState(false)


    useEffect(() => {
        let interval;

        if (detener) {
            setTiempo(prev => prev + 1);
            interval = setInterval(() => {
                setTiempo(prev => prev + 1);
            }, 1000); // cada segundo
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [detener]);

    const iniciar = () => {
        console.log(activo)
        setActivo(true)
    }


    return (
        <div className='Timer__Main'>
            <button
                className={`Iniciar__Timer  ${activo ? 'presionado__btn' : ''} `}
                onClick={() => setDetener(true)}
                onMouseDown={iniciar}
                onMouseUp={() => setActivo(false)}
            >Iniciar</button>

            <button
                className={`Detener__Timer  ${activo2 ? 'presionado__btn' : ''} `}
                onClick={() => setDetener(false)}
                onMouseDown={() => setActivo2(true)}
                onMouseUp={() => setActivo2(false)}
                onMouseLeave={() => setActivo2(false)} // <-- este faltaba

            >Detener</button>

            <div className='Contenedor__Tiempo'>
                {
                    <p className='Tiempo'>{tiempo}</p>
                }
            </div>


        </div>
    )
}

export default Timer
