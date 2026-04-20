import type { Tarea } from '../interfaces/tarea.interface'
import TareaFila from './TareaCard'

interface Props {
  tareas: Tarea[]
  onCompletar: (id: number) => void
  onEliminar: (id: number) => void
  hayTareas: boolean
}

function ListaTareas({ tareas, onCompletar, onEliminar, hayTareas }: Props) {
  if (tareas.length === 0) {
    return (
      <div className="tabla-wrapper">
        <div className="sin-tareas">
          {hayTareas ? (
            <p>No se encontraron tareas con los filtros actuales.</p>
          ) : (
            <>
              <p>No hay tareas todavía.</p>
              <p>¡Agregá una usando el formulario de arriba!</p>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="tabla-wrapper">
      <table className="tabla-tareas">
        <thead>
          <tr>
            <th>#</th>
            <th>Título</th>
            <th>Prioridad</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tareas.map(tarea => (
            <TareaFila
              key={tarea.id}
              tarea={tarea}
              onCompletar={onCompletar}
              onEliminar={onEliminar}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListaTareas
