import type { Tarea } from '../interfaces/tarea.interface'
import TareaFila from './TareaCard'

/**
 * Props del componente ListaTareas.
 * - tareas: el array de tareas YA filtrado y ordenado por App.tsx.
 *   Este componente no aplica ningún filtro adicional, solo las renderiza.
 * - onCompletar / onEliminar: callbacks que se pasan hacia abajo a cada
 *   TareaFila para manejar las acciones del usuario.
 * - hayTareas: booleano que indica si existen tareas en el array original
 *   (antes de filtrar). Se usa para mostrar un mensaje apropiado cuando
 *   la lista visible está vacía.
 */
interface Props {
  tareas: Tarea[]
  onCompletar: (id: number) => void
  onEliminar: (id: number) => void
  hayTareas: boolean
}

/**
 * Componente que renderiza la tabla de tareas o un mensaje cuando no hay
 * tareas para mostrar. Distingue dos escenarios de lista vacía:
 * 1. El usuario no creó ninguna tarea → invita a usar el formulario.
 * 2. Hay tareas pero ninguna coincide con los filtros/búsqueda actuales
 *    → informa que no hay resultados para los criterios elegidos.
 *
 * Cuando hay tareas, las recorre con .map() y renderiza un componente
 * TareaFila por cada una, pasándole la key={tarea.id} que React necesita
 * para identificar eficientemente cada elemento en la lista.
 */
function ListaTareas({ tareas, onCompletar, onEliminar, hayTareas }: Props) {
  if (tareas.length === 0) {
    return (
      <div className="tabla-wrapper">
        <div className="sin-tareas">
          {hayTareas ? (
            /**
             * hayTareas es true (existen tareas en el estado original)
             * pero tareas.length es 0 (ninguna pasó los filtros).
             * Esto significa que la búsqueda, el filtro de estado o ambos
             * descartaron todas las tareas. Le avisamos al usuario para
             * que ajuste sus criterios.
             */
            <p>No se encontraron tareas con los filtros actuales.</p>
          ) : (
            /**
             * hayTareas es false: el array original está vacío.
             * El usuario todavía no creó ninguna tarea, así que
             * mostramos un mensaje de bienvenida.
             */
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
          {/* .map() recorre el array y crea un componente TareaFila
              por cada tarea. La prop key={tarea.id} le permite a React
              saber qué filas cambiaron, se agregaron o se eliminaron
              entre renders, optimizando las actualizaciones del DOM. */}
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
