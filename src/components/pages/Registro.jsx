import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { registroAPI } from "../../helpers/queries";

const Registro = ({ show, handleClose, abrirLogin, setUsuarioLogueado }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
 const swalCustomClass = {
    popup: 'swal-popup-custom',
    confirmButton: 'btn-swal-confirm',
    cancelButton: 'btn-swal-cancel',
    title: 'swal2-title',
    htmlContainer: 'swal2-html-container'
  };
  const onSubmit = async (data) => {
    const usuarioNuevo = {
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      password: data.password
    };

    const respuesta = await registroAPI(usuarioNuevo);

    if (respuesta && respuesta.status === 201) {
      const datosUsuario = await respuesta.json();

      sessionStorage.setItem("usuarioKey", JSON.stringify({
        nombre: datosUsuario.nombre,
        token: datosUsuario.token,
        rol: datosUsuario.rol,
        isAdmin: datosUsuario.rol === 'admin'
      }));

      setUsuarioLogueado({
        nombre: datosUsuario.nombre,
        token: datosUsuario.token,
        rol: datosUsuario.rol,
        isAdmin: datosUsuario.rol === 'admin'
      });

      Swal.fire({
        icon: "success",
        title: `¡Bienvenido ${datosUsuario.nombre}!`,
        text: "Registro exitoso.",
        timer: 2000,
        customClass: swalCustomClass, buttonsStyling: false
      });

      reset();
      handleClose();
      navigate("/"); 
    } else {
      const errorData = await respuesta.json();
      Swal.fire({
        icon: "error",
        title: "Ocurrió un error",
        text: errorData.mensaje || "No se pudo crear la cuenta",
         customClass: swalCustomClass, buttonsStyling: false
      });
    }
  };

  const irALogin = () => {
    handleClose();
    abrirLogin();
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered 
      size="lg" 
      contentClassName="border border-white border-3" 
    >
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="fw-bold">Registro de usuario</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4"> 
        
        <div className="row g-4 h-100"> 
          
          <div className="col-md-6">
            <Form onSubmit={handleSubmit(onSubmit)}>
              
              <Form.Group className="mb-3">
                <Form.Label>Nombre completo *</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Nombre completo" 
                  {...register("nombre", { required: "Campo obligatorio", minLength: { value: 3, message: "Mínimo 3 letras" } })} 
                />
                {errors.nombre && <Form.Text className="text-danger small">{errors.nombre.message}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email *</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="correo@email.com" 
                  {...register("email", { required: "Campo obligatorio", pattern: { value: /^\S+@\S+\.\S+$/, message: "Email inválido" } })} 
                />
                {errors.email && <Form.Text className="text-danger small">{errors.email.message}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Teléfono *</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="sin codigo de area" 
                  {...register("telefono", { required: "Campo obligatorio", minLength: { value: 8, message: "Mínimo 8 números" } })} 
                />
                {errors.telefono && <Form.Text className="text-danger small">{errors.telefono.message}</Form.Text>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Contraseña *</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="********" 
                  {...register("password", { 
                    required: "Obligatoria", 
                    minLength: { value: 8, message: "Mínimo 8 caracteres" },
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/,
                        message: "Debe tener mayúscula, minúscula, número y símbolo"
                    }
                  })} 
                />
                {errors.password && <Form.Text className="text-danger small">{errors.password.message}</Form.Text>}
              </Form.Group>
                  <div className="justify-content-center d-flex">
              <Button type="submit" className="btn-verde w-100 w-md-75 mt-2 text-white">
                Registrarme
              </Button>
                  </div>


              <div className="text-center mt-3">
                <small>¿Ya tenés cuenta? </small>
                <button
                  type="button"
                  className="btn-texto btn btn-link p-0 text-decoration-none"
                  onClick={irALogin}
                >
                  Iniciá sesión
                </button>
              </div>
            </Form>
          </div>

          <div className="col-md-6 d-none d-md-block">
            <img 
              src="https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg" 
              alt="futbol" 
              className="img-fluid rounded h-100 w-100" 
              style={{ objectFit: "cover" }} 
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Registro;