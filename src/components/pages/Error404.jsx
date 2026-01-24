import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import '../../styles/error404.css'; 

import fondoImg from '../../img/404.jpeg'; 

const Error404 = () => {
  return (
    <div 
      className="error-container"
      style={{ 
        backgroundImage: `linear-gradient(rgba(12, 28, 60, 0.85), rgba(12, 28, 60, 0.9)), url(${fondoImg})` 
      }}
    >
      <h1 className="error-title">ERROR 404</h1>
      
      <h2 className="error-subtitle">PÁGINA NO ENCONTRADA</h2>
      
      <p className="error-text">
        Como una final perdida, <br />
        este camino tampoco era <br />
        el correcto.
      </p>
      
            <div className="justify-content-center mb-4">
        <Button as={Link} to="/" className="boton-volver-inicio">
          <span><i className="bi bi-arrow-bar-left"> Volver al Inicio </i></span>
        </Button>
      </div>
    </div>
    
  );
};

export default Error404;