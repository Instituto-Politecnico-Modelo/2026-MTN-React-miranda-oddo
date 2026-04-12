import { useState } from 'react'
import type { Vista } from '../types'

interface VistaSelectorProps {
  vista: Vista
  onCambiarVista: (vista: Vista) => void
}

const opciones: { valor: Vista; etiqueta: string }[] = [
  { valor: 'listado', etiqueta: '☰ Listado' },
  { valor: 'cards', etiqueta: '⊞ Cards' },
  { valor: 'tabla', etiqueta: '⊟ Tabla' },
]

function VistaSelector({ vista, onCambiarVista }: VistaSelectorProps) {
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="filtro-colapsable">
      <button
        type="button"
        className={`filtro-toggle ${abierto ? 'abierto' : ''}`}
        onClick={() => setAbierto(!abierto)}
      >
        Vista <i className={`fa-solid fa-chevron-${abierto ? 'up' : 'down'}`}></i>
      </button>
      {abierto && (
        <div className="filtro-opciones">
          {opciones.map(({ valor, etiqueta }) => (
            <button
              key={valor}
              type="button"
              className={vista === valor ? 'activo' : ''}
              onClick={() => onCambiarVista(valor)}
            >
              {etiqueta}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default VistaSelector
