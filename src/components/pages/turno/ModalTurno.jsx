import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import "../../../styles/modalTurno.css";
import "../../../styles/sweetalert.css";
const ModalTurno = ({ show, handleClose, turnoEditar, indiceEditar }) => {
  const hoy = new Date().toISOString().split("T")[0];
  const swalCustomClass = {
    popup: "swal-popup-custom",
    confirmButton: "btn-swal-confirm",
    cancelButton: "btn-swal-cancel",
    title: "swal2-title",
    htmlContainer: "swal2-html-container",
  };
  const [turno, setTurno] = useState({
    nombre: "",
    telefono: "",
    fecha: "",
    hora: "",
    cancha: "",
    estado: "pendiente",
  });

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (show && turnoEditar) {
      setTurno({
        nombre: turnoEditar.usuario || "",
        telefono: turnoEditar.telefono || "",
        fecha: turnoEditar.fecha || "",
        hora: turnoEditar.horario || "",
        cancha: turnoEditar.cancha || "",
        estado: turnoEditar.estado || "",
      });
    } else if (!show) {
      setTurno({
        nombre: "",
        telefono: "",
        fecha: "",
        hora: "",
        cancha: "",
        estado: "pendiente",
      });
      setErrores({});
    }
  }, [show, turnoEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTurno({ ...turno, [name]: value });
    setErrores({ ...errores, [name]: "" });
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!turno.nombre.trim())
      nuevosErrores.nombre = "Este campo es obligatorio";
    if (!turno.telefono.trim()) {
      nuevosErrores.telefono = "Este campo es obligatorio";
    } else if (!/^\d+$/.test(turno.telefono.trim())) {
      nuevosErrores.telefono = "El teléfono debe contener solo números";
    }
    if (!turno.fecha) {
      nuevosErrores.fecha = "Debes seleccionar una fecha";
    } else if (new Date(turno.fecha) < new Date(hoy)) {
      nuevosErrores.fecha = "No podés elegir un día anterior a hoy";
    }
    if (!turno.hora) nuevosErrores.hora = "Seleccioná una hora disponible";
    if (!turno.cancha) nuevosErrores.cancha = "Seleccioná una cancha";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const guardarTurno = async () => {
    if (!validar()) return;

    try {
      const payload = {
        usuario: turno.nombre.trim(),
        telefono: turno.telefono.trim(),
        cancha: turno.cancha,
        fecha: turno.fecha,
        horario: turno.hora,
        estado: turno.estado,
      };

      if (turnoEditar) {
        const id = turnoEditar._id;
        const res = await fetch(`http://localhost:3001/api/reservas/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error al actualizar");
        }

        Swal.fire({
          title: "Turno modificado con éxito",
          html: `
          <div class="swal-turno">
            <p><strong>Fecha:</strong> ${payload.fecha}</p>
            <p><strong>Hora:</strong> ${payload.horario}</p>
            <p><strong>Cancha:</strong> ${payload.cancha}</p>
            <p><strong>Nombre reserva:</strong> ${payload.usuario}</p>
            <p><strong>Teléfono:</strong> ${payload.telefono}</p>
            <p><strong>Estado:</strong> ${
              payload.estado === "pendiente" ? "pendiente" : "Confirmado"
            }</p>
          </div>
        `,
          icon: "success",
          confirmButtonText: "Aceptar",
          customClass: swalCustomClass,
          buttonsStyling: false
        });
      } else {
        const res = await fetch("http://localhost:3001/api/reservas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Error al crear la reserva");
        }

        Swal.fire({
          title: "Turno reservado con éxito",
          html: `
          <div class="swal-turno">
            <p><strong>Fecha:</strong> ${payload.fecha}</p>
            <p><strong>Hora:</strong> ${payload.horario}</p>
            <p><strong>Cancha:</strong> ${payload.cancha}</p>
            <p><strong>Nombre reserva:</strong> ${payload.usuario}</p>
            <p><strong>Teléfono:</strong> ${payload.telefono}</p>
            <p><strong>Estado:</strong> ${payload.estado}</p>
          </div>
        `,
          icon: "success",
          confirmButtonText: "Aceptar",
          customClass: swalCustomClass,
          buttonsStyling: false
        });
      }

      handleClose();
    } catch (error) {
      Swal.fire({
       title: "Error",
        text: error.message || "Hubo un problema al guardar el turno",
        icon: "error",
        confirmButtonText: "Aceptar",
        customClass: swalCustomClass,
        buttonsStyling: false
      });
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {turnoEditar ? "Modificar Turno" : "Reservar Turno"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Nombre */}
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              placeholder="Completá tu nombre"
              value={turno.nombre}
              onChange={handleChange}
              className="sin-borde"
            />
            {errores.nombre && (
              <div className="mensaje-error">{errores.nombre}</div>
            )}
          </Form.Group>

          {/* Número de teléfono */}
          <Form.Group className="mb-3">
            <Form.Label>Número de teléfono</Form.Label>
            <Form.Control
              type="tel"
              name="telefono"
              placeholder="Ingresá tu número de teléfono"
              value={turno.telefono}
              onChange={handleChange}
              className="sin-borde"
            />
            {errores.telefono && (
              <div className="mensaje-error">{errores.telefono}</div>
            )}
          </Form.Group>

          {/* Fecha */}
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={turno.fecha}
              onChange={handleChange}
              min={hoy}
              className="sin-borde"
            />
            {errores.fecha && (
              <div className="mensaje-error">{errores.fecha}</div>
            )}
          </Form.Group>

          {/* Hora */}
          <Form.Group className="mb-3">
            <Form.Label>Hora</Form.Label>
            <Form.Select
              name="hora"
              value={turno.hora}
              onChange={handleChange}
              className="sin-borde"
            >
              <option value="">Seleccioná un horario</option>
              <optgroup label="Mañana">
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
              </optgroup>
              <optgroup label="Tarde">
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
                <option value="22:00">22:00</option>
                <option value="23:00">23:00</option>
                <option value="00:00">00:00</option>
              </optgroup>
            </Form.Select>
            {errores.hora && (
              <div className="mensaje-error">{errores.hora}</div>
            )}
          </Form.Group>

          {/* Cancha */}
          <Form.Group className="mb-3">
            <Form.Label>Cancha</Form.Label>
            <Form.Select
              name="cancha"
              value={turno.cancha}
              onChange={handleChange}
              className="sin-borde"
            >
              <option value="">Seleccioná una cancha</option>
              <option value="Cancha 1">Cancha 1</option>
              <option value="Cancha 2">Cancha 2</option>
            </Form.Select>
            {errores.cancha && (
              <div className="mensaje-error">{errores.cancha}</div>
            )}
          </Form.Group>

          {/* Estado */}
          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              name="estado"
              value={turno.estado}
              onChange={handleChange}
              className="sin-borde"
              disabled={!turnoEditar}
            >
              <option value="pendiente">Pendiente</option>
              {turnoEditar && <option value="confirmado">Confirmado</option>}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={guardarTurno}>
          {turnoEditar ? "Guardar cambios" : "Guardar turno"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTurno;
