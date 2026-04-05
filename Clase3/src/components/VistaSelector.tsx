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
  return (
    <div className="vista-selector">
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
  )
}

export default VistaSelector
