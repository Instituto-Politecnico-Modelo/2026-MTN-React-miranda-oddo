export type Prioridad = "alta" | "media" | "baja";

export interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  prioridad: Prioridad;
  completada: boolean;
  fechaCreacion: string;
}

let contadorId = 1;

export const crearTarea = (titulo: string, descripcion: string, prioridad: Prioridad = "media"): Tarea => ({
  id: contadorId++,
  titulo,
  descripcion,
  prioridad,
  completada: false,
  fechaCreacion: new Date().toISOString(),
});

export const mostrarTarea = (tarea: Tarea): void => console.log(`ID: ${tarea.id}, Título: ${tarea.titulo}, Descripción: ${tarea.descripcion}, Prioridad: ${tarea.prioridad}, Completada: ${tarea.completada}, Fecha de Creación: ${tarea.fechaCreacion}`);
