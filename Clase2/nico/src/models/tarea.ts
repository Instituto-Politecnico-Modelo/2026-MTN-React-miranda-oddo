import type { Prioridad, Tarea } from "../interfaces/tarea.interface.js";

export function crearTarea(id: number, titulo: string, descripcion: string, prioridad: Prioridad): Tarea {
  var tarea: Tarea = {
    id,
    titulo,
    descripcion,
    prioridad,
    completada: false,
    fechaCreacion: new Date(),
  };

  return tarea;
}

