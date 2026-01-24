import { useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

const FormularioTurno = ({ turnoEditar, guardarTurno, cerrarModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: turnoEditar || {
      nombre: "",
      fecha: "",
      hora: "",
      estado: "A confirmar",
    },
  });

  // Si estamos editando, reseteamos el formulario con los datos
  useEffect(() => {
    if (turnoEditar) {
      reset(turnoEditar);
    }
  }, [turnoEditar, reset]);

  const onSubmit = (data) => {
    guardarTurno(data);
    cerrarModal && cerrarModal();
    reset({
      nombre: "",
      fecha: "",
      hora: "",
      estado: "A confirmar",
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre completo *</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nommbre completo"
          {...register("nombre", {
            required: "El nombre es obligatorio",
            minLength: {
              value: 3,
              message: "Debe tener al menos 3 caracteres",
            },
            pattern: {
              value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/,
              message:
                "El nombre no puede contener números ni caracteres especiales",
            },
          })}
        />
        {errors.nombre && (
          <Form.Text className="text-danger">{errors.nombre.message}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Fecha *</Form.Label>
        <Form.Control
          type="date"
          min={new Date().toISOString().split("T")[0]} // solo fechas desde hoy en adelante
          {...register("fecha", { required: "La fecha es obligatoria" })}
        />
        {errors.fecha && (
          <Form.Text className="text-danger">{errors.fecha.message}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Hora *</Form.Label>
        <Form.Select
          {...register("hora", { required: "La hora es obligatoria" })}
        >
          <optgroup label="Mañana">
            <option value="09:00">09:00</option>
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
            <option value="24:00">24:00</option>
          </optgroup>
        </Form.Select>
        {errors.hora && (
          <Form.Text className="text-danger">{errors.hora.message}</Form.Text>
        )}
      </Form.Group>

      <Form.Group className="mb-2">
        <Form.Label>Estado</Form.Label>
        <Form.Select {...register("estado")}>
          <option value="A confirmar">A confirmar</option>
          
        </Form.Select>
      </Form.Group>

      <Button type="submit" className="mt-2">
        Guardar
      </Button>
    </Form>
  );
};

export default FormularioTurno;
