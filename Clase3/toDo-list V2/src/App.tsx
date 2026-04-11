import { useState } from 'react'
import type { Tarea, Prioridad, FiltroEstado, OrdenPrioridad } from './interfaces/tarea.interface'
import FormularioTarea from './components/FormularioTarea'
import BarraBusqueda from './components/BarraBusqueda'
import FiltrosOrden from './components/FiltrosOrden'
import ListaTareas from './components/ListaTareas'
import './App.css'

const pesoPrioridad: Record<Prioridad, number> = {
  alta: 3,
  media: 2,
  baja: 1,
}

function App() {
  const [tareas, setTareas] = useState<Tarea[]>([])

  const [nextId, setNextId] = useState(1)

  const [busqueda, setBusqueda] = useState('')

  const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>('todas')

  const [ordenPrioridad, setOrdenPrioridad] = useState<OrdenPrioridad>('ninguno')

  function agregarTarea(titulo: string, descripcion: string, prioridad: Prioridad) {
    const nueva: Tarea = {
      id: nextId,
      titulo,
      descripcion,
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

  const textoBusqueda = busqueda.toLowerCase()
  let resultado = tareas.filter(t =>
    t.titulo.toLowerCase().includes(textoBusqueda) ||
    t.descripcion.toLowerCase().includes(textoBusqueda)
  )

  if (filtroEstado === 'pendientes') {
    resultado = resultado.filter(t => !t.completada)
  } else if (filtroEstado === 'completadas') {
    resultado = resultado.filter(t => t.completada)
  }

  if (ordenPrioridad === 'alta-primero') {
    resultado = [...resultado].sort((a, b) => pesoPrioridad[b.prioridad] - pesoPrioridad[a.prioridad])
  } else if (ordenPrioridad === 'baja-primero') {
    resultado = [...resultado].sort((a, b) => pesoPrioridad[a.prioridad] - pesoPrioridad[b.prioridad])
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
        <>
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

          <BarraBusqueda busqueda={busqueda} onBuscar={setBusqueda} />

          <FiltrosOrden
            filtroEstado={filtroEstado}
            onFiltroEstado={setFiltroEstado}
            ordenPrioridad={ordenPrioridad}
            onOrdenPrioridad={setOrdenPrioridad}
          />
        </>
      )}

      <ListaTareas
        tareas={resultado}
        onCompletar={completarTarea}
        onEliminar={eliminarTarea}
        hayTareas={tareas.length > 0}
      />
    </div>
  )
}

export default App
