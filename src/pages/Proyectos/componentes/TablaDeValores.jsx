import '../styles/TablaDeValores.css'


const TablaDeValores = ({decimales}) => {
  return (
    <div className='Tablas__operaciones page-enter'>
        {
          decimales.map((number, index) => (
            <p className='random__operaciones' key={index}>{number}</p>
          ))
        }
        
      </div>
  )
}

export default TablaDeValores
