export type Prioridad = "alta" | "media" | "baja";

export interface Tarea {
  id: number;
  titulo: string;
  prioridad: Prioridad;
  completada: boolean;
}
