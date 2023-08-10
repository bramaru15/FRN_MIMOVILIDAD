import { ObserversModule } from '@angular/cdk/observers';
import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { Languaje } from 'src/app/model/languaje';

@Injectable({
  providedIn: 'root'
})
export class LanguajeService {
  
  private lgnEnglish: Languaje = new Languaje('en','English');
  private lgnSpanish: Languaje = new Languaje('es','Español');

  constructor() { }

  getAllLanguajes(): Observable<Languaje[]>{
    const result: Observable<Languaje[]> = from([
      [
        this.lgnEnglish,
        this.lgnSpanish,
      ]
    ]);
    return result;
  }
  getDefaultLanguaje(): Languaje{
    return this.lgnEnglish;
  }
  getLanguajeByCode(code: string): Languaje{
    let result : any = null;

    if(code != null){
      result = (code ==='en')? this.lgnEnglish: this.lgnSpanish;
    }
    return result;
  }
  
}
