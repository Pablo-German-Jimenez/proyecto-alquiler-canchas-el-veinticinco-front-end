import "../../styles/menu.css";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import logoDibuNeon17 from "../../img/logoDibuNeon17.png";

const Menu = ({
  isAdmin,
  usuario,
  abrirLogin,
  abrirRegistro,
  cerrarSesion,
}) => {
  return (
    <nav className="navbar navbar-expand-md navbar-oscuro">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="text-decoration-none">
          <div className="logo-container">
            <img
              src={logoDibuNeon17}
              alt="logo cancheros"
              className="logo-img"
            />
          </div>
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuCancheros"
          aria-controls="menuCancheros"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú */}
        <div className="collapse navbar-collapse" id="menuCancheros">
          <div className="navbar-nav ms-auto">
            <Link to="/" className="nav-link nav-link-light">
              Inicio
            </Link>

            {isAdmin ? (
              <>
                <Link to="/administrador" className="nav-link nav-link-light">
                  Administrador
                </Link>
                <span
                  className="nav-link nav-link-light"
                  role="button"
                  onClick={cerrarSesion}
                >
                  Cerrar sesión
                </span>
              </>
            ) : usuario ? (
              <>
                <span className="nav-link nav-link-light">
                  <i className="bi bi-person-plus"></i> {usuario}
                </span>
                <span
                  className="nav-link nav-link-light"
                  role="button"
                  onClick={cerrarSesion}
                >
                  Cerrar sesión
                </span>
              </>
            ) : (
              <>
                <span
                  className="nav-link nav-link-light"
                  role="button"
                  onClick={abrirLogin}
                >
                  Iniciar Sesión
                </span>
                <span
                  className="nav-link nav-link-light"
                  role="button"
                  onClick={abrirRegistro}
                >
                  Regístrate
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;
