/**
 * Tipo literal que restringe los valores posibles de prioridad a tres niveles.
 * Al usar un union type ("alta" | "media" | "baja") en vez de string,
 * TypeScript nos avisa en tiempo de compilación si escribimos mal un valor,
 * evitando errores que solo veríamos en ejecución.
 */
export type Prioridad = "alta" | "media" | "baja";

/**
 * Tipo literal para el filtro de estado de las tareas.
 * - "todas": muestra todas las tareas sin importar su estado.
 * - "pendientes": muestra únicamente las tareas que aún no fueron completadas.
 * - "completadas": muestra únicamente las tareas ya finalizadas.
 * Se usa como valor del estado `filtroEstado` en App.tsx para decidir
 * qué subconjunto de tareas se renderiza en la lista.
 */
export type FiltroEstado = "todas" | "pendientes" | "completadas";

/**
 * Tipo literal para el criterio de ordenamiento por prioridad.
 * - "ninguno": mantiene el orden original de creación (por id).
 * - "alta-primero": ordena de mayor a menor importancia (alta → media → baja).
 * - "baja-primero": ordena de menor a mayor importancia (baja → media → alta).
 * Se usa junto con el mapa `pesoPrioridad` en App.tsx para comparar
 * numéricamente las prioridades al ordenar el array.
 */
export type OrdenPrioridad = "ninguno" | "alta-primero" | "baja-primero";

/**
 * Interfaz principal que define la estructura de cada tarea en la aplicación.
 * Todos los componentes que manejan tareas (formulario, lista, card) trabajan
 * con este contrato, lo que garantiza consistencia de datos en toda la app.
 */
export interface Tarea {
  id: number;           // Identificador único auto-incremental asignado al crear la tarea
  titulo: string;       // Texto principal de la tarea (obligatorio)
  descripcion: string;  // Texto complementario (opcional, puede ser string vacío "")
  prioridad: Prioridad; // Nivel de urgencia, restringido por el type Prioridad
  completada: boolean;  // true si la tarea ya fue finalizada, false si está pendiente
}
