import type { Tarea } from "./src/interfaces/tarea.interface.js";
import * as service from "./src/services/tareaService.js";
import { validarTarea } from "./src/utils/validaciones.js";
var tareas: Tarea[] = [];


// ── AGREGAR TAREAS ───────────────────────────────────────────────────────────
console.log("=== AGREGAR TAREAS ===");

tareas = service.agregarTarea("Comprar comida", "Leche, pan y huevos", "alta", tareas);
tareas = service.agregarTarea("Estudiar JavaScript", "Repasar bucles y funciones", "alta", tareas);
tareas = service.agregarTarea("Hacer ejercicio", "30 minutos de cardio", "media", tareas);
tareas = service.agregarTarea("Llamar al médico", "Pedir turno anual", "baja", tareas);
tareas = service.agregarTarea("Leer un libro", "Capítulo 5", "baja", tareas);

var t1 = service.buscarPorId(1, tareas);
var t2 = service.buscarPorId(2, tareas);
var t3 = service.buscarPorId(3, tareas);
if (t1) console.log(service.mostrarTarea(t1));
if (t2) console.log(service.mostrarTarea(t2));
if (t3) console.log(service.mostrarTarea(t3));

// ── VALIDAR UNA TAREA ────────────────────────────────────────────────────────
console.log("\n=== VALIDAR TAREA ===");

var tareaInvalida = { id: undefined, titulo: "", descripcion: "", prioridad: "urgente" };
var resultado = validarTarea(tareaInvalida);
console.log("Es válida:", resultado.esValida);
console.log("Errores:", resultado.errores);

var tareaValida = service.buscarPorId(1, tareas);
if (tareaValida) {
  var resultado2 = validarTarea(tareaValida);
  console.log("Es válida:", resultado2.esValida);
  console.log("Errores:", resultado2.errores);
}

// ── COMPLETAR TAREA ──────────────────────────────────────────────────────────
console.log("\n=== COMPLETAR TAREA ID 1 ===");

tareas = service.completarTarea(1, tareas);
var t1completada = service.buscarPorId(1, tareas);
if (t1completada) console.log(service.mostrarTarea(t1completada));

// ── ACTUALIZAR TAREA ─────────────────────────────────────────────────────────
console.log("\n=== ACTUALIZAR TAREA ID 3 ===");

var t3original = service.buscarPorId(3, tareas);
if (t3original) {
  tareas = service.actualizarTarea({ ...t3original, titulo: "Hacer ejercicio (actualizado)", descripcion: "1 hora de cardio", prioridad: "media", completada: false }, tareas);
}
var t3actualizada = service.buscarPorId(3, tareas);
if (t3actualizada) console.log(service.mostrarTarea(t3actualizada));

// ── ACTUALIZAR PRIORIDAD ─────────────────────────────────────────────────────
console.log("\n=== ACTUALIZAR PRIORIDAD TAREA ID 4 ===");

tareas = service.actualizarPrioridad(4, "media", tareas);
var t4 = service.buscarPorId(4, tareas);
if (t4) console.log(service.mostrarTarea(t4));

// ── DUPLICAR TAREA ───────────────────────────────────────────────────────────
console.log("\n=== DUPLICAR TAREA ID 2 ===");

tareas = service.duplicarTarea(2, tareas);
var t6 = service.buscarPorId(6, tareas);
if (t6) console.log(service.mostrarTarea(t6));

// ── FILTRAR POR ESTADO ───────────────────────────────────────────────────────
console.log("\n=== TAREAS COMPLETADAS ===");

var completadas: Tarea[] = service.filtrarPorEstado(true, tareas);
completadas.forEach(function (t) {
  console.log(service.mostrarTarea(t));
});

console.log("\n=== TAREAS PENDIENTES ===");

var pendientes: Tarea[] = service.filtrarPorEstado(false, tareas);
pendientes.forEach(function (t) {
  console.log(service.mostrarTarea(t));
});

// ── FILTRAR POR PRIORIDAD ────────────────────────────────────────────────────
console.log("\n=== TAREAS DE PRIORIDAD ALTA ===");

var tareasAlta: Tarea[] = service.filtrarPorPrioridad("alta", tareas);
tareasAlta.forEach(function (t) {
  console.log(service.mostrarTarea(t));
});

// ── CONTAR POR PRIORIDAD ─────────────────────────────────────────────────────
console.log("\n=== CONTAR POR PRIORIDAD ===");

var conteo = service.contarPorPrioridad(tareas);
console.log("Alta:", conteo.alta);
console.log("Media:", conteo.media);
console.log("Baja:", conteo.baja);

// ── ORDENAR POR PRIORIDAD ────────────────────────────────────────────────────
console.log("\n=== ORDENADAS POR PRIORIDAD ===");

var ordenadas: Tarea[] = service.ordenarPorPrioridad(tareas);
ordenadas.forEach(function (t) {
  console.log(service.mostrarTarea(t));
});

// ── BUSCAR TAREAS ────────────────────────────────────────────────────────────
console.log("\n=== BUSCAR: 'ejercicio' ===");

var encontradas: Tarea[] = service.buscarTareas("ejercicio", tareas);
encontradas.forEach(function (t) {
  console.log(service.mostrarTarea(t));
});

// ── ELIMINAR TAREA ───────────────────────────────────────────────────────────
console.log("\n=== ELIMINAR TAREA ID 5 ===");

tareas = service.eliminarTarea(5, tareas);
console.log("Tareas restantes:");
tareas.forEach(function (t) {
  console.log(service.mostrarTarea(t));
});
