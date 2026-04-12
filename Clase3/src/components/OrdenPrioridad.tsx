import { useState } from 'react'
import type { Ordenamiento } from '../types'

interface OrdenPrioridadProps {
  ordenamiento: Ordenamiento
  onCambiarOrden: (orden: Ordenamiento) => void
}

const opciones: { valor: Ordenamiento; etiqueta: string }[] = [
  { valor: 'ninguno', etiqueta: 'Sin orden' },
  { valor: 'prioridad-asc', etiqueta: 'Prioridad ↑' },
  { valor: 'prioridad-desc', etiqueta: 'Prioridad ↓' },
]

function OrdenPrioridad({ ordenamiento, onCambiarOrden }: OrdenPrioridadProps) {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="filtro-colapsable">
      <button
        type="button"
        className={`filtro-toggle ${abierto ? 'abierto' : ''}`}
        onClick={() => setAbierto(!abierto)}
      >
        Orden <i className={`fa-solid fa-chevron-${abierto ? 'up' : 'down'}`}></i>
      </button>
      {abierto && (
        <div className="filtro-opciones">
          {opciones.map(({ valor, etiqueta }) => (
            <button
              key={valor}
              type="button"
              className={ordenamiento === valor ? 'activo' : ''}
              onClick={() => onCambiarOrden(valor)}
            >
              {etiqueta}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdenPrioridad
