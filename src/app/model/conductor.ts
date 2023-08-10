import { personaTaxi } from "./personaTaxi";

export interface conductor {
    id: number,
    grupoSanguineo: string,
    factorRh: string,
    idEps: number,
    idArl: number,
    idAfp: number,
    uriFoto: string,
    foto: string,
    persona:personaTaxi
}