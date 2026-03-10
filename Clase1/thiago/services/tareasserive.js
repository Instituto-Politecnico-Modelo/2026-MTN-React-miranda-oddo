
const { crearTarea } = require("../models/tarea");

const agregarTarea = (tareas, tarea) => [...tareas, tarea];

const buscarPorId = (tareas, id) => tareas.find((tarea) => tarea.id === id);

const completarTarea = (tareas, id) =>
  tareas.map((tarea) =>
    tarea.id === id ? { ...tarea, completada: true } : tarea
  );

const eliminarTarea = (tareas, id) =>
  tareas.filter((tarea) => tarea.id !== id);

const actualizarTarea = (tareas, tareaActualizada) =>
  tareas.map((tarea) =>
    tarea.id === tareaActualizada.id ? { ...tarea, ...tareaActualizada } : tarea
  );

const actualizarPrioridad = (tareas, id, nuevaPrioridad) =>
  tareas.map((tarea) =>
    tarea.id === id ? { ...tarea, prioridad: nuevaPrioridad } : tarea
  );

const duplicarTarea = (tareas, id) => {
  const original = tareas.find((tarea) => tarea.id === id);
  if (!original) return [...tareas];

  const copia = crearTarea(
    `${original.titulo} (copia)`,
    original.descripcion,
    original.prioridad
  );

  return [...tareas, { ...copia, completada: original.completada }];
};

module.exports = {
  agregarTarea,
  buscarPorId,
  completarTarea,
  eliminarTarea,
  actualizarTarea,
  actualizarPrioridad,
  duplicarTarea,
};