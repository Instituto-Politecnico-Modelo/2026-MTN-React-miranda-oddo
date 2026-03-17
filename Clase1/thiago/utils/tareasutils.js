const PRIORIDADES = ["alta", "media", "baja"];

const filtrarPorEstado = (tareas, completada) =>
  tareas.filter((tarea) => tarea.completada === completada);

const filtrarPorPrioridad = (tareas, prioridad) =>
  tareas.filter((tarea) => tarea.prioridad === prioridad);

const contarPorPrioridad = (tareas) =>
  tareas.reduce(
    (acumulador, tarea) => {
      acumulador[tarea.prioridad] = (acumulador[tarea.prioridad] || 0) + 1;
      return acumulador;
    },
    { alta: 0, media: 0, baja: 0 }
  );

const ordenarPorPrioridad = (tareas) =>
  [...tareas].sort(
    (a, b) => PRIORIDADES.indexOf(a.prioridad) - PRIORIDADES.indexOf(b.prioridad)
  );

const buscarTareas = (tareas, criterio) =>
  tareas.filter(
    (tarea) =>
      tarea.titulo.includes(criterio.toLowerCase()) ||
      tarea.descripcion.includes(criterio.toLowerCase())
  );

  
const validarTarea = (tarea) => {
  const errores = [];

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

module.exports = {
  filtrarPorEstado,
  filtrarPorPrioridad,
  contarPorPrioridad,
  ordenarPorPrioridad,
  buscarTareas,
  validarTarea,
};