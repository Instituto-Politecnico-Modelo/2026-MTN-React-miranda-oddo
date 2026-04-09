/**
 * Props que recibe el componente BarraBusqueda.
 * - busqueda: el texto actual del input, controlado desde App.
 * - onBuscar: función callback que se ejecuta cada vez que el usuario
 *   escribe en el input. Recibe el nuevo texto y lo envía a App
 *   para que actualice el estado `busqueda`, lo cual dispara
 *   el recálculo del pipeline de filtrado (búsqueda → filtro → orden).
 */
interface Props {
  busqueda: string
  onBuscar: (texto: string) => void
}

/**
 * Componente de búsqueda en tiempo real.
 * Es un "componente controlado": su valor no se maneja internamente,
 * sino que viene del padre (App) a través de la prop `busqueda`.
 * Cuando el usuario escribe, el onChange llama a onBuscar con el nuevo
 * texto, App actualiza su estado, y React re-renderiza este componente
 * con el valor actualizado. Este flujo unidireccional de datos
 * (App → BarraBusqueda → App) es el patrón estándar de React.
 */
function BarraBusqueda({ busqueda, onBuscar }: Props) {
  return (
    <div className="barra-busqueda">
      <input
        type="text"
        placeholder="🔍 Buscar por título o descripción..."
        value={busqueda}
        /**
         * onChange se dispara con cada tecla que el usuario presiona.
         * e.target.value contiene el texto completo del input en ese momento.
         * Al llamar a onBuscar (que es setBusqueda de App), actualizamos
         * el estado global de búsqueda y el filtrado se recalcula al instante.
         */
        onChange={e => onBuscar(e.target.value)}
      />
    </div>
  )
}

export default BarraBusqueda
