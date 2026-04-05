import { useState } from 'react'
import type { Prioridad } from '../types'

interface TareaFormProps {
  onAgregar: (titulo: string, prioridad: Prioridad) => void
}

function TareaForm({ onAgregar }: TareaFormProps) {
  const [titulo, setTitulo] = useState('')
  const [prioridad, setPrioridad] = useState<Prioridad>('media')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!titulo.trim()) {
      return
    }

    onAgregar(titulo.trim(), prioridad)
    setTitulo('')
    setPrioridad('media')
  }

  return (
    <form className="tarea-form" onSubmit={handleSubmit}>
      <h2>Agregar Tarea</h2>
      <input
        type="text"
        placeholder="Titulo de la tarea..."
        value={titulo}
        onChange={(event) => setTitulo(event.target.value)}
      />
      <select
        value={prioridad}
        onChange={(event) => setPrioridad(event.target.value as Prioridad)}
      >
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
      <button type="submit">Agregar</button>
    </form>
  )
}

export default TareaForm