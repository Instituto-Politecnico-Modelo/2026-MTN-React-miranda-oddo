import { Tarea, Prioridad } from "../models/tarea";

const PRIORIDADES: Prioridad[] = ["alta", "media", "baja"];

export const filtrarPorEstado = (tareas: Tarea[], completada: boolean): Tarea[] =>
  tareas.filter((tarea) => tarea.completada === completada);

export const filtrarPorPrioridad = (tareas: Tarea[], prioridad: Prioridad): Tarea[] =>
  tareas.filter((tarea) => tarea.prioridad === prioridad);

export const contarPorPrioridad = (tareas: Tarea[]): Record<Prioridad, number> =>
  tareas.reduce(
    (acumulador, tarea) => {
      acumulador[tarea.prioridad] = (acumulador[tarea.prioridad] || 0) + 1;
      return acumulador;
    },
    { alta: 0, media: 0, baja: 0 } as Record<Prioridad, number>
  );

export const ordenarPorPrioridad = (tareas: Tarea[]): Tarea[] =>
  [...tareas].sort(
    (a, b) => PRIORIDADES.indexOf(a.prioridad) - PRIORIDADES.indexOf(b.prioridad)
  );

export const buscarTareas = (tareas: Tarea[], criterio: string): Tarea[] =>
  tareas.filter(
    (tarea) =>
      tarea.titulo.includes(criterio.toLowerCase()) ||
      tarea.descripcion.includes(criterio.toLowerCase())
  );

export const validarTarea = (tarea: any): { esValida: boolean; errores: string[] } => {
  const errores: string[] = [];

  if (!tarea.titulo || typeof tarea.titulo !== "string" || tarea.titulo.trim() === "") {
    errores.push("El título es obligatorio y debe ser un texto no vacío.");
  }
  if (!tarea.descripcion || typeof tarea.descripcion !== "string" || tarea.descripcion.trim() === "") {
    errores.push("La descripción es obligatoria y debe ser un texto no vacío.");
  }
  if (!PRIORIDADES.includes(tarea.prioridad)) {
    errores.push(`La prioridad debe ser una de: ${PRIORIDADES.join(", ")}.`);
  }
  if (typeof tarea.completada !== "boolean") {
    errores.push("El campo 'completada' debe ser un booleano.");
  }
  if (!tarea.fechaCreacion || isNaN(Date.parse(tarea.fechaCreacion))) {
    errores.push("La fecha de creación es inválida o está ausente.");
  }

  return { esValida: errores.length === 0, errores };
};
