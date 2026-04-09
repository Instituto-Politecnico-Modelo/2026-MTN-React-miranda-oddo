import type { FiltroEstado, OrdenPrioridad } from '../interfaces/tarea.interface'

/**
 * Props que recibe el componente FiltrosOrden.
 * Sigue el patrón de "estado elevado" (lifting state up): los valores
 * actuales del filtro y del orden viven en App, y este componente solo
 * los muestra y notifica cambios mediante los callbacks on*.
 *
 * - filtroEstado / onFiltroEstado: valor actual y setter del filtro por estado.
 * - ordenPrioridad / onOrdenPrioridad: valor actual y setter del orden por prioridad.
 */
interface Props {
  filtroEstado: FiltroEstado
  onFiltroEstado: (filtro: FiltroEstado) => void
  ordenPrioridad: OrdenPrioridad
  onOrdenPrioridad: (orden: OrdenPrioridad) => void
}

/**
 * Componente que agrupa los controles de filtrado y ordenamiento.
 * Responsabilidades:
 * 1. Renderizar tres botones para filtrar por estado (todas / pendientes / completadas).
 * 2. Renderizar un <select> para elegir el criterio de orden por prioridad.
 *
 * NO contiene lógica de filtrado ni ordenamiento: solo envía las
 * selecciones del usuario hacia App mediante los callbacks.
 * La lógica real de filtrado/ordenamiento se ejecuta en App.tsx.
 */
function FiltrosOrden({ filtroEstado, onFiltroEstado, ordenPrioridad, onOrdenPrioridad }: Props) {
  return (
    <div className="filtros-orden">

      {/* ── Botones de filtro por estado ──
          Cada botón, al hacer click, llama a onFiltroEstado con su valor
          correspondiente. Esto actualiza el estado filtroEstado en App,
          lo que provoca un re-render y recalcula las tareas visibles.
          La clase CSS "activo" se aplica condicionalmente al botón cuyo
          valor coincide con el filtro actualmente seleccionado, dándole
          un estilo visual destacado para que el usuario sepa cuál eligió. */}
      <div className="filtro-estado">
        <span className="filtro-label">Estado:</span>
        <button
          className={filtroEstado === 'todas' ? 'activo' : ''}
          onClick={() => onFiltroEstado('todas')}
        >
          Todas
        </button>
        <button
          className={filtroEstado === 'pendientes' ? 'activo' : ''}
          onClick={() => onFiltroEstado('pendientes')}
        >
          Pendientes
        </button>
        <button
          className={filtroEstado === 'completadas' ? 'activo' : ''}
          onClick={() => onFiltroEstado('completadas')}
        >
          Completadas
        </button>
      </div>

      {/* ── Selector de orden por prioridad ──
          Es un <select> controlado: su valor viene de la prop ordenPrioridad.
          Cuando el usuario elige una opción distinta, el onChange extrae
          el nuevo valor con e.target.value y lo castea al tipo OrdenPrioridad
          usando "as OrdenPrioridad" (es seguro porque los values del <option>
          coinciden exactamente con los valores del type). Luego lo envía
          a App para que se reordene el array de tareas. */}
      <div className="orden-prioridad">
        <span className="filtro-label">Ordenar:</span>
        <select
          value={ordenPrioridad}
          onChange={e => onOrdenPrioridad(e.target.value as OrdenPrioridad)}
        >
          <option value="ninguno">Sin orden</option>
          <option value="alta-primero">Prioridad: Alta → Baja</option>
          <option value="baja-primero">Prioridad: Baja → Alta</option>
        </select>
      </div>
    </div>
  )
}

export default FiltrosOrden
