import type { Prioridad, Tarea, Vista } from '../types'

interface TareaItemProps {
  tarea: Tarea
  vista?: Vista
  onMarcarRealizada: (id: number) => void
}

const prioridadTexto: Record<Prioridad, string> = {
  alta: 'Alta',
  media: 'Media',
  baja: 'Baja',
}

function TareaItem({ tarea, vista = 'listado', onMarcarRealizada }: TareaItemProps) {
  const { id, titulo, prioridad, estado } = tarea

  return (
    <div className={`tarea-item ${estado} vista-${vista}`}>
      <div className="tarea-info">
        <span className="tarea-titulo">{titulo}</span>
        <span className="tarea-prioridad">Prioridad: {prioridadTexto[prioridad]}</span>
        <span className="tarea-estado">
          {estado === 'realizada' ? 'Realizada' : 'Pendiente'}
        </span>
      </div>
      {estado !== 'realizada' && (
        <button type="button" onClick={() => onMarcarRealizada(id)}>
          Marcar como realizada
        </button>
      )}
    </div>
  )
}

export default TareaItem