// Ejemplo de uso:
let tareas = [
  { id: 1, descripcion: "Tarea 1" },
  { id: 2, descripcion: "Tarea 2" }
];
import { mostrarTarea, crearTarea } from './src/services/tarea.js';

mostrarTarea = mostrarTarea(tareas);


import { agregarTarea, eliminarTarea, actualizarTarea } from './src/services/tareasService.js';



// Agregar tarea
tareas = agregarTarea(tareas, { id: 3, descripcion: "Tarea 3" });
console.log("Después de agregar:", tareas);

// Eliminar tarea
tareas = eliminarTarea(tareas, 2);
console.log("Después de eliminar:", tareas);

// Actualizar tarea
tareas = actualizarTarea(tareas, 1, "Tarea 1 actualizada");
console.log("Después de actualizar:", tareas);