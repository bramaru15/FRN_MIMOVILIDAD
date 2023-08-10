
export interface persona {
  nombre1: string;
  nombre2: string;
  apellido1: string;
  apellido2: string;
  fechaNacimiento: string | null;
  fechaExpedicionDocumento: string | null;
  idCategoriaGenero?: string | null;
  idGenero: string | null;
  idGrupoSanguineo: string | null;
  idRh: string | null;
  numeroIdentificacion: string | null;
  numeroIdentificacion2: string | null;
  idTipoIdentificacion: number | null;
  idTipoUsuario: number | null;
  correoElectronico: string | null;
  correoElectronico2: string | null;
  telefonoMovil: string | null;
  telefonoMovil2: string | null;
  password: string | null;
  password2: string | null;
  check: boolean | null;
  fullName?: string | null;
  nombreComercial: string | null;
}

