import { useState } from 'react'
import type { Prioridad } from '../interfaces/tarea.interface'

/**
 * Props del componente FormularioTarea.
 * onAgregar es un callback que recibe los tres datos necesarios para
 * crear una tarea: título (obligatorio), descripción (puede ser vacío)
 * y prioridad. Al llamarlo, App.tsx se encarga de construir el objeto
 * Tarea y agregarlo al estado global.
 */
interface Props {
  onAgregar: (titulo: string, descripcion: string, prioridad: Prioridad) => void
}

/**
 * Componente encargado de recopilar los datos de una nueva tarea.
 * Maneja su propio estado local para los campos del formulario
 * (titulo, descripcion, prioridad, error) porque son datos temporales
 * que solo interesan mientras el usuario está completando el form.
 * Una vez enviados, se resetean a sus valores iniciales.
 */
function FormularioTarea({ onAgregar }: Props) {
  const [titulo, setTitulo] = useState('')

  /**
   * Estado local para la descripción de la tarea.
   * Es un campo opcional: si el usuario no escribe nada, se envía
   * como string vacío ("") y en la tabla no se muestra nada extra.
   */
  const [descripcion, setDescripcion] = useState('')
  const [prioridad, setPrioridad] = useState<Prioridad>('media')
  const [error, setError] = useState('')

  /**
   * Manejador del envío del formulario.
   * 1. Previene el comportamiento por defecto del form (recargar la página).
   * 2. Valida que el título no esté vacío (trim elimina espacios en blanco).
   * 3. Si es válido, llama al callback onAgregar con los datos limpios.
   * 4. Resetea todos los campos a sus valores iniciales para que el usuario
   *    pueda agregar otra tarea inmediatamente.
   */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (titulo.trim() === '') {
      setError('El título no puede estar vacío')
      return
    }
    onAgregar(titulo.trim(), descripcion.trim(), prioridad)
    setTitulo('')
    setDescripcion('')
    setPrioridad('media')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="formulario">
      <div className="formulario-campos">
        <input
          type="text"
          placeholder="Título de la tarea..."
          value={titulo}
          onChange={e => {
            setTitulo(e.target.value)
            // Limpiamos el error al empezar a escribir, así el mensaje
            // desaparece en cuanto el usuario corrige el campo vacío
            setError('')
          }}
        />

        {/* Select de prioridad: casteamos e.target.value a Prioridad
            porque el evento devuelve string, pero nosotros sabemos que
            los values del <option> son exactamente "alta", "media" o "baja" */}
        <select
          value={prioridad}
          onChange={e => setPrioridad(e.target.value as Prioridad)}
        >
          <option value="alta">🔴 Alta</option>
          <option value="media">🟡 Media</option>
          <option value="baja">🟢 Baja</option>
        </select>
        <button type="submit">Agregar</button>
      </div>

      {/* Input de descripción: se ubica debajo de la fila principal.
          Es un campo simple sin validación ya que la descripción es
          opcional. Su valor se envía al padre junto con título y prioridad. */}
      <input
        type="text"
        className="input-descripcion"
        placeholder="Descripción (opcional)..."
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
      />

      {/* Renderizado condicional del error: si error es un string vacío ("")
          la expresión es falsy y React no renderiza nada. Si tiene texto,
          se muestra el <p> con el mensaje de validación. */}
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default FormularioTarea
