import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {

  constructor(private http: HttpClient) { }

  parametro(tipoParametro: string, modulo: string): Observable<any> {
    let params = new HttpParams();
    params=params.append('tipoParametro',tipoParametro);
    params=params.append('modulo',modulo);
    return this.http.get<any[]>(environment.consultaParametro,{
      headers: {
        'Ocp-Apim-Subscription-Key': environment.keyApiManager
      }, params:params
    });
  }

  authSicon(username: string, password: string, url: string): Observable<any> {
    let body = {
      username: username,
      password: password
    }
    let params = JSON.stringify(body);
    return this.http.post(url,params,
      {
        observe: 'response',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': environment.keyApiManager
        }
      });
  }

  comparendoSicon(tipoDocumento: string, documento: string, url: string, token: string): Observable<any> {
    let body = {
      placa: "",
      tipoDocumento: tipoDocumento,
      documento: documento,
      horaIni: "",
      horaFin: "",
    }
    let params = JSON.stringify(body);
    return this.http.post(url,params,
      {
        observe: 'response',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': environment.keyApiManager,
          'Authorization':"Bearer "+token,
        }
      });
  }

  /**
   * 
   * @param tipoDocumento 
   * @param documento 
   * @param url 
   * @param token 
   * @returns 
   * 
   */
  inmovilizacionSicon(tipoDocumento: string, documento: string, url: string, token: string): Observable<any> {
    let body = {
      placa: "",
      tipoDocumento: tipoDocumento,
      documento: documento
    }
    let params = JSON.stringify(body);
    return this.http.post(url,params,
      {
        observe: 'response',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': environment.keyApiManager,
          'Authorization':"Bearer "+token,
        }
      });
  }

}
