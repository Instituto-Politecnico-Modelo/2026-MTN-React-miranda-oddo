import { useState } from 'react'
import type { Tarea, Prioridad, FiltroEstado, OrdenPrioridad } from './interfaces/tarea.interface'
import FormularioTarea from './components/FormularioTarea'
import BarraBusqueda from './components/BarraBusqueda'
import FiltrosOrden from './components/FiltrosOrden'
import ListaTareas from './components/ListaTareas'
import './App.css'

/**
 * Mapa que asigna un peso numérico a cada nivel de prioridad.
 * Se utiliza dentro de la función sort() para comparar dos tareas:
 * restando los pesos obtenemos un número positivo, negativo o cero
 * que le indica a sort() cuál va primero. Ejemplo:
 *   alta(3) - baja(1) = 2  → alta va antes que baja (orden descendente)
 *   baja(1) - alta(3) = -2 → baja va antes que alta (orden ascendente)
 * Se declara fuera del componente porque es un valor constante que no
 * cambia entre renders, evitando recrearlo en cada ejecución de App().
 */
const pesoPrioridad: Record<Prioridad, number> = {
  alta: 3,
  media: 2,
  baja: 1,
}

function App() {
  /**
   * Estado principal: array con todas las tareas creadas por el usuario.
   * Cada tarea cumple con la interfaz Tarea definida en tarea.interface.ts.
   * Este array se modifica únicamente mediante agregarTarea, completarTarea
   * y eliminarTarea. Los filtros y búsqueda NO modifican este array,
   * sino que generan un array derivado (resultado) para la vista.
   */
  const [tareas, setTareas] = useState<Tarea[]>([])

  /**
   * Contador auto-incremental para asignar un id único a cada nueva tarea.
   * Se incrementa en 1 cada vez que se agrega una tarea, asegurando que
   * nunca se repita un id aunque se eliminen tareas intermedias.
   */
  const [nextId, setNextId] = useState(1)

  /**
   * Texto que el usuario escribe en la barra de búsqueda.
   * Se usa para filtrar tareas cuyo título O descripción contengan
   * este texto (comparación case-insensitive para mayor comodidad).
   */
  const [busqueda, setBusqueda] = useState('')

  /**
   * Filtro activo de estado. Controla qué tareas se muestran según
   * estén pendientes, completadas, o todas. El valor por defecto
   * "todas" muestra el listado completo sin restricciones de estado.
   */
  const [filtroEstado, setFiltroEstado] = useState<FiltroEstado>('todas')

  /**
   * Criterio de ordenamiento por prioridad. Cuando es "ninguno"
   * las tareas se muestran en orden de creación (por id).
   * "alta-primero" y "baja-primero" reordenan el array usando
   * el mapa pesoPrioridad para la comparación numérica.
   */
  const [ordenPrioridad, setOrdenPrioridad] = useState<OrdenPrioridad>('ninguno')

  /**
   * Crea un nuevo objeto Tarea con los datos recibidos del formulario
   * y lo agrega al final del array de tareas. Luego incrementa el
   * contador de id para que la próxima tarea tenga un id diferente.
   * Se usa spread operator ([...tareas, nueva]) para crear un NUEVO
   * array en vez de mutar el existente, lo cual es necesario para que
   * React detecte el cambio de estado y vuelva a renderizar.
   */
  function agregarTarea(titulo: string, descripcion: string, prioridad: Prioridad) {
    const nueva: Tarea = {
      id: nextId,
      titulo,
      descripcion,
      prioridad,
      completada: false,
    }
    setTareas([...tareas, nueva])
    setNextId(nextId + 1)
  }

  /**
   * Alterna el estado completada de una tarea específica.
   * Usa .map() para recorrer todas las tareas: cuando encuentra la que
   * coincide con el id, crea una copia con el valor invertido (!t.completada).
   * Las demás tareas se devuelven sin cambios. El resultado es un nuevo array,
   * lo cual dispara el re-render de React.
   */
  function completarTarea(id: number) {
    setTareas(tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t))
  }

  /**
   * Elimina una tarea del array filtrando por id.
   * El método .filter() devuelve un nuevo array que contiene únicamente
   * las tareas cuyo id NO coincide con el recibido, descartando la tarea
   * que se quiere eliminar. Al ser un nuevo array, React detecta el cambio.
   */
  function eliminarTarea(id: number) {
    setTareas(tareas.filter(t => t.id !== id))
  }

  // ─── Pipeline de transformación: búsqueda → filtro → orden ───
  // Las siguientes líneas aplican las tres transformaciones en cadena
  // sobre el array original de tareas. Cada paso genera un nuevo array
  // sin modificar el estado original, siguiendo el principio de inmutabilidad.

  /**
   * PASO 1 - Búsqueda por texto:
   * Convertimos el texto de búsqueda a minúsculas una sola vez para no
   * repetir la conversión en cada iteración del filter. Luego filtramos
   * las tareas que contengan ese texto en su título O en su descripción.
   * includes() devuelve true si el substring aparece en cualquier posición.
   * Si busqueda está vacío (""), includes("") siempre es true, por lo que
   * se muestran todas las tareas (comportamiento esperado).
   */
  const textoBusqueda = busqueda.toLowerCase()
  let resultado = tareas.filter(t =>
    t.titulo.toLowerCase().includes(textoBusqueda) ||
    t.descripcion.toLowerCase().includes(textoBusqueda)
  )

  /**
   * PASO 2 - Filtro por estado:
   * Sobre el resultado de la búsqueda, aplicamos un segundo filter
   * según el botón de estado seleccionado. Si es "todas" no hacemos
   * nada (se mantiene el array tal como está). Si es "pendientes"
   * descartamos las completadas, y viceversa.
   */
  if (filtroEstado === 'pendientes') {
    resultado = resultado.filter(t => !t.completada)
  } else if (filtroEstado === 'completadas') {
    resultado = resultado.filter(t => t.completada)
  }

  /**
   * PASO 3 - Ordenamiento por prioridad:
   * Creamos una copia del array con [...resultado] porque .sort() muta
   * el array original y no queremos efectos secundarios. La función de
   * comparación resta los pesos numéricos de las prioridades:
   * - Si el resultado es positivo, "b" va antes que "a" (descendente).
   * - Si es negativo, "a" va antes (ascendente).
   * - Si es 0, mantienen su posición relativa.
   */
  if (ordenPrioridad === 'alta-primero') {
    resultado = [...resultado].sort((a, b) => pesoPrioridad[b.prioridad] - pesoPrioridad[a.prioridad])
  } else if (ordenPrioridad === 'baja-primero') {
    resultado = [...resultado].sort((a, b) => pesoPrioridad[a.prioridad] - pesoPrioridad[b.prioridad])
  }

  /**
   * Contadores para el panel de resumen. Se calculan sobre el array
   * original (tareas) y NO sobre el resultado filtrado, para que el
   * usuario siempre vea el total real sin importar qué filtros tenga activos.
   */
  const pendientes = tareas.filter(t => !t.completada).length
  const completadas = tareas.filter(t => t.completada).length

  return (
    <div className="app">
      <div className="app-header">
        <h1>Gestor de Tareas</h1>
        <p>Hacé click en una fila para marcarla como completada</p>
      </div>

      {/* Formulario: recibe la función agregarTarea como callback.
          Cuando el usuario envía el form, el componente hijo llama
          a onAgregar(titulo, descripcion, prioridad) que ejecuta
          agregarTarea definida más arriba. */}
      <FormularioTarea onAgregar={agregarTarea} />

      {/* El resumen, la búsqueda y los filtros solo se muestran
          cuando hay al menos una tarea cargada. Usamos renderizado
          condicional con && (short-circuit): si tareas.length > 0
          es false, React no renderiza el bloque <></> */}
      {tareas.length > 0 && (
        <>
          <div className="resumen">
            <div className="resumen-item">
              <strong>{tareas.length}</strong>
              Total
            </div>
            <div className="resumen-item">
              <strong>{pendientes}</strong>
              Pendientes
            </div>
            <div className="resumen-item">
              <strong>{completadas}</strong>
              Completadas
            </div>
          </div>

          {/* BarraBusqueda: componente controlado que muestra el input
              de búsqueda. Le pasamos el valor actual (busqueda) y la
              función setter (setBusqueda) para que cada tecla que
              el usuario presione actualice el estado en App y se
              recalcule el pipeline de filtrado automáticamente. */}
          <BarraBusqueda busqueda={busqueda} onBuscar={setBusqueda} />

          {/* FiltrosOrden: componente que agrupa los botones de filtro
              por estado y el <select> de orden por prioridad.
              Recibe los valores actuales y sus setters para mantener
              la comunicación bidireccional con App. */}
          <FiltrosOrden
            filtroEstado={filtroEstado}
            onFiltroEstado={setFiltroEstado}
            ordenPrioridad={ordenPrioridad}
            onOrdenPrioridad={setOrdenPrioridad}
          />
        </>
      )}

      {/* ListaTareas recibe "resultado" (el array ya filtrado y ordenado)
          en vez del array original. También recibe hayTareas para que
          pueda distinguir entre "no hay tareas creadas" y "ninguna tarea
          coincide con los filtros actuales", mostrando un mensaje acorde. */}
      <ListaTareas
        tareas={resultado}
        onCompletar={completarTarea}
        onEliminar={eliminarTarea}
        hayTareas={tareas.length > 0}
      />
    </div>
  )
}

export default App
