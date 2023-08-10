import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClient) { }

    numeroTramites(token: string): Observable<any> {
        let body = {
            businessKey: null,
            documentNumber: null,
            plateNumber: null,
            maxResults: 50
        }
        let params = JSON.stringify(body);
        //console.log ("numeroTramites.token:"+token);
        //console.log ("numeroTramites.keyApiManager:"+environment.keyApiManager);
        return this.http.post(environment.numeroTramites, params, 
            { 
                withCredentials: true, 
                observe: 'response', 
                headers: { 
                    'Content-Type': 'application/json', 
                    'Authorization': token, 
                    'Access-Control-Allow-Credentials': 'true',
                    'Ocp-Apim-Subscription-Key': environment.keyApiManager 
                }
            });
    }

    numeroCitas(token: string): Observable<any> {
        return this.http.get(environment.consultaCitas, 
            { 
                withCredentials: true, 
                observe: 'response', 
                headers: { 
                    'Authorization': token, 
                    'Access-Control-Allow-Credentials': 'true',
                    'Ocp-Apim-Subscription-Key': environment.keyApiManager 
                } 
            });
    }

    puntosAtencion(token:string):Observable<any>{
        return this.http.get(environment.puntosAtencion,
            {
                withCredentials: true, 
                observe: 'response', 
                headers: { 
                    'Authorization': token, 
                    'Access-Control-Allow-Credentials': 'true',
                    'Ocp-Apim-Subscription-Key': environment.keyApiManager 
                }
            });
    }

    comparendos(tipoDocumento:any,numeroDocumento:any,url:string):Observable<any>{
        let parametros = new HttpParams();
        parametros=parametros.append('tipoDocumento',tipoDocumento);
        parametros=parametros.append('numeroDocumento',numeroDocumento);

        return this.http.get(url,{
            withCredentials: false, 
                observe: 'response', 
                headers: { 
                    'Ocp-Apim-Subscription-Key': environment.keyApiManager
                },
                params:parametros
        })
    }
}