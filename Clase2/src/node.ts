import { Tarea } from './models/tarea';
import { mostrarTarea, crearTarea } from './models/tarea';
import { agregarTarea, eliminarTarea, actualizarTarea } from './services/tareasserive';

// Ejemplo de uso:
let tareas: Tarea[] = [
  crearTarea("Tarea 1", "Descripción 1"),
  crearTarea("Tarea 2", "Descripción 2")
];

tareas.forEach(mostrarTarea);



// Agregar tarea
tareas = agregarTarea(tareas, crearTarea("Tarea 3", "Descripción 3"));
console.log("Después de agregar:");
tareas.forEach(mostrarTarea);

// Eliminar tarea
tareas = eliminarTarea(tareas, 2);
console.log("Después de eliminar:");
tareas.forEach(mostrarTarea);

// Actualizar tarea
const tareaActualizada = { ...tareas[0], descripcion: "Tarea 1 actualizada" };
tareas = actualizarTarea(tareas, tareaActualizada);
console.log("Después de actualizar:");
tareas.forEach(mostrarTarea);
