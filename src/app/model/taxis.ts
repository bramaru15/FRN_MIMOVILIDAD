import { conductor } from "./conductor";

export interface taxis {
    id: string,
    numeroTarjetaControl: string,
    fechaExpedicion: number,
    fechaValidez: number,
    fechaVigencia: number,
    placa: string,
    idConductor: number,
    conductorDTO: conductor;
    tarjetaControlEstado: number,
    tipoTelFijo: boolean,
    idFactorCalidad: number,
    factorCalidad: false,
    idMetodoCobro: number,
    idTipoServicio: number,
    fechaVencimientoSoat: number,
    nroSOAT: number,
    fechaVencimientoRtm: number,
    nroRTM: number,
    nroTarjetaOperacion: number,
    fechaVencimientoTO: number,
    eps: string,
    nombreEmpresa: string,
    nitEmpresa: number,
    arl: string,
    tipoSangre: string,
    foto: string,
    nombreMetodoCobro: string
}