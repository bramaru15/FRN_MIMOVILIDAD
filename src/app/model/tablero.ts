
export interface registroTablero {
    tipo: 'tramite' | 'instalacion' | 'usuario' | 'firma_electronica' | 'notificacion_electronica' | 'registro_usuario' | 'recuperar_contrasena';
    categoria: string;
    tipoTramite: string;
    tramite: string;
    dispositivo: string;
    navegador: string;
    so: string;
}

export interface buttonTableroHome {
    name: string;
    cantidad: number;
    link: string;
    linkIcon: string;
}