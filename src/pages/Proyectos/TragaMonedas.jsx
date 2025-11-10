import { useEffect, useState, useRef } from 'react';
import './styles/TragaMonedas.css'
import TablaDeValores from './componentes/TablaDeValores';

const symbolFrequency = {
  "bar.png": 20,
  "cherry.png": 15,
  "lemon.png": 10,
  "letter-q.png": 4,
  "orange.png": 6,
  "feather.png": 6,
  "seven.png": 3,
  "win.png": 1
};

const rows = 3;
const cols = 5;

const TragaMonedas = () => {
  const [grid, setGrid] = useState(Array(rows).fill().map(() => Array(cols).fill(null)));
  const [decimales, setDecimales] = useState([]);
  const [spinningCols, setSpinningCols] = useState(Array(cols).fill(false));
  const intervals = useRef([]);

  const virtualReel = [];
  for (const [symbol, count] of Object.entries(symbolFrequency)) {
    for (let i = 0; i < count; i++) {
      virtualReel.push(symbol);
    }
  }

  const startSpin = () => {
    setDecimales([]);
    const newSpinning = Array(cols).fill(true);
    setSpinningCols(newSpinning);

    // Limpiar cualquier intervalo previo
    intervals.current.forEach(clearInterval);
    intervals.current = [];

    for (let j = 0; j < cols; j++) {
      const interval = setInterval(() => {
        setGrid(prevGrid => {
          const newGrid = [...prevGrid];
          for (let i = 0; i < rows; i++) {
            const index = Math.floor(Math.random() * virtualReel.length);
            newGrid[i][j] = virtualReel[index];
          }
          return [...newGrid];
        });
      }, 100);
      intervals.current[j] = interval;
    }
  };

  const stopColumn = (colIndex) => {
    setSpinningCols(prev => {
      const updated = [...prev];
      updated[colIndex] = false;
      return updated;
    });
    clearInterval(intervals.current[colIndex]);
  };

  const stopAll = () => {
    
    setSpinningCols(Array(cols).fill(false));
    intervals.current.forEach(clearInterval);
  };

  return (
    <div className="main__gestor">
      <div className='cabecera__gestor'>
        <h1>Traga Monedas</h1>
      </div>

      <div className='container__game'>
        <div className="reels-container">
          {Array.from({ length: cols }, (_, colIndex) => (
            <div key={colIndex} className="reel">
              <div className={`reel-strip ${spinningCols[colIndex] ? 'reel-amite' : ''}`}>
                {Array.from({ length: rows }, (_, rowIndex) => (
                  <img
                    key={`symbol-${rowIndex}`}
                    className="slot-image"
                    src={`/images/slots/${grid[rowIndex][colIndex] || 'cherry.png'}`}
                    alt={grid[rowIndex][colIndex]}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='container__butoms'>
          <button onClick={startSpin} className="button__iniciar">Girar</button>
          <button onClick={stopAll} className="button__parar">Detener Todo</button>
        </div>

        <div className='botones-columnas'>
          {spinningCols.map((spinning, i) => (
            <button
              key={i}
              disabled={!spinning}
              onClick={() => stopColumn(i)}
              className="button__detenerColumna"
            >
              Detener Columna {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className='container__tablas'>
        <TablaDeValores decimales={decimales} grid={grid} />
        <div className='minisymbols__tablas'>
          {grid.map((row, i) => (
            <div key={i} className="row">
              {row.map((symbol, j) => (
                <div key={j} className="cell">
                 
  <img
  className="tablita"
  src={`/images/slots/${symbol || 'cherry.png'}`}
  alt=""
/>

                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TragaMonedas;
