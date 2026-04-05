interface BuscadorTareasProps {
  onBuscar: (termino: string) => void
}

function BuscadorTareas({ onBuscar }: BuscadorTareasProps) {
  return (
    <div className="buscador">
      <input
        type="text"
        placeholder="Buscar tarea por titulo..."
        onChange={(event) => onBuscar(event.target.value)}
      />
    </div>
  )
}

export default BuscadorTareas