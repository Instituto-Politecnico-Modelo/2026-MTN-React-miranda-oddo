import { useState } from 'react'
import type { Tarea, Prioridad } from './interfaces/tarea.interface'
import FormularioTarea from './components/FormularioTarea'
import ListaTareas from './components/ListaTareas'
import './App.css'

function App() {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [nextId, setNextId] = useState(1)

  function agregarTarea(titulo: string, prioridad: Prioridad) {
    const nueva: Tarea = {
      id: nextId,
      titulo,
      prioridad,
      completada: false,
    }
    setTareas([...tareas, nueva])
    setNextId(nextId + 1)
  }

  function completarTarea(id: number) {
    setTareas(tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t))
  }

  function eliminarTarea(id: number) {
    setTareas(tareas.filter(t => t.id !== id))
  }

  const pendientes = tareas.filter(t => !t.completada).length
  const completadas = tareas.filter(t => t.completada).length

  return (
    <div className="app">
      <div className="app-header">
        <h1>Gestor de Tareas</h1>
        <p>Hacé click en una fila para marcarla como completada</p>
      </div>

      <FormularioTarea onAgregar={agregarTarea} />

      {tareas.length > 0 && (
        <div className="resumen">
          <div className="resumen-item">
            <strong>{tareas.length}</strong>
            Total
          </div>
          <div className="resumen-item">
            <strong>{pendientes}</strong>
            Pendientes
          </div>
          <div className="resumen-item">
            <strong>{completadas}</strong>
            Completadas
          </div>
        </div>
      )}

      <ListaTareas
        tareas={tareas}
        onCompletar={completarTarea}
        onEliminar={eliminarTarea}
      />
    </div>
  )
}

export default App
