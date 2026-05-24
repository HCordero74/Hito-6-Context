import { useParams } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import { formatNumber } from "../utils/format";

const Pizza = () => {
  // Se Captura el id dinámico de la URL (ej: "p001", "p002", etc.)
  const { id } = useParams();
  
  // Se Trae la función buscadora y la de añadir al carrito desde el contexto
  const { getPizzaById, addToCart } = useGlobal();

  // Se Obtiene la pizza específica de forma dinámica
  const pizza = getPizzaById(id);

  // Si los datos de la API global aún no se cargan, se evita que la app se rompa
  if (!pizza) return <div className="text-center mt-5">Cargando detalles de la pizza...</div>;

  return (
    <div className="container mt-5">
      <div className="card mb-3 shadow-lg overflow-hidden" style={{ maxWidth: "900px", margin: "0 auto" }}>
        <div className="row g-0 align-items-center"> 
          
          <div className="col-md-4 d-flex justify-content-center align-items-center p-3">
            <img 
              src={pizza.img} 
              className="img-fluid h-100 w-100" 
              style={{ 
                objectFit: 'contain', 
                maxHeight: '250px',
                width: 'auto' 
              }}
              alt={pizza.name} 
              onError={(e) => { e.target.src = "https://www.freeiconspng.com/thumbs/pizza-png/pizza-png-15.png"; }}
            />
          </div>

          <div className="col-md-8">
            <div className="card-body h-100 d-flex flex-column justify-content-center">
              <h5 className="card-title text-capitalize fw-bold">{pizza.name}</h5>
              <p className="card-text text-muted">{pizza.desc}</p>
              <hr />
              
              <h6>Ingredientes:</h6>
              <ul className="list-unstyled">
                {pizza.ingredients.map((ing) => (
                  <li key={ing}>🍕 {ing}</li>
                ))}
              </ul>
              
              <div className="mt-auto">
                <h4 className="fw-bold text-success">
                  Precio: ${formatNumber(pizza.price)}
                </h4>
                
                <button 
                  className="btn btn-dark w-100 mt-2"
                  onClick={() => addToCart(pizza)}
                >
                  Añadir al carrito 🛒
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Pizza;