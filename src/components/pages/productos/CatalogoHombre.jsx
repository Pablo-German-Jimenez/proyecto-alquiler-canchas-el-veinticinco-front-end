import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../styles/catalogos.css";
import { obtenerProducto } from "../../../helpers/queries";

const CatalogoHombre = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const data = await obtenerProducto(); 
        if (Array.isArray(data)) {
          const accesorios = data.filter((p) => 
            p.categoria && p.categoria.toLowerCase() === "hombre"
          );
          setProductos(accesorios);
        }
      } catch (error) {
        console.error("Error al cargar accesorios:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  if (loading) {
    return (
      <div className="container my-5 text-center py-5">
        <div className="spinner-border text-warning" role="status"></div>
        <p className="mt-2">Cargando accesorios...</p>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Indumentaria Hombres</h1>

      {productos.length === 0 ? (
        <div className="text-center alert alert-secondary">
          <h4>No hay accesorios disponibles por el momento.</h4>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {productos.map((producto) => (
            <div key={producto._id} className="col">
              <div className="card h-100 shadow-sm text-center">
                <div className="ratio ratio-1x1">
                  <img
                    src={producto.imagen}
                    className="card-img-top img-fluid img-card1-ellas"
                    alt={producto.nombre}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title texto-ambar fw-bold text-center">
                    {producto.nombre}
                  </h5>
                  <p className="card-text text-muted text-center">
                    {producto.descripcion}
                  </p>
                  <hr />
                  <p className="mb-2">
                    <strong>Precio:</strong>{" "}
                    <span className="texto-ambar fs-5">${producto.precio}</span>
                  </p>
                  <p className="mb-3">
                    <strong>Talles disponibles:</strong>{" "}
                    {Array.isArray(producto.talles) 
                      ? producto.talles.join(", ") 
                      : producto.talles}
                  </p>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-5">
        <Link to="/" className="btn boton-volver-inicio">
          ← Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default CatalogoHombre;
