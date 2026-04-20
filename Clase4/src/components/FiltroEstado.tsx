import { useState } from 'react'
import type { FiltroEstado as FiltroEstadoType } from '../types'

interface FiltroEstadoProps {
  filtro: FiltroEstadoType
  onCambiarFiltro: (filtro: FiltroEstadoType) => void
}

const opciones: { valor: FiltroEstadoType; etiqueta: string }[] = [
  { valor: 'todas', etiqueta: 'Todas' },
  { valor: 'pendiente', etiqueta: 'Pendientes' },
  { valor: 'realizada', etiqueta: 'Realizadas' },
]

function FiltroEstado({ filtro, onCambiarFiltro }: FiltroEstadoProps) {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="filtro-colapsable">
      <button
        type="button"
        className={`filtro-toggle ${abierto ? 'abierto' : ''}`}
        onClick={() => setAbierto(!abierto)}
      >
        Estado <i className={`fa-solid fa-chevron-${abierto ? 'up' : 'down'}`}></i>
      </button>
      {abierto && (
        <div className="filtro-opciones">
          {opciones.map(({ valor, etiqueta }) => (
            <button
              key={valor}
              type="button"
              className={filtro === valor ? 'activo' : ''}
              onClick={() => onCambiarFiltro(valor)}
            >
              {etiqueta}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default FiltroEstado
