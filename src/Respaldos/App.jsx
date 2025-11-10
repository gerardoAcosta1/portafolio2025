import { useState } from 'react'
import './App.css'
import Cabecera from './componentes/Base/Cabecera.jsx';
import Central from './componentes/Base/Central.jsx';
import Pie from './componentes/Base/Pie.jsx';

function App() {




  return (
   
      <div className='main__principal'>

      <Cabecera/>
      <Central/>
      <Pie/>
      </div>
      

  )
}

export default App