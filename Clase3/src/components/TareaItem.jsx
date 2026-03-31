function TareaItem({ tarea, onMarcarRealizada }) {
  const { id, titulo, prioridad, estado } = tarea

  const prioridadEmoji = {
    alta: '🔴',
    media: '🟡',
    baja: '🟢',
  }

  return (
    <div className={`tarea-item ${estado}`}>
      <div className="tarea-info">
        <span className="tarea-titulo">{titulo}</span>
        <span className="tarea-prioridad">{prioridadEmoji[prioridad]} {prioridad}</span>
        <span className="tarea-estado">{estado === 'realizada' ? '✅ Realizada' : '⏳ Pendiente'}</span>
      </div>
      {estado !== 'realizada' && (
        <button onClick={() => onMarcarRealizada(id)}>
          Marcar como realizada
        </button>
      )}
    </div>
  )
}

export default TareaItem
