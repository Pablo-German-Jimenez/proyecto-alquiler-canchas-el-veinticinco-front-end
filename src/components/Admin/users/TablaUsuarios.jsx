import { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import "../../../styles/sweetalert.css";
import { 
  obtenerUsuarios, 
  borrarUsuarioAPI, 
  crearUsuarioAdmin, 
  editarUsuarioAPI 
} from "../../../helpers/queries";
 const swalCustomClass = {
    popup: 'swal-popup-custom',
    confirmButton: 'btn-swal-confirm',
    cancelButton: 'btn-swal-cancel',
    title: 'swal2-title',
    htmlContainer: 'swal2-html-container'
  };
const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState(null);
  
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioKey")) || {};

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

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
    cargarUsuarios();
  }, []);

  const handleCrear = () => {
    setUsuarioEditar(null);
    reset();
    setShowModal(true);
  };

  const handleEditar = (usuario) => {
    setUsuarioEditar(usuario);
    setValue("nombre", usuario.nombre);
    setValue("email", usuario.email);
    setValue("rol", usuario.rol);
    setValue("password", ""); 
    setShowModal(true);
  };

  const onSubmit = async (data) => {
    try {
      if (usuarioEditar && !data.password) {
        delete data.password;
      }

      if (usuarioEditar && usuarioEditar.email === usuarioLogueado.email) {
        data.rol = usuarioLogueado.rol; 
      }

      let respuesta;
      if (usuarioEditar) {
        respuesta = await editarUsuarioAPI(usuarioEditar._id, data);
      } else {
        respuesta = await crearUsuarioAdmin(data);
      }

      if (respuesta && (respuesta.status === 200 || respuesta.status === 201)) {
         Swal.fire({
          title: "Éxito", 
          text: usuarioEditar ? "Usuario actualizado" : "Usuario creado", 
          icon: "success",
          customClass: swalCustomClass, buttonsStyling: false
        });
        cargarUsuarios();
        setShowModal(false);
      } else {
        const errorData = await respuesta.json();
        Swal.fire({ 
            icon: "error", 
            title: "Error", 
            text: errorData.mensaje || "No se pudo guardar. Verifica los datos.",
            customClass: swalCustomClass, buttonsStyling: false
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const borrarUsuario = (id) => {
    Swal.fire({
      title: "¿Borrar usuario?",
      text: "No podrás deshacer esto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar",
      customClass: swalCustomClass, 
      buttonsStyling: false
    }).then(async (result) => {
      if (result.isConfirmed) {
        const respuesta = await borrarUsuarioAPI(id);
        if(respuesta.status === 200){
            cargarUsuarios();
            Swal.fire({
              title: "Eliminado", text: "Usuario borrado", icon: "success",
              customClass: swalCustomClass, buttonsStyling: false
            });
        } else {
            Swal.fire({
            title: "Error", text: "No se pudo eliminar", icon: "error",
            customClass: swalCustomClass, buttonsStyling: false
          });
        }
      }
    });
  };

  return (
    <div className="p-3 border border-secondary rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-white m-0">Gestión de Usuarios</h4>
        <Button variant="success" onClick={handleCrear}>
          + Nuevo Usuario
        </Button>
      </div>
      
      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user._id}>
              <td>{user.nombre}</td>
              <td>{user.email}</td>
              <td>
                <span className={`badge ${user.rol === "admin" ? "bg-warning text-dark" : "bg-primary"}`}>
                  {user.rol}
                </span>
              </td>
              <td>
                <Button  style={{ backgroundColor: 'var(--ambar)', borderColor: 'var(--ambar)', color: 'black' }} size="sm" className="me-2" onClick={() => handleEditar(user)}>
                  Editar
                </Button>
                <Button 
                  style={{ backgroundColor: 'var(--magenta)', borderColor: 'var(--magenta)', color: 'white' }}
                  size="sm" 
                  onClick={() => borrarUsuario(user._id)}
                  disabled={user.email === usuarioLogueado.email} 
                  title={user.email === usuarioLogueado.email ? "No puedes borrarte a ti mismo" : "Borrar usuario"}
                >
                  Borrar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{usuarioEditar ? "Editar Usuario" : "Crear Usuario"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control 
                type="text" 
                {...register("nombre", { 
                    required: "El nombre es obligatorio", 
                    minLength: { value: 3, message: "Mínimo 3 caracteres" } 
                })} 
                isInvalid={!!errors.nombre} 
              />
              <Form.Control.Feedback type="invalid">
                {errors.nombre?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                {...register("email", { 
                    required: "El email es obligatorio",
                    pattern: {
                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                        message: "Ingresa un correo válido (ej: nombre@mail.com)"
                    }
                })} 
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

             <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control 
                type="number" 
                {...register("telefono", { 
                    required: "El teléfono es obligatorio", 
                    minLength: { value: 8, message: "Mínimo 8 números" } 
                })} 
                isInvalid={!!errors.telefono}
              />
              <Form.Control.Feedback type="invalid">
                {errors.telefono?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control 
                type="password" 
                placeholder={usuarioEditar ? "Dejar vacío para no cambiar" : "Contraseña nueva"}
                {...register("password", { 
                    required: !usuarioEditar ? "La contraseña es obligatoria" : false,
                    minLength: { value: 8, message: "Mínimo 8 caracteres" },
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/,
                        message: "Debe tener mayúscula, minúscula, número y carácter especial ($@!%*?&)"
                    }
                })} 
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select 
                {...register("rol", { required: true })}
                disabled={usuarioEditar && usuarioEditar.email === usuarioLogueado.email}
              >
                <option value="usuario">Usuario</option>
                <option value="admin">Administrador</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Guardar
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TablaUsuarios;