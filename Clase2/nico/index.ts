import type { Tarea } from "./src/interfaces/tarea.interface.js";
import * as service from "./src/services/tareaService.js";
import { validarTarea } from "./src/utils/validaciones.js";
var tareas: Tarea[] = [];


// ── AGREGAR TAREAS ───────────────────────────────────────────────────────────
console.log("=== AGREGAR TAREAS ===");

service.agregarTarea("Comprar comida", "Leche, pan y huevos", "alta", tareas);
service.agregarTarea("Estudiar JavaScript", "Repasar bucles y funciones", "alta", tareas);
service.agregarTarea("Hacer ejercicio", "30 minutos de cardio", "media", tareas);
service.agregarTarea("Llamar al médico", "Pedir turno anual", "baja", tareas);
service.agregarTarea("Leer un libro", "Capítulo 5", "baja", tareas);

console.log(service.mostrarTarea(service.buscarPorId(1)));
console.log(service.mostrarTarea(service.buscarPorId(2)));
console.log(service.mostrarTarea(service.buscarPorId(3)));

// ── VALIDAR UNA TAREA ────────────────────────────────────────────────────────
console.log("\n=== VALIDAR TAREA ===");

var tareaInvalida = { id: undefined, titulo: "", descripcion: "", prioridad: "urgente" };
var resultado = validarTarea(tareaInvalida);
console.log("Es válida:", resultado.esValida);
console.log("Errores:", resultado.errores);

var tareaValida = service.buscarPorId(1);
var resultado2 = validarTarea(tareaValida);
console.log("Es válida:", resultado2.esValida);
console.log("Errores:", resultado2.errores);

// ── COMPLETAR TAREA ──────────────────────────────────────────────────────────
console.log("\n=== COMPLETAR TAREA ID 1 ===");

service.completarTarea(1);
console.log(service.mostrarTarea(service.buscarPorId(1)));

// ── ACTUALIZAR TAREA ─────────────────────────────────────────────────────────
console.log("\n=== ACTUALIZAR TAREA ID 3 ===");

service.actualizarTarea({ id: 3, titulo: "Hacer ejercicio (actualizado)", descripcion: "1 hora de cardio" });
console.log(service.mostrarTarea(service.buscarPorId(3)));

// ── ACTUALIZAR PRIORIDAD ─────────────────────────────────────────────────────
console.log("\n=== ACTUALIZAR PRIORIDAD TAREA ID 4 ===");

service.actualizarPrioridad(4, "media");
console.log(service.mostrarTarea(service.buscarPorId(4)));

// ── DUPLICAR TAREA ───────────────────────────────────────────────────────────
console.log("\n=== DUPLICAR TAREA ID 2 ===");

service.duplicarTarea(2);
console.log(service.mostrarTarea(service.buscarPorId(6)));

// ── FILTRAR POR ESTADO ───────────────────────────────────────────────────────
console.log("\n=== TAREAS COMPLETADAS ===");

var completadas: Tarea[] = service.filtrarPorEstado(true);
completadas.forEach(function (t) {
  console.log(service.mostrarTarea(t));
});

console.log("\n=== TAREAS PENDIENTES ===");

var pendientes: Tarea[] = service.filtrarPorEstado(false);
pendientes.forEach(function (t) {
  console.log(service.mostrarTarea(t));
});

// ── FILTRAR POR PRIORIDAD ────────────────────────────────────────────────────
console.log("\n=== TAREAS DE PRIORIDAD ALTA ===");

var tareasAlta: Tarea[] = service.filtrarPorPrioridad("alta");
tareasAlta.forEach(function (t) {
  console.log(service.mostrarTarea(t));
});

// ── CONTAR POR PRIORIDAD ─────────────────────────────────────────────────────
console.log("\n=== CONTAR POR PRIORIDAD ===");

var conteo = service.contarPorPrioridad();
console.log("Alta:", conteo.alta);
console.log("Media:", conteo.media);
console.log("Baja:", conteo.baja);

// ── ORDENAR POR PRIORIDAD ────────────────────────────────────────────────────
console.log("\n=== ORDENADAS POR PRIORIDAD ===");

var ordenadas: Tarea[] = service.ordenarPorPrioridad();
ordenadas.forEach(function (t) {
  console.log(service.mostrarTarea(t));
});

// ── BUSCAR TAREAS ────────────────────────────────────────────────────────────
console.log("\n=== BUSCAR: 'ejercicio' ===");

var encontradas: Tarea[] = service.buscarTareas("ejercicio");
encontradas.forEach(function (t) {
  console.log(service.mostrarTarea(t));
});

// ── ELIMINAR TAREA ───────────────────────────────────────────────────────────
console.log("\n=== ELIMINAR TAREA ID 5 ===");

service.eliminarTarea(5);
console.log("Tareas restantes:");
tareas.forEach(function (t) {
  console.log(service.mostrarTarea(t));
});
