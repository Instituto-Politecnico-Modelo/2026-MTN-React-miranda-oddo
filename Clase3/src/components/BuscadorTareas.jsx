function BuscadorTareas({ onBuscar }) {
  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="🔍 Buscar tarea por título..."
        onChange={(e) => onBuscar(e.target.value)}
      />
    </div>
  )
}

export default BuscadorTareas
