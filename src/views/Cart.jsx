import React from 'react';
import { useGlobal } from '../context/GlobalContext';
import { formatNumber } from '../utils/format';

const Cart = () => {
  // Se Trae todos los estados y funciones desde el contexto centralizado
  const { cart, increaseCount, decreaseCount, total } = useGlobal();
  console.log("Contenido actual del carrito:", cart);
  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="mb-4">Detalles del pedido:</h3>
      
      <div className="p-3 border rounded shadow-sm bg-white">
        {cart.length === 0 ? (
          <p className="text-center text-muted">Tu carrito está vacío</p>
        ) : (
          cart.map((pizza) => (
            <div key={pizza.id} className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
              {/* Sección de Imagen Dinámica y Nombre */}
              <div className="d-flex align-items-center" style={{ gap: '15px' }}>
                <img 
                  src={pizza.img} 
                  alt={pizza.name} 
                  style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} 
                  onError={(e) => { 
                    // Si el enlace de Firebase falla, usamos imágenes públicas idénticas de Unsplash
                    const copias = {
                      "española": "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?w=120",
                      "napolitana": "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=120",
                      "salame": "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=120",
                      "pollo picante": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=120",
                      "bacon": "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=120",
                      "cuatro estaciones": "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=120"
                    };
                    e.target.src = copias[pizza.name.toLowerCase()] || "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=120";
                  }} 
                />
                <span className="text-capitalize fw-bold">{pizza.name}</span>
              </div>

              {/* Precio, Botones y Cantidad */}
              <div className="d-flex align-items-center" style={{ gap: '15px' }}>
                <span className="fw-bold fs-5">
                  ${formatNumber(pizza.price * pizza.count)}
                </span>
                
                {/* Botón Decrementar (-) conectado al contexto */}
                <button 
                  className="btn btn-outline-danger btn-sm" 
                  onClick={() => decreaseCount(pizza.id)}
                  style={{ width: '30px', height: '30px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  -
                </button>
                
                {/* Cantidad global */}
                <span className="fw-bold fs-5">{pizza.count}</span>
                
                {/* Botón Incrementar (+) conectado al contexto */}
                <button 
                  className="btn btn-outline-primary btn-sm" 
                  onClick={() => increaseCount(pizza.id)}
                  style={{ width: '30px', height: '30px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sección del Total dinámico y Botón de Pagar */}
      <div className="mt-4">
        <h2 className="fw-bold">Total: ${formatNumber(total)}</h2>
        <button className="btn btn-dark mt-3 px-4 py-2 fs-5">
          Pagar
        </button>
      </div>
    </div>
  );
};

export default Cart;