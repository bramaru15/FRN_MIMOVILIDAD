import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirmaElectronicaService {

  constructor(private http: HttpClient) { }

  createSignature(contrasena: string, user: string) {
    let body = {
      userID: user,
      firma: contrasena
    }
    let params = JSON.stringify(body);
    return this.http.post(environment.firmaElectronica.crearFirma+user+"/requests",params,
      {
        observe: 'response',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Ocp-Apim-Subscription-Key': environment.keyApiManager
        }
      });
  }

  getSignature(user: string):Observable<any> {
    return this.http.get(environment.firmaElectronica.consultarfirma+user,
      {
        observe: 'response',
        headers: {
          'Ocp-Apim-Subscription-Key': environment.keyApiManager,
        }
      });
  }
}
