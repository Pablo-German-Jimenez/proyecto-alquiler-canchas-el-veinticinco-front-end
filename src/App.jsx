import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Menu from "./components/shared/Menu";
import Footer from "./components/shared/Footer";
import Error404 from "./components/pages/Error404";
import Inicio from "./components/pages/Inicio";
import CatalogoElla from "./components/pages/productos/CatalogoElla";
import CatalogoHombre from "./components/pages/productos/CatalogoHombre";
import CatalogoNinios from "./components/pages/productos/CatalogoNinios";
import CatalogoAccesorio from "./components/pages/productos/CatalogoAccesorio";
import Administrador from "./components/pages/administrador";
import Login from "./components/pages/Login";
import Registro from "./components/pages/Registro";
import Contacto from "./components/pages/Contacto";
import Nosotros from "./components/pages/Nosotros";
import FormularioTurno from "./components/pages/turno/FormularioTurno";
import "./styles/inicio.css";

function App() {
  // Productos creados
  const [productosCreados, setProductosCreados] = useState(() => {
    const stored = localStorage.getItem("productosCreados");
    return stored ? JSON.parse(stored) : [];
  });

  // Estado global del usuario
  const [usuarioLogueado, setUsuarioLogueado] = useState(() => {
    const stored = sessionStorage.getItem("usuarioKey");
    return stored ? JSON.parse(stored) : { isAdmin: false };
  });

  // Guardar usuario en sessionStorage
  useEffect(() => {
    sessionStorage.setItem("usuarioKey", JSON.stringify(usuarioLogueado));
  }, [usuarioLogueado]);

  // Guardar productos
  useEffect(() => {
    localStorage.setItem("productosCreados", JSON.stringify(productosCreados));
  }, [productosCreados]);

  // Modales login/registro
  const [showLogin, setShowLogin] = useState(false);
  const [showRegistro, setShowRegistro] = useState(false);

  const abrirLogin = () => setShowLogin(true);
  const cerrarLogin = () => setShowLogin(false);

  const abrirRegistro = () => setShowRegistro(true);
  const cerrarRegistro = () => setShowRegistro(false);

  // Cerrar sesión
  const cerrarSesion = () => {
    setUsuarioLogueado({ isAdmin: false });

    // borrar turno de sessionStorage
    sessionStorage.removeItem("turnoActual");

    // avisar a Inicio.jsx que borre su estado
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <BrowserRouter>
      {/* Navbar */}
      <Menu
        isAdmin={usuarioLogueado.isAdmin}
        usuario={usuarioLogueado.nombre}
        abrirLogin={abrirLogin}
        abrirRegistro={abrirRegistro}
        cerrarSesion={cerrarSesion}
      />

      {/* Modales */}
      <Login
        show={showLogin}
        handleClose={cerrarLogin}
        abrirRegistro={() => {
          cerrarLogin();
          abrirRegistro();
        }}
        setUsuarioLogueado={setUsuarioLogueado}
      />

      <Registro
        show={showRegistro}
        handleClose={cerrarRegistro}
        abrirLogin={() => {
          cerrarRegistro();
          abrirLogin();
        }}
        setUsuarioLogueado={setUsuarioLogueado}
      />

      <main>
        <Routes>
          <Route
            path="/administrador"
            element={
              usuarioLogueado.isAdmin ? (
                <Administrador
                  productosCreados={productosCreados}
                  setProductosCreados={setProductosCreados}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route
            path="/productos/catalogoElla"
            element={<CatalogoElla productosCreados={productosCreados} />}
          />
          <Route
            path="/productos/catalogoHombre"
            element={<CatalogoHombre productosCreados={productosCreados} />}
          />
          <Route
            path="/productos/catalogoNinios"
            element={<CatalogoNinios productosCreados={productosCreados} />}
          />
          <Route
            path="/productos/catalogoAccesorio"
            element={<CatalogoAccesorio productosCreados={productosCreados} />}
          />
          <Route path="/turno/formularioTurno" element={<FormularioTurno />} />
           <Route
            path="/admin"
            element={
              usuarioLogueado.isAdmin ? (
                <Administrador
                  productosCreados={productosCreados}
                  setProductosCreados={setProductosCreados}
                />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />


          <Route
            path="/"
            element={
              <Inicio
                usuarioLogueado={usuarioLogueado}
                abrirRegistro={abrirRegistro}
              />
            }
          />

          <Route path="/contacto" element={<Contacto />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
