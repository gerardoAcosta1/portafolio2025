import { useParams } from "react-router-dom";
import TragaMonedas from "./TragaMonedas";
import BodegaEnCasa from "./BodegaEnCasa";
import '../Proyectos/styles/ProyectPages.css'
const ProyectoPage = () => {
    
    
        const { ruta } = useParams();

        const filtro = (ruta) => {
            switch (ruta) {
                case "casino":
                    return <TragaMonedas />;
                case "Bodega":
                    return <BodegaEnCasa/>;
                case "contador":
                    return <h1>Contador React</h1>;
                default:
                    return <h1>Proyecto no encontrado</h1>;
            }
        };
        
        return (
          <div className="main__proyectPage">
            
            {

               filtro(ruta)
            }
            
          </div>
        );
      
}

export default ProyectoPage
