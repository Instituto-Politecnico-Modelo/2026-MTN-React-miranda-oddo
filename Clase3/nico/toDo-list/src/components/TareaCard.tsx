import type { Tarea } from '../interfaces/tarea.interface'

interface Props {
  tarea: Tarea
  onCompletar: (id: number) => void
  onEliminar: (id: number) => void
}

function TareaFila({ tarea, onCompletar, onEliminar }: Props) {
  return (
    <tr
      className={tarea.completada ? 'completada' : ''}
      onClick={() => onCompletar(tarea.id)}
    >
      <td className="col-id">#{tarea.id}</td>
      <td className={`col-titulo ${tarea.completada ? 'completada-texto' : ''}`}>
        {tarea.titulo}
      </td>
      <td>
        <span className={`prioridad-badge ${tarea.prioridad}`}>
          {tarea.prioridad}
        </span>
      </td>
      <td className="col-estado">
        {tarea.completada
          ? <span className="estado-completada">✔ Completada</span>
          : <span className="estado-pendiente">⏳ Pendiente</span>
        }
      </td>
      <td>
        <button
          className="btn-eliminar"
          onClick={e => {
            e.stopPropagation()
            onEliminar(tarea.id)
          }}
          title="Eliminar tarea"
        >
          ✕
        </button>
      </td>
    </tr>
  )
}

export default TareaFila
