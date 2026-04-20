// se reemplaza useState por useForm de react-hook-form
import { useForm } from 'react-hook-form'
import type { Prioridad } from '../interfaces/tarea.interface'


interface FormData {
  titulo: string
  descripcion: string
  prioridad: Prioridad
}

interface Props {
  onAgregar: (titulo: string, descripcion: string, prioridad: Prioridad) => void
}

function FormularioTarea({ onAgregar }: Props) {
  //useForm reemplaza los 4 useState anteriores (titulo, descripcion, prioridad, error)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { titulo: '', descripcion: '', prioridad: 'media' },
  })

  //handleSubmit ya no necesita e.preventDefault(), react-hook-form lo hace solo
  function onSubmit(data: FormData) {
    onAgregar(data.titulo.trim(), data.descripcion.trim(), data.prioridad)
    reset()
  }

  return (
    
    <form onSubmit={handleSubmit(onSubmit)} className="formulario">
      <div className="formulario-campos">
        <input
          type="text"
          placeholder="Título de la tarea..."
          {...register('titulo', { required: 'El título no puede estar vacío' })}
        />

        <select {...register('prioridad', { required: 'Seleccioná una prioridad' })}>
          <option value="alta">🔴 Alta</option>
          <option value="media">🟡 Media</option>
          <option value="baja">🟢 Baja</option>
        </select>
        <button type="submit">Agregar</button>
      </div>

      <input
        type="text"
        className="input-descripcion"
        placeholder="Descripción (opcional)..."
        {...register('descripcion')}
      />

      {errors.titulo && <p className="error">{errors.titulo.message}</p>}
      {errors.prioridad && <p className="error">{errors.prioridad.message}</p>}
    </form>
  )
}

export default FormularioTarea
