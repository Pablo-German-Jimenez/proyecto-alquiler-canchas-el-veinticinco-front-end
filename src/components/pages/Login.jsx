import { Modal, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { loginAPI } from "../../helpers/queries";
import { useNavigate } from "react-router-dom"; 

const Login = ({ show, handleClose, abrirRegistro, setUsuarioLogueado }) => {
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
    const respuesta = await loginAPI(data);
// usuario administrador: admin@cancheros.com
// contrasenia administrador: Cancheros$2025
    
    if (respuesta && respuesta.status === 200) {
      const datos = await respuesta.json();
      
      const usuarioData = {
        nombre: datos.nombre,
        email: datos.email,
        rol: datos.rol,
        token: datos.token,
        isAdmin: datos.rol === 'admin' 
      };

      setUsuarioLogueado(usuarioData);
      
      
      Swal.fire({
        icon: "success",
        title: `Bienvenido ${datos.nombre}`,
        text: "Has iniciado sesión correctamente",
        timer: 1500,
         customClass: swalCustomClass, buttonsStyling: false
      });
      
      reset();
      handleClose();
       if (datos.rol === 'admin') {
        navigate("/administrador"); 
      } else {
        navigate("/");
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El email o la contraseña son incorrectos",
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered contentClassName="border border-white border-3">
      <Modal.Header closeButton>
        <Modal.Title>Iniciar sesión</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="email@email.com"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,4}$/,
                  message: "El formato del email no es válido",
                },
              })}
            />
            {errors.email && <Form.Text className="text-danger">{errors.email.message}</Form.Text>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="********"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: { value: 6, message: "Mínimo 6 caracteres" }
              })}
            />
            {errors.password && <Form.Text className="text-danger">{errors.password.message}</Form.Text>}
          </Form.Group>

          <Button type="submit" className="btn-verde w-75 mx-auto d-block">Iniciar sesión</Button>

          <div className="text-center mt-3">
            <span>¿Aún no te registraste? </span>
            <button type="button" className="btn-texto btn btn-link p-0" onClick={() => { handleClose(); abrirRegistro(); }}>
              Registrate
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;
