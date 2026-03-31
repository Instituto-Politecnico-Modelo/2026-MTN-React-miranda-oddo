import { useState } from 'react'

function TareaForm({ onAgregar }) {
  const [titulo, setTitulo] = useState('')
  const [prioridad, setPrioridad] = useState('media')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!titulo.trim()) return
    onAgregar(titulo.trim(), prioridad)
    setTitulo('')
    setPrioridad('media')
  }

  return (
    <form className="tarea-form" onSubmit={handleSubmit}>
      <h2>Agregar Tarea</h2>
      <input
        type="text"
        placeholder="Título de la tarea..."
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <select value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>
        <option value="alta">🔴 Alta</option>
        <option value="media">🟡 Media</option>
        <option value="baja">🟢 Baja</option>
      </select>
      <button type="submit">Agregar</button>
    </form>
  )
}

export default TareaForm
