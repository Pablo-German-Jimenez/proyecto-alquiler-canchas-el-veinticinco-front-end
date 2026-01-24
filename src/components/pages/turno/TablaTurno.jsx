import { Table, Button } from "react-bootstrap";

const TablaTurno = ({ turnos, onEditar, onBorrar, onVer }) => {


  return (
    <div className="p-0">
         <Table striped bordered hover responsive className="align-middle text-center shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Cancha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {turnos.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No hay turnos registrados
              </td>
            </tr>
          ) : (
            turnos.map((t, index) => (
              <tr key={index}>
                <td>{t.usuario}</td>
                <td>{t.fecha}</td>
                <td>{t.horario}</td>
                <td>{t.cancha}</td>
                <td>{t.estado}</td>
                <td>
                  <Button variant="info" size="sm" className="m-1" onClick={() => onVer(t, index)}>
                    Ver
                  </Button>
                  <Button  style={{ backgroundColor: 'var(--ambar)', borderColor: 'var(--ambar)', color: 'black' }} size="sm" className="m-1" onClick={() => onEditar(t, index)}>
                    Editar
                  </Button>
                  <Button  style={{ backgroundColor: 'var(--magenta)', borderColor: 'var(--magenta)', color: 'white' }} size="sm" className="m-1"onClick={() => onBorrar(index)}>
                    Borrar
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
</div>
  );
};

export default TablaTurno;
