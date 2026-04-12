export type Prioridad = 'alta' | 'media' | 'baja'

export type EstadoTarea = 'pendiente' | 'realizada'

export type Vista = 'listado' | 'cards' | 'tabla'

export type FiltroEstado = 'todas' | 'pendiente' | 'realizada'

export type Ordenamiento = 'ninguno' | 'prioridad-asc' | 'prioridad-desc'

export interface Tarea {
  id: number
  titulo: string
  prioridad: Prioridad
  estado: EstadoTarea
}