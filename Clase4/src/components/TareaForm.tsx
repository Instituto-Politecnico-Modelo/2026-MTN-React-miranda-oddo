import { useForm } from 'react-hook-form'
import type { Prioridad } from '../types'

interface TareaFormProps {
  onAgregar: (titulo: string, descripcion: string, prioridad: Prioridad) => void
}

interface FormData {
  titulo: string
  descripcion: string
  prioridad: Prioridad
}

function TareaForm({ onAgregar }: TareaFormProps) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    defaultValues: { titulo: '', descripcion: '', prioridad: 'media' }
  })

  const onSubmit = (data: FormData) => {
    onAgregar(data.titulo.trim(), data.descripcion.trim(), data.prioridad)
    reset()
  }

  return (
    <form className="tarea-form" onSubmit={handleSubmit(onSubmit)} >
      <h2 style={{ paddingBottom: '0.4em' }}>Agregar Tarea</h2>
      <div style={{ position: 'relative'}}>
        {errors.titulo && <span style={{ color: 'red', position: 'absolute', top: '-1.4em', fontSize: '0.8em' }}>{errors.titulo.message}</span>}
        <input
          type="text"
          placeholder="Titulo de la tarea..."
          {...register('titulo', { required: 'El título es obligatorio', validate: v => v.trim() !== '' || 'El título no puede estar vacío' })}
        />
      </div>
      <div style={{ position: 'relative' }}>
        {errors.descripcion && <span style={{ color: 'red', position: 'absolute', top: '-1.4em', fontSize: '0.8em' }}>{errors.descripcion.message}</span>}
        <input
          type="text"
          placeholder="Descripción de la tarea..."
          {...register('descripcion', { required: 'La descripción es obligatoria', validate: v => v.trim() !== '' || 'La descripción no puede estar vacía' })}
        />
      </div>
      <div style={{ position: 'relative' }}>
        {errors.prioridad && <span style={{ color: 'red', position: 'absolute', top: '-1.2em', fontSize: '0.8em' }}>{errors.prioridad.message}</span>}
        <select {...register('prioridad', { required: 'La prioridad es obligatoria' })}>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
      </div>
      <button type="submit">Agregar</button>
    </form>
  )
}

export default TareaForm