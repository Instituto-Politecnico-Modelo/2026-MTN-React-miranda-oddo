export function validarTarea(tarea: any) {
  var errores = [];

  if (tarea.titulo == undefined || tarea.titulo == "") {
    errores.push("El título es obligatorio");
  }

  if (tarea.descripcion == undefined || tarea.descripcion == "") {
    errores.push("La descripción es obligatoria");
  }

  if (tarea.prioridad != "alta" && tarea.prioridad != "media" && tarea.prioridad != "baja") {
    errores.push("La prioridad debe ser alta, media o baja");
  }

  if (tarea.id == undefined) {
    errores.push("El id es obligatorio");
  }

  var esValida = errores.length == 0;

  return { esValida: esValida, errores: errores };
}
