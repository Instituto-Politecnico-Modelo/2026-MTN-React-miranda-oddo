import { useState } from 'react'
import TareaForm from './components/TareaForm'
import TareaItem from './components/TareaItem'
import BuscadorTareas from './components/BuscadorTareas'
import VistaSelector from './components/VistaSelector'
import FiltroEstado from './components/FiltroEstado'
import OrdenPrioridad from './components/OrdenPrioridad'
import type { FiltroEstado as FiltroEstadoType, Ordenamiento, Prioridad, Tarea, Vista } from './types'
import './App.css'

function App() {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [vista, setVista] = useState<Vista>('listado')
  const [filtroEstado, setFiltroEstado] = useState<FiltroEstadoType>('todas')
  const [ordenamiento, setOrdenamiento] = useState<Ordenamiento>('ninguno')

  const agregarTarea = (titulo: string, prioridad: Prioridad) => {
    const nuevaTarea: Tarea = {
      id: Date.now(),
      titulo,
      prioridad,
      estado: 'pendiente',
    }

    setTareas((prevTareas) => [...prevTareas, nuevaTarea])
  }

  const buscarTareas = (termino: string) => {
    setBusqueda(termino)
  }

  const cambiarVista = (nuevaVista: Vista) => {
    setVista(nuevaVista)
  }

  const eliminarTarea = (id: number) => {
    setTareas((prevTareas) => prevTareas.filter((tarea) => tarea.id !== id))
  }

  const filtrarPorEstado = (filtro: FiltroEstadoType) => {
    setFiltroEstado(filtro)
  }

  const ordenarPorPrioridad = (orden: Ordenamiento) => {
    setOrdenamiento(orden)
  }

  const marcarComoRealizada = (id: number) => {
    setTareas((prevTareas) =>
      prevTareas.map((tarea) =>
        tarea.id === id ? { ...tarea, estado: 'realizada' } : tarea,
      ),
    )
  }

  const pesoPrioridad: Record<Prioridad, number> = { alta: 1, media: 2, baja: 3 }

  const tareasFiltradas = tareas
    .filter((tarea) =>
      tarea.titulo.toLowerCase().includes(busqueda.toLowerCase()),
    )
    .filter((tarea) =>
      filtroEstado === 'todas' ? true : tarea.estado === filtroEstado,
    )
    .sort((a, b) => {
      if (ordenamiento === 'prioridad-asc') return pesoPrioridad[a.prioridad] - pesoPrioridad[b.prioridad]
      if (ordenamiento === 'prioridad-desc') return pesoPrioridad[b.prioridad] - pesoPrioridad[a.prioridad]
      return 0
    })

  return (
    <div className="app">
      <h1>Lista de Tareas</h1>

      <TareaForm onAgregar={agregarTarea} />
      <BuscadorTareas onBuscar={buscarTareas} />

      <div className="filtros-bar">
        <span className="filtros-label"><i className="fa-solid fa-sliders"></i> Filtros</span>
        <FiltroEstado filtro={filtroEstado} onCambiarFiltro={filtrarPorEstado} />
        <OrdenPrioridad ordenamiento={ordenamiento} onCambiarOrden={ordenarPorPrioridad} />
        <VistaSelector vista={vista} onCambiarVista={cambiarVista} />
      </div>

      {tareasFiltradas.length === 0 ? (
        <p className="sin-tareas">No hay tareas para mostrar.</p>
      ) : vista === 'tabla' ? (
        <table className="tarea-tabla">
          <thead>
            <tr>
              <th>Título</th>
              <th>Prioridad</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {tareasFiltradas.map((tarea) => (
              <tr key={tarea.id} className={tarea.estado}>
                <td>{tarea.titulo}</td>
                <td>{tarea.prioridad}</td>
                <td>{tarea.estado === 'realizada' ? 'Realizada' : 'Pendiente'}</td>
                <td>
                  {tarea.estado !== 'realizada' && (
                    <button type="button" onClick={() => marcarComoRealizada(tarea.id)}>
                      Marcar como realizada
                    </button>
                  )}
                  <button type="button" className="btn-eliminar" onClick={() => eliminarTarea(tarea.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={`lista-tareas vista-${vista}`}>
          {tareasFiltradas.map((tarea) => (
            <TareaItem
              key={tarea.id}
              tarea={tarea}
              vista={vista}
              onMarcarRealizada={marcarComoRealizada}
              onEliminar={eliminarTarea}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App