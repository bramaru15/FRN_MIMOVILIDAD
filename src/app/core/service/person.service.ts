import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment'
import {map} from 'rxjs/operators';
import {GestionarPersonaDTO} from '../../model/login';
import {persona} from '../../model/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) {}

  static fixNames(persona: persona): persona {
    persona.fullName = [persona.nombre1, persona.nombre2, persona.apellido1,
      persona.apellido2, persona.nombreComercial].filter(Boolean).join(' ');
    return persona;
  }

  getPersonV2(token: string): Observable<any> {
    return this.http.get(environment.persona.consultarPersonaByIdV2, 
      {
        withCredentials: true, 
        observe: 'response', 
        headers: {
          'Access-Control-Allow-Credentials': 'true', 
          'Authorization': token,
          'Ocp-Apim-Subscription-Key': environment.keyApiManager
        }
      });
  }

  actualizarPersona(persona:persona,token:string){
    return this.http.post(environment.persona.actualizarPersona,persona,{
      withCredentials: true, 
        observe: 'response', 
        headers: {
          'Access-Control-Allow-Credentials': 'true', 
          'Authorization': token,
          'Ocp-Apim-Subscription-Key': environment.keyApiManager
        }
    })
  }
}
