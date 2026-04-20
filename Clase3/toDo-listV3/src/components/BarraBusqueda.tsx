interface Props {
  busqueda: string
  onBuscar: (texto: string) => void
}

function BarraBusqueda({ busqueda, onBuscar }: Props) {
  return (
    <div className="barra-busqueda">
      <input
        type="text"
        placeholder="🔍 Buscar por título o descripción..."
        value={busqueda}
        onChange={e => onBuscar(e.target.value)}
      />
    </div>
  )
}

export default BarraBusqueda
