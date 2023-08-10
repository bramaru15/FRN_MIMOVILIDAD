import {Rol} from "./Rol";

export class GeneralConstants {
  static readonly FINALIZADA = 'Finalizada';
  static readonly ASIGNADA = 'Asignada';
  static readonly REASIGNADA = 'Asignada';
  static readonly EXTERNALLY_TERMINATED = 'Eliminado';
  static readonly COMPLETED = 'Completado';
  static readonly CANCELLED = 'Cancelado';
  static readonly ACTIVO = 'Activo';
  static readonly ACTIVE = 'ACTIVE';
  static readonly REASSIGNED = 'REASSIGNED';
  static readonly IN_PROGRESS = 'IN_PROGRESS';
  static readonly BUSINESS_KEY = '{businessKey}';
  static readonly rolsOrganimso: string[] = [Rol.ORGANISMO_TRANSITO.toString(), Rol.SECRETARIO_ORGANISMO.toString(), Rol.EMPRESA_SERVICIO_PUBLICO.toString()];
  static readonly rolsTramite: string[] = [Rol.CLIENTE.toString(), Rol.REPRESENTANTE_CONCESIONARIO.toString(), Rol.EMPRESA_SERVICIO_PUBLICO.toString(), Rol.EMPRESA.toString()];
  static readonly rolsRepresentante: string[] = [Rol.EMPRESA_SERVICIO_PUBLICO.toString(), Rol.EMPRESA.toString(), Rol.EMPRESA_CONCESIONARIO.toString()];
  static readonly rolsBandeja: string[] = [Rol.CLIENTE.toString(), Rol.ORGANISMO_TRANSITO.toString()];
  static readonly rolsAnfitriones: string[] = [Rol.ANFITRION.toString(), Rol.ADMIN_AGENDAMIENTO.toString(), Rol.APOYO_AGENDAMIENTO.toString()];
}
