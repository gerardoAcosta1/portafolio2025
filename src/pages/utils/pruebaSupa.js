import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient'; // Importa el cliente inicializado

function ProductsList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      // 1. Usa .from('nombre_de_la_tabla')
      // 2. Usa .select('*') para seleccionar todas las columnas
      const { data, error } = await supabase
        .from('Cajas')
        .select('*');

      if (error) {
        console.error('Error al cargar productos:', error);
      } else {
        setProducts(data);
        console.log(data)
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Nuestros Productos</h2>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>Precio: ${product.price}</p>
        </div>
      ))}
    </div>
  );
}
export default ProductsList;