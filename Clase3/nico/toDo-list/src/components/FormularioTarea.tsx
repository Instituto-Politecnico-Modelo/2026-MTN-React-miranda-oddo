import { useState } from 'react'
import type { Prioridad } from '../interfaces/tarea.interface'

interface Props {
  onAgregar: (titulo: string, prioridad: Prioridad) => void
}

function FormularioTarea({ onAgregar }: Props) {
  const [titulo, setTitulo] = useState('')
  const [prioridad, setPrioridad] = useState<Prioridad>('media')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (titulo.trim() === '') {
      setError('El título no puede estar vacío')
      return
    }
    onAgregar(titulo.trim(), prioridad)
    setTitulo('')
    setPrioridad('media')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <div className="formulario-campos">
        <input
          type="text"
          placeholder="Título de la tarea..."
          value={titulo}
          onChange={e => {
            setTitulo(e.target.value)
            setError('')
          }}
        />
        <select
          value={prioridad}
          onChange={e => setPrioridad(e.target.value as Prioridad)}
        >
          <option value="alta">🔴 Alta</option>
          <option value="media">🟡 Media</option>
          <option value="baja">🟢 Baja</option>
        </select>
        <button type="submit">Agregar</button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default FormularioTarea
