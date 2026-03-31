import { useState } from 'react'
import TareaForm from './components/TareaForm'
import TareaItem from './components/TareaItem'
import BuscadorTareas from './components/BuscadorTareas'
import './App.css'

function App() {
  const [tareas, setTareas] = useState([])
  const [busqueda, setBusqueda] = useState('')

  // Agregar tarea
  const agregarTarea = (titulo, prioridad) => {
    const nuevaTarea = {
      id: Date.now(),
      titulo,
      prioridad,
      estado: 'pendiente',
    }
    setTareas([...tareas, nuevaTarea])
  }

  // Buscar tareas por título
  const buscarTareas = (termino) => {
    setBusqueda(termino)
  }

  // Marcar tarea como realizada
  const marcarComoRealizada = (id) => {
    setTareas(tareas.map(tarea =>
      tarea.id === id ? { ...tarea, estado: 'realizada' } : tarea
    ))
  }

  const tareasFiltradas = tareas.filter(tarea =>
    tarea.titulo.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="app">
      <h1>📝 Lista de Tareas</h1>

      <TareaForm onAgregar={agregarTarea} />

      <BuscadorTareas onBuscar={buscarTareas} />

      <div className="lista-tareas">
        {tareasFiltradas.length === 0 ? (
          <p className="sin-tareas">No hay tareas para mostrar.</p>
        ) : (
          tareasFiltradas.map(tarea => (
            <TareaItem
              key={tarea.id}
              tarea={tarea}
              onMarcarRealizada={marcarComoRealizada}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default App
