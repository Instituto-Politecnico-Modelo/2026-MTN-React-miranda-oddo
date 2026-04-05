export type Prioridad = 'alta' | 'media' | 'baja'

export type EstadoTarea = 'pendiente' | 'realizada'

export type Vista = 'listado' | 'cards' | 'tabla'

export interface Tarea {
  id: number
  titulo: string
  prioridad: Prioridad
  estado: EstadoTarea
}