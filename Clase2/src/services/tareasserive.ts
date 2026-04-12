
import { crearTarea, Tarea, Prioridad } from "../models/tarea";

export const agregarTarea = (tareas: Tarea[], tarea: Tarea): Tarea[] => [...tareas, tarea];

export const buscarPorId = (tareas: Tarea[], id: number): Tarea | undefined => tareas.find((tarea) => tarea.id === id);

export const completarTarea = (tareas: Tarea[], id: number): Tarea[] =>
  tareas.map((tarea) =>
    tarea.id === id ? { ...tarea, completada: true } : tarea
  );

export const eliminarTarea = (tareas: Tarea[], id: number): Tarea[] =>
  tareas.filter((tarea) => tarea.id !== id);

export const actualizarTarea = (tareas: Tarea[], tareaActualizada: Tarea): Tarea[] =>
  tareas.map((tarea) =>
    tarea.id === tareaActualizada.id ? { ...tarea, ...tareaActualizada } : tarea
  );

export const actualizarPrioridad = (tareas: Tarea[], id: number, nuevaPrioridad: Prioridad): Tarea[] =>
  tareas.map((tarea) =>
    tarea.id === id ? { ...tarea, prioridad: nuevaPrioridad } : tarea
  );

export const duplicarTarea = (tareas: Tarea[], id: number): Tarea[] => {
  const original = tareas.find((tarea) => tarea.id === id);
  if (!original) return [...tareas];

  const copia = crearTarea(
    `${original.titulo} (copia)`,
    original.descripcion,
    original.prioridad
  );

  return [...tareas, { ...copia, completada: original.completada }];
};
