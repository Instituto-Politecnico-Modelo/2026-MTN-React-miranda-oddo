import type { Prioridad, Tarea } from "../interfaces/tarea.interface.js";
import { crearTarea } from "../models/tarea.js";
import { validarTarea } from "../utils/validaciones.js";

var nextId = 1;

function mostrarTarea(tarea: Tarea) {
  return `ID: ${tarea.id} | Título: ${tarea.titulo} | Descripción: ${tarea.descripcion} | Prioridad: ${tarea.prioridad} | Completada: ${tarea.completada}`;
}

function agregarTarea(titulo: string, descripcion: string, prioridad: Prioridad, tareas: Tarea[]): Tarea[] {
  var nuevaTarea = crearTarea(nextId, titulo, descripcion, prioridad);
  nextId = nextId + 1;
  tareas = [...tareas, nuevaTarea];
  return tareas;
}

function buscarPorId(id: number, tareas: Tarea[]): Tarea | undefined {
  var tarea = tareas.find(function (t) {
    return t.id == id;
  });
  return tarea;
}

function completarTarea(id: number, tareas: Tarea[]): Tarea[] {
  tareas = tareas.map(function (t) {
    return t.id == id ? { ...t, completada: true } : t;
  });
  return tareas;
}

function eliminarTarea(id: number, tareas: Tarea[]): Tarea[] {
  tareas = tareas.filter(function (t) {
    return t.id != id;
  });
  return tareas;
}

function actualizarTarea(tareaActualizada: Tarea, tareas: Tarea[]): Tarea[] {
  tareas = tareas.map(function (t) {
    return t.id == tareaActualizada.id ? { ...t, ...tareaActualizada } : t;
  });
  return tareas;
}

function actualizarPrioridad(id: number, nuevaPrioridad: Prioridad, tareas: Tarea[]): Tarea[] {
  tareas = tareas.map(function (t) {
    return t.id == id ? { ...t, prioridad: nuevaPrioridad } : t;
  });
  return tareas;
}

function duplicarTarea(id: number, tareas: Tarea[]): Tarea[] {
  var tareaOriginal = tareas.find(function (t) {
    return t.id == id;
  });
if (tareaOriginal == undefined) {
    return tareas;
  }
  var tareaCopia = crearTarea(nextId, tareaOriginal.titulo + " (copia)", tareaOriginal.descripcion, tareaOriginal.prioridad);
  nextId = nextId + 1;
  tareas = [...tareas, { ...tareaCopia }];
  return tareas;
}

function filtrarPorEstado(completada: boolean, tareas: Tarea[]): Tarea[] {
  var resultado = tareas.filter(function (t) {
    return t.completada == completada;
  });
  return resultado;
}

function filtrarPorPrioridad(prioridad: string, tareas: Tarea[]): Tarea[] {
  var resultado = tareas.filter(function (t) {
    return t.prioridad == prioridad;
  });
  return resultado;
}

function contarPorPrioridad(tareas: Tarea[]): { alta: number; media: number; baja: number } {
  var conteo = tareas.reduce(function (acumulador, t) {
    acumulador[t.prioridad] = acumulador[t.prioridad] + 1;
    return acumulador;
  }, { alta: 0, media: 0, baja: 0 } );

  return conteo;
}

function ordenarPorPrioridad(tareas: Tarea[]): Tarea[] {
  var orden = { alta: 1, media: 2, baja: 3 };
  var copia = [...tareas];

  copia.sort(function (a, b) {
    return orden[a.prioridad] - orden[b.prioridad];
  });

  return copia;
}

function buscarTareas(termino: string, tareas: Tarea[]): Tarea[] {
  var terminoMinusculas = termino.toLowerCase();

  var resultado = tareas.filter(function (t) {
    var tituloMinusculas = t.titulo.toLowerCase();
    var descripcionMinusculas = t.descripcion.toLowerCase();
    return tituloMinusculas.includes(terminoMinusculas) || descripcionMinusculas.includes(terminoMinusculas);
  });

  return resultado;
}


export {
  mostrarTarea,
  agregarTarea,
  buscarPorId,
  completarTarea,
  eliminarTarea,
  actualizarTarea,
  actualizarPrioridad,
  duplicarTarea,
  filtrarPorEstado,
  filtrarPorPrioridad,
  contarPorPrioridad,
  ordenarPorPrioridad,
  buscarTareas
};