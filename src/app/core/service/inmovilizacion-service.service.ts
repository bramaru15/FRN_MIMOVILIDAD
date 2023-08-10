import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InmovilizacionServiceService {

  constructor(private http: HttpClient, private sessionService: SessionService, private router: Router) { }

  consultarVehiculoInmo(token:string,placa:any){
    return this.http.post(environment.direccionamiento.inmovilizaciones.consultaVehiculos,placa,{
      //withCredentials: true, 
        observe: 'response', 
        headers: {
          'Authorization':"Bearer "+token,
          'Ocp-Apim-Subscription-Key': environment.keyApiManager,
          'Content-Type':'application/json'
        }
    })
  }
}
