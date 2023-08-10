import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { registroTablero } from 'src/app/model/tablero';
import { TipoReporte } from '../constant/Tableros';
import { DeviceDetectorService } from 'ngx-device-detector';

@Injectable({
    providedIn: 'root'
})
export class TableroService {

    constructor(private http: HttpClient, private deviceService: DeviceDetectorService) { }

    registroTablerov2(
        tipo: "tramite" | "instalacion" | "usuario" | "firma_electronica" | "notificacion_electronica" | "registro_usuario" | "recuperar_contrasena", 
        categoria: string, 
        tipoTramite: string, 
        tramite: string): Observable<any> {

        let registro: registroTablero = {
            tipo: tipo,
            categoria: categoria,
            tipoTramite: tipoTramite,
            tramite: tramite,
            dispositivo: this.deviceService.getDeviceInfo().deviceType,
            navegador: this.deviceService.getDeviceInfo().browser,
            so: this.deviceService.getDeviceInfo().os
        }
        
        let params = JSON.stringify(registro);
        return this.http.post(environment.tableros.registro, params, 
            { 
                withCredentials: false, 
                observe: 'response', 
                headers: { 
                    'Content-Type': 'application/json', 
                    'Access-Control-Allow-Credentials': 'true',
                    'Ocp-Apim-Subscription-Key': environment.keyApiManager 
                }
            });
    }

    registroTablero(any: registroTablero): Observable<any> {
        
        let params = JSON.stringify(any);
        return this.http.post(environment.tableros.registro, params, 
            { 
                withCredentials: false, 
                observe: 'response', 
                headers: { 
                    'Content-Type': 'application/json', 
                    'Access-Control-Allow-Credentials': 'true',
                    'Ocp-Apim-Subscription-Key': environment.keyApiManager 
                }
            });
    }

    graficasHome(fechaI: string, fechaF: string): Observable<any> {
        let body = {
            fechaInicio: fechaI,
            fechaFin: fechaF,
            tipo: [
                TipoReporte.INSTALACION,
                TipoReporte.FIRMA_ELECTRONICA,
                TipoReporte.NOTIFICACION_ELECTRONICA,
                TipoReporte.USUARIO],
            opcion: '1'
        }
        let params = JSON.stringify(body);
        return this.http.post(environment.tableros.graficasHome, params, 
            { 
                withCredentials: false, 
                observe: 'response', 
                headers: { 
                    'Content-Type': 'application/json', 
                    'Access-Control-Allow-Credentials': 'false',
                    'Ocp-Apim-Subscription-Key': environment.keyApiManager 
                }
            });
    }

    catalogo(catalogo: string, categoria: string[], opcion: number): Observable<any> {
        let body = {
            catalogo: catalogo,
            categoria: categoria,
            opcion: opcion
        }
        let params = JSON.stringify(body);
        return this.http.post(environment.tableros.catalogo, params, 
            { 
                withCredentials: false, 
                observe: 'response', 
                headers: { 
                    'Content-Type': 'application/json', 
                    'Access-Control-Allow-Credentials': 'true',
                    'Ocp-Apim-Subscription-Key': environment.keyApiManager 
                }
            });
    }

    graficaReporte(
        tipo: string, 
        categoria: string[], 
        tramite: string[], 
        dispositivo: string[], 
        navegador: string[], 
        SO: string[],
        fechaI: string, fechaF: string): Observable<any> {
            
        let body = {
            tipo: tipo,
            categoria: categoria,
            tramite: tramite,
            dispositivo: dispositivo,
            navegador: navegador,
            SO: SO,
            fechaInicio: fechaI,
            fechaFin: fechaF
        }
        let params = JSON.stringify(body);
        return this.http.post(environment.tableros.reporteGrafica, params, 
            { 
                withCredentials: false, 
                observe: 'response', 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'false',
                    'Ocp-Apim-Subscription-Key': environment.keyApiManager 
                }
            });
    }

    reporteArchivo(
        usuario: string,
        tipo: string, 
        categoria: string[], 
        tramite: string[], 
        dispositivo: string[], 
        navegador: string[], 
        SO: string[],
        fechaI: string, fechaF: string): Observable<any> {
            
        let body = {
            usuario: usuario,
            tipo: tipo,
            categoria: categoria,
            tramite: tramite,
            dispositivo: dispositivo,
            navegador: navegador,
            SO: SO,
            fechaInicio: fechaI,
            fechaFin: fechaF
        }
        let params = JSON.stringify(body);
        return this.http.post(environment.tableros.archivo, params, 
            { 
                withCredentials: false, 
                observe: 'response', 
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Credentials': 'false',
                    'Ocp-Apim-Subscription-Key': environment.keyApiManager 
                }
            });
    }


}