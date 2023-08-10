export interface Login {
    username: string;
    password: string;
}

export interface RespLogin {
  token: string;
  scope: number;
  email: string;
}

export interface Permisos {
  idUsuario: null;
  nombreUsuario: string;
  correoElectronico: string;
  referenciaPersona: number;
  tipoIdentificacionPersona: number;
  rol: RolDTO;
}

export interface RolDTO {
  idRol: number;
  nombre: string;
  recursoDTOs: RecursoDTO[];
}

export interface RecursoDTO {
  idRecurso: number;
  nombre: string;
  idTramiteDataBuilder: string;
  operacionDTOs: OperacionDTO[];
}

export interface OperacionDTO {
  idOperacion: number;
  nombre: string;
  accion: string;
  fechaCreacion: string;
}

export interface ResetPassword {
  password: string;
  token?: string;
  confirmationToken?: string;
}


export interface RecaptchaResponseBody {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  score: number;
  action: string;
}

export interface GestionarPersonaDTO {
  idPersona: number;
  idTipoIdentificacion: number;
  numeroIdentificacion: string;
  correoElectronico: string;
  nuevoCorreoElectronico: string;
  reenviar: boolean;
}
