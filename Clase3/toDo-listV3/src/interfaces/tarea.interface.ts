export type Prioridad = "alta" | "media" | "baja";

export type FiltroEstado = "todas" | "pendientes" | "completadas";

export type OrdenPrioridad = "ninguno" | "alta-primero" | "baja-primero";

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: Prioridad;
  completada: boolean;
}
