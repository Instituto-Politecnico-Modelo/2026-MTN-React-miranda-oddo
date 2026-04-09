import type { Tarea } from '../interfaces/tarea.interface'

/**
 * Props del componente TareaFila.
 * - tarea: el objeto completo de la tarea a renderizar en esta fila.
 * - onCompletar: callback que recibe el id de la tarea y alterna su
 *   estado completada/pendiente en el array del padre (App).
 * - onEliminar: callback que recibe el id y elimina la tarea del array.
 */
interface Props {
  tarea: Tarea
  onCompletar: (id: number) => void
  onEliminar: (id: number) => void
}

/**
 * Componente que representa una fila (<tr>) dentro de la tabla de tareas.
 * Cada fila muestra: id, título (con descripción opcional), badge de
 * prioridad, estado y botón de eliminar.
 *
 * Al hacer click en cualquier parte de la fila se alterna el estado
 * completada/pendiente. El botón de eliminar usa stopPropagation()
 * para evitar que ese click también active el toggle de completar.
 */
function TareaFila({ tarea, onCompletar, onEliminar }: Props) {
  return (
    <tr
      /**
       * Si la tarea está completada, le agregamos la clase CSS "completada"
       * que reduce la opacidad de toda la fila para dar feedback visual
       * de que esa tarea ya fue resuelta.
       */
      className={tarea.completada ? 'completada' : ''}
      /**
       * Al hacer click en la fila, llamamos a onCompletar con el id.
       * Esto llega hasta App.tsx donde se ejecuta completarTarea(),
       * que invierte el valor de tarea.completada usando el operador !
       */
      onClick={() => onCompletar(tarea.id)}
    >
      <td className="col-id">#{tarea.id}</td>

      <td className={`col-titulo ${tarea.completada ? 'completada-texto' : ''}`}>
        {tarea.titulo}
        {/**
         * Renderizado condicional de la descripción:
         * Si tarea.descripcion es un string vacío (""), es falsy y React
         * no renderiza el <span>. Si tiene contenido, se muestra debajo
         * del título con una clase CSS que le da un tamaño de fuente menor
         * y color más tenue para diferenciarlo visualmente del título.
         */}
        {tarea.descripcion && (
          <span className="descripcion-texto">{tarea.descripcion}</span>
        )}
      </td>

      <td>
        {/* Badge de prioridad: usa la clase CSS dinámica (alta/media/baja)
            para aplicar un color de fondo y texto diferente según el nivel */}
        <span className={`prioridad-badge ${tarea.prioridad}`}>
          {tarea.prioridad}
        </span>
      </td>

      <td className="col-estado">
        {/* Muestra un ícono y texto diferente según el estado de la tarea */}
        {tarea.completada
          ? <span className="estado-completada">✔ Completada</span>
          : <span className="estado-pendiente">⏳ Pendiente</span>
        }
      </td>

      <td>
        <button
          className="btn-eliminar"
          onClick={e => {
            /**
             * e.stopPropagation() es fundamental aquí: sin él, el click
             * en el botón "✕" subiría (propagaría) hasta el <tr> padre,
             * activando también el onClick del <tr> que alterna el estado
             * completada. Con stopPropagation() el evento se detiene en
             * el botón y solo se ejecuta la eliminación.
             */
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
