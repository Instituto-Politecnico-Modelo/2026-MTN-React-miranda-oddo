export interface Tarea {
    id: number;
    titulo: string;
    descripcion: string;
    prioridad: Prioridad;
    completada: boolean;
    fechaCreacion: Date;
}

export type Prioridad = "alta" | "media" | "baja";