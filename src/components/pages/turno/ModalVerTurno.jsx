import { Modal, Button } from "react-bootstrap";

const ModalVerTurno = ({ show, handleClose, turno }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalles del Turno</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {turno && (
          <div>
            <p><strong>Nombre:</strong> {turno.usuario}</p>
            <p><strong>Teléfono:</strong> {turno.telefono}</p>
            <p><strong>Fecha:</strong> {turno.fecha}</p>
            <p><strong>Hora:</strong> {turno.horario}</p>
            <p><strong>Cancha:</strong> {turno.cancha}</p>
            <p><strong>Estado:</strong> {turno.estado}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalVerTurno;
