import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { Table, Button, Modal, Form } from "react-bootstrap";
import TablaTurno from "../pages/turno/TablaTurno";
import ModalTurno from "../pages/turno/ModalTurno";
import ModalVerTurno from "../pages/turno/ModalVerTurno";
import TablaUsuarios from "../Admin/users/TablaUsuarios";
import "../../styles/sweetalert.css";
import {
  obtenerProducto,
  crearProducto,
  editarProductoService,
  borrarProductoService,
} from "../../helpers/queries";
const Administrador = () => {
  const swalCustomClass = {
    popup: "swal-popup-custom",
    confirmButton: "btn-swal-confirm",
    cancelButton: "btn-swal-cancel",
    title: "swal2-title",
    htmlContainer: "swal2-html-container",
  };

  const [turnos, setTurnos] = useState([]);

  const [turnoEditar, setTurnoEditar] = useState(null);
  const [indiceEditar] = useState(null);
  const [showModalTurno, setShowModalTurno] = useState(false);
  const [showVerModalTurno, setShowVerModalTurno] = useState(false);
  const [turnoVer, setTurnoVer] = useState(null);

  // Cargar turnos desde el backend
  const cargarTurnos = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/reservas");
      if (!res.ok) throw new Error("Error al cargar turnos");
      const data = await res.json();
      setTurnos(data);
    } catch (error) {
      console.error("Error al cargar turnos:", error);
      setTurnos([]);
    }
  };
  const cargarUsuarios = async () => {
    try {
      const respuesta = await obtenerUsuarios();

      if (respuesta && respuesta.status === 200) {
        const data = await respuesta.json();
        setUsuarios(data);
      }
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };
  useEffect(() => {
    cargarTurnos();
  }, []);
  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Ver turno
  const verTurno = (turno) => {
    setTurnoVer(turno);
    setShowVerModalTurno(true);
  };

  // Editar
  const editarTurno = (turno) => {
    setTurnoEditar(turno);
    setShowModalTurno(true);
  };

  // Borrar desde backend
  const borrarTurno = async (indice) => {
    const turno = turnos[indice];
    if (!turno || !turno._id) return;

    const result = await Swal.fire({
      title: "¿Borrar turno?",
      text: "No se puede revertir",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
      customClass: swalCustomClass,
      buttonsStyling: false,
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `http://localhost:3001/api/reservas/${turno._id}`,
          {
            method: "DELETE",
          }
        );

        if (!res.ok) throw new Error("Error al eliminar");

        Swal.fire({
          title: "Borrado",
          text: "Turno eliminado",
          icon: "success",
          customClass: swalCustomClass,
          buttonsStyling: false,
        });

        cargarTurnos();
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "No se pudo borrar",
          icon: "error",
          customClass: swalCustomClass,
          buttonsStyling: false,
        });
      }
    }
  };

  // Cerrar modal: recargar turnos
  const cerrarModalTurno = () => {
    setShowModalTurno(false);
    setTurnoEditar(null);
    cargarTurnos();
  };
  const [productosAPI, setProductosAPI] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [archivoImagen, setArchivoImagen] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    talles: "",
    categoria: "ellas",
  });
  const [errors, setErrors] = useState({});
  const [editandoId, setEditandoId] = useState(null);
  const cargarProductos = async () => {
    try {
      const data = await obtenerProducto();

      if (Array.isArray(data)) {
        setProductosAPI(data);
      }
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  };
  useEffect(() => {
    cargarProductos();
  }, []);

  const abrirCrearProducto = () => {
    setNuevoProducto({
      nombre: "",
      precio: "",
      descripcion: "",
      talles: "",
      categoria: "ellas",
    });
    setArchivoImagen(null);
    setShowModal(true);
    setEditandoId(null);
  };

  /* ver producto */
  const [showVerModal, setShowVerModal] = useState(false);
  const [productoVer, setProductoVer] = useState(null);

  // Función para abrir el modal de ver producto
  const verProducto = (producto) => {
    setProductoVer(producto);
    setShowVerModal(true);
  };

  // Función para abrir el modal con los datos del producto a editar
  const editarProducto = (producto) => {
    const tallesString = Array.isArray(producto.talles)
      ? producto.talles.join(", ")
      : producto.talles;

    setNuevoProducto({
      nombre: producto.nombre,
      precio: producto.precio,
      descripcion: producto.descripcion,
      talles: tallesString,
      categoria: producto.categoria,
    });
    setArchivoImagen(null);
    setEditandoId(producto._id);
    setShowModal(true);
  };

  const validarFormulario = () => {
    const nuevosErrores = {};

    // Validar Nombre
    if (!nuevoProducto.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    } else if (nuevoProducto.nombre.length < 3) {
      nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";
    }

    // Validar Precio
    if (!nuevoProducto.precio) {
      nuevosErrores.precio = "El precio es obligatorio.";
    } else if (nuevoProducto.precio < 0) {
      nuevosErrores.precio = "El precio debe ser un número positivo.";
    }

    // Validar Descripción
    if (!nuevoProducto.descripcion.trim()) {
      nuevosErrores.descripcion = "La descripción es obligatoria.";
    }

    // Validar Talles
    if (!nuevoProducto.talles.trim()) {
      nuevosErrores.talles = "Debes ingresar al menos un talle.";
    }

    // Validar Categoría
    if (!nuevoProducto.categoria) {
      nuevosErrores.categoria = "Selecciona una categoría.";
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const guardarProducto = async () => {
    if (!validarFormulario()) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("nombre", nuevoProducto.nombre);
      formData.append("descripcion", nuevoProducto.descripcion);
      formData.append(
        "precio",
        nuevoProducto.precio.toString().replace("$", "")
      );
      formData.append("talles", nuevoProducto.talles);
      formData.append("categoria", nuevoProducto.categoria);

      if (archivoImagen) {
        formData.append("imagen", archivoImagen);
      }

      let respuesta;

      if (editandoId) {
        respuesta = await editarProductoService(editandoId, formData);
      } else {
        respuesta = await crearProducto(formData);
      }

      if (respuesta && (respuesta.status === 201 || respuesta.status === 200)) {
        Swal.fire({
          icon: "success",
          title: editandoId ? "Producto editado" : "Producto creado",
          timer: 2000,
          showConfirmButton: false,
          customClass: { popup: "swal-popup-custom", title: "swal2-title" },
        });

        cargarProductos();
        setShowModal(false);
      } else {
        const datosError = await respuesta.json();

        const mensajeError = datosError.errores
          ? datosError.errores.map((err) => err.msg).join("<br>")
          : datosError.mensaje || "Error al guardar el producto";

        Swal.fire({
          icon: "error",
          title: "No se pudo guardar",
          html: mensajeError,
          customClass: { popup: "swal-popup-custom", title: "swal2-title" },
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: "No se pudo comunicar con el servidor.",
      });
    }
  };

  const borrarProducto = (id) => {
    Swal.fire({
      title: "¿Seguro quieres borrar?",
      text: "Se eliminará de la base de datos y la nube",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "swal-popup-custom",
        confirmButton: "btn-swal-confirm",
        cancelButton: "btn-swal-cancel",
        title: "swal2-title",
        htmlContainer: "swal2-html-container",
      },
      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const respuesta = await borrarProductoService(id);

          if (respuesta.status === 200) {
            cargarProductos();

            Swal.fire({
              icon: "success",
              title: "Producto borrado",
              timer: 2000,
              showConfirmButton: false,
              customClass: {
                popup: "swal-popup-custom",
                title: "swal2-title",
              },
            });
          } else {
            throw new Error("No se pudo eliminar");
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo eliminar el producto. Intente nuevamente.",
            customClass: {
              popup: "swal-popup-custom",
              confirmButton: "btn-swal-confirm",
              title: "swal2-title",
              htmlContainer: "swal2-html-container",
            },
            buttonsStyling: false,
          });
        }
      }
    });
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center flex-grow-1">Administrador de Productos</h2>
        <Button className="btn-verde" onClick={abrirCrearProducto}>
          + Crear Producto
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Talle</th>
            <th>Imagen</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productosAPI.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center">
                Cargando productos o no hay datos...
              </td>
            </tr>
          ) : (
            productosAPI.map((producto) => (
              <tr key={producto._id} className="text-center">
                <td>{producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>{producto.descripcion}</td>
                <td>
                  {Array.isArray(producto.talles)
                    ? producto.talles.join(", ")
                    : producto.talles}
                </td>
                <td>
                  <img
                    src={producto.imagen || "https://via.placeholder.com/50"}
                    alt={producto.nombre}
                    width={60}
                    height={60}
                    style={{ objectFit: "cover", borderRadius: "5px" }}
                  />
                </td>
                <td>{producto.categoria}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="m-1"
                    onClick={() => verProducto(producto)}
                  >
                    Ver
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "var(--ambar)",
                      borderColor: "var(--ambar)",
                      color: "black",
                    }}
                    size="sm"
                    className="m-1"
                    onClick={() => editarProducto(producto)}
                  >
                    Editar
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "var(--magenta)",
                      borderColor: "var(--magenta)",
                      color: "white",
                    }}
                    size="sm"
                    className="m-1"
                    onClick={() => borrarProducto(producto._id)}
                  >
                    Borrar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* TURNOS */}
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center flex-grow-1">Administrador de Turnos</h2>
          <Button className="btn-verde" onClick={() => setShowModalTurno(true)}>
            + Crear Turno
          </Button>
        </div>
        <TablaTurno
          turnos={turnos}
          onVer={verTurno}
          onEditar={(turno) => editarTurno(turno)}
          onBorrar={borrarTurno}
        />
      </div>

      <div className="mb-5">
        <TablaUsuarios />
      </div>
      {/* Modal Editar Turno */}
      <ModalTurno
        show={showModalTurno}
        handleClose={cerrarModalTurno}
        turnoEditar={turnoEditar}
        indiceEditar={indiceEditar}
      />

      {/* Modal Ver Turno */}
      <ModalVerTurno
        show={showVerModalTurno}
        handleClose={() => setShowVerModalTurno(false)}
        turno={turnoVer}
      />

      {/* Modal Crear Producto */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editandoId ? "Editar Producto" : "Crear Producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={nuevoProducto.nombre}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })
                }
                isInvalid={!!errors.nombre}
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombre}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                value={nuevoProducto.precio}
                onChange={(e) => {
                  let valor = e.target.value;

                  if (!valor.includes("$")) {
                    valor = "$" + valor.replace(/\$/g, "");
                  }

                  setNuevoProducto({ ...nuevoProducto, precio: valor });
                }}
                isInvalid={!!errors.precio}
              />
              <Form.Control.Feedback type="invalid">
                {errors.precio}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                value={nuevoProducto.descripcion}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    descripcion: e.target.value,
                  })
                }
                isInvalid={!!errors.descripcion}
              />
              <Form.Control.Feedback type="invalid">
                {errors.descripcion}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Talle</Form.Label>
              <Form.Select
                value={nuevoProducto.talles}
                onChange={(e) =>
                  setNuevoProducto({ ...nuevoProducto, talles: e.target.value })
                }
                isInvalid={!!errors.talles}
              >
                <option value="--">--</option>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.talles}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Imagen</Form.Label>
              <div className="d-flex align-items-center gap-2">
                <Form.Control
                  type="file"
                  accept="image/*"
                  id="carga-imagen"
                  className="d-none"
                  onChange={(e) => setArchivoImagen(e.target.files[0])}
                />

                <Form.Label
                  htmlFor="carga-imagen"
                  className="btn btn-secondary mb-0"
                  style={{ cursor: "pointer" }}
                >
                  Seleccionar archivo
                </Form.Label>

                <span className="text-muted fst-italic">
                  {archivoImagen
                    ? archivoImagen.name
                    : "Ningún archivo seleccionado"}
                </span>
              </div>

              {editandoId && (
                <Form.Text className="text-muted d-block mt-1">
                  Deja vacío para mantener la imagen actual.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                value={nuevoProducto.categoria}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    categoria: e.target.value,
                  })
                }
                isInvalid={!!errors.categoria}
              >
                <option value="ellas">Ellas</option>
                <option value="hombre">Hombre</option>
                <option value="niños">Niños</option>
                <option value="accesorios">Accesorios</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.categoria}
              </Form.Control.Feedback>
            </Form.Group>

            <Button
              variant="primary"
              className="mt-3"
              onClick={guardarProducto}
            >
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal Ver Producto */}
      <Modal
        show={showVerModal}
        onHide={() => setShowVerModal(false)}
        centered
        dialogClassName="modal-ver-producto"
      >
        <Modal.Header closeButton>
          <Modal.Title>Ver Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productoVer && (
            <div className="card h-100 shadow-sm text-center">
              <div className="ratio ratio-1x1">
                <img
                  src={productoVer.imagen}
                  className="card-img-top img-fluid"
                  alt={productoVer.nombre}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title fw-bold text-center">
                  {productoVer.nombre}
                </h5>
                <p className="card-text text-muted text-center">
                  {productoVer.descripcion}
                </p>
                <hr />
                <p className="mb-2">
                  <strong>Precio:</strong>{" "}
                  <span className="text-success fs-5">
                    {productoVer.precio}
                  </span>
                </p>
                <p className="mb-3">
                  <strong>Talles disponibles:</strong> {productoVer.talles}
                </p>
                <p className="mb-2">
                  <strong>Categoría:</strong> {productoVer.categoria}
                </p>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Administrador;
