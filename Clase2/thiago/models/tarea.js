let contadorId = 1;

const crearTarea = (titulo, descripcion, prioridad = "media") => ({
  id: contadorId++,
  titulo,
  descripcion,
  prioridad,
  completada: false,
  fechaCreacion: new Date().toISOString(),
});

const mostrarTarea = (tarea) => console.log(`ID: ${tarea.id}, Título: ${tarea.titulo}, Descripción: ${tarea.descripcion}, Prioridad: ${tarea.prioridad}, Completada: ${tarea.completada}, Fecha de Creación: ${tarea.fechaCreacion}`);

module.exports = { crearTarea, mostrarTarea };