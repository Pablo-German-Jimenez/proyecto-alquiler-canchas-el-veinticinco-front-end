import {
  Container,
  Form,
  Button,
  FloatingLabel,
  Row,
  Col,
} from "react-bootstrap";
import "../../styles/contacto.css";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Contacto = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const nombreValidado = /^[A-Za-zñÑáéíóúÁÉÍÓÚ\s]+$/;
  const telefonoValidado = /^[0-9+\s()-]+$/;

  // Si la validación es exitosa, se ejecuta la siguiente función:
  const onSubmit = (data) => {
    // Sweetalert si se carga bien el formulario:
    Swal.fire({
      icon: "success",
      title: "¡Consulta enviada!",
      text: "Tu mensaje ha sido recibido con éxito. Te responderemos a la brevedad.",
      customClass: {
        popup: "swal-popup-custom",
        confirmButton: "btn-swal-confirm",
      },
    }).then(() => {
      reset();
    });
  };

  // Si la validación falla:
  const onError = (errors) => {
    Swal.fire({
      icon: "error",
      title: "Error de validación",
      text: "Por favor, revisa los campos marcados en rojo y corrígelos.",
      customClass: {
        popup: "swal-popup-custom",
        confirmButton: "btn-swal-confirm",
      },
    });
  };

  return (
    <>
      <Container className="my-3 p-4 p-md-5 border rounded-3 shadow-lg bg-body-tertiary">
        <h1 className="text-center mb-4 display-5">
          ¿Tenés alguna consulta o sugerencia?
        </h1>
        <p className="text-center mb-5 text-muted">
          Contactanos y nuestro equipo de Cancheros te responderá a la brevedad.
        </p>

        <Form noValidate onSubmit={handleSubmit(onSubmit, onError)}>
          <Container>
            <Row className="row-gap-3 justify-content-center">
              <Col xs={10} md={7}>
                {/* Nombre */}
                <FloatingLabel
                  controlId="floatingInputNombre"
                  label="Nombre y apellido"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Tu Nombre"
                    {...register("nombre", {
                      required: "El nombre completo es un dato obligatorio.",
                      minLength: {
                        value: 5,
                        message: "Este campo debe tener al menos 5 caracteres.",
                      },
                      maxLength: {
                        value: 30,
                        message:
                          "Este campo no puede exceder los 30 caracteres.",
                      },
                      pattern: {
                        value: nombreValidado,
                        message:
                          "En este campo solo se permiten letras, espacios y tildes.",
                      },
                    })}
                    isInvalid={!!errors.nombre}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nombre?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>

                {/* Email */}
                <FloatingLabel
                  controlId="floatingInputEmail"
                  label="Correo electrónico"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="nombre@ejemplo.com"
                    {...register("email", {
                      required: "El correo es un dato obligatorio.",
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "El formato del email es inválido",
                      },
                      minLength: {
                        value: 3,
                        message:
                          "El campo del mail debe tener al menos 3 caracteres.",
                      },
                      maxLength: {
                        value: 100,
                        message:
                          "El campo del mail no puede exceder los 100 caracteres.",
                      },
                    })}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>

                {/* Teléfono */}
                <FloatingLabel
                  controlId="floatingInputTeléfono"
                  label="Teléfono"
                  className="mb-3"
                >
                  <Form.Control
                    type="tel"
                    placeholder="Teléfono"
                    {...register("telefono", {
                      required: "El teléfono es obligatorio",
                      minLength: {
                        value: 10,
                        message:
                          "El número de teléfono debe tener al menos 10 caracteres.",
                      },
                      maxLength: {
                        value: 17,
                        message:
                          "El número de teléfono no puede exceder los 17 caracteres.",
                      },
                      pattern: {
                        value: telefonoValidado,
                        message: "Solo se permiten caracteres numéricos.",
                      },
                    })}
                    isInvalid={!!errors.telefono}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.telefono?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>

              <Col xs={10} md={5} className="d-flex flex-column">
                {/* Mensaje (Textarea) */}
                <FloatingLabel
                  controlId="floatingTextareaMensaje"
                  label="Escribe tu mensaje o consulta"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Escribe tu mensaje o consulta"
                    {...register("mensaje", {
                      required: "El mensaje es obligatorio.",
                      minLength: {
                        value: 10,
                        message:
                          "El texto ingresado debe contener al menos 10 caracteres.",
                      },
                      maxLength: {
                        value: 500,
                        message:
                          "El mensaje es demasiado largo, no puede contener más de 500 caracteres.",
                      },
                    })}
                    isInvalid={!!errors.mensaje}
                    className="textarea-mensaje"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.mensaje?.message}
                  </Form.Control.Feedback>
                </FloatingLabel>

                {/* Botón de Enviar */}
                <div className="d-grid">
                  <Button
                    type="submit"
                    className="py-3 boton-formulario"
                  >
                    Enviar Consulta
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </Form>
      </Container>
      <div className="d-flex justify-content-center mb-4">
        <Button as={Link} to="/" className="boton-volver-inicio">
          <i className="bi bi-arrow-bar-left"> Volver al Inicio </i>
        </Button>
      </div>
    </>
  );
};

export default Contacto;
