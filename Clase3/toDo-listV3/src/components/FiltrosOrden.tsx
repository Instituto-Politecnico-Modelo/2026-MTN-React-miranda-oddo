import type { FiltroEstado, OrdenPrioridad } from '../interfaces/tarea.interface'

interface Props {
  filtroEstado: FiltroEstado
  onFiltroEstado: (filtro: FiltroEstado) => void
  ordenPrioridad: OrdenPrioridad
  onOrdenPrioridad: (orden: OrdenPrioridad) => void
}

function FiltrosOrden({ filtroEstado, onFiltroEstado, ordenPrioridad, onOrdenPrioridad }: Props) {
  return (
    <div className="filtros-orden">

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
