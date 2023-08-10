import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetalleConductoresTaxiComponent } from 'src/app/component/detalle-conductores-taxi/detalle-conductores-taxi.component';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { taxis } from 'src/app/model/taxis';
import { Observable } from 'rxjs';
import { DetalleExceptuadosComponent } from 'src/app/component/detalle-exceptuados/detalle-exceptuados.component';

@Injectable({
  providedIn: 'root'
})
export class DetalleTaxiService {
  constructor(public dialog: MatDialog, private http: HttpClient) { }

  openDialog(objetoSeleccionado: any) {
    this.dialog.open(DetalleConductoresTaxiComponent, {
      data: objetoSeleccionado,
      height: '75%'
    });
  }

  openDialogExceptuado(objetoSeleccionado: any) {
    this.dialog.open(DetalleExceptuadosComponent, {
      data: objetoSeleccionado,
      height: '75%'
    });
  }

  consultarPlaca(placa: string): Observable<any> {
    const params = new HttpParams()
      .set('text', placa);
    return this.http.get<taxis[]>(environment.consultarTaxisPlaca,{
      headers: {
        'Ocp-Apim-Subscription-Key': environment.keyApiManager
      }, params:params
    });
  }

  consultarTarjeta(tarjeta: string): Observable<any> {
    const params = new HttpParams()
      .set('text', tarjeta);
    return this.http.get<taxis[]>(environment.consultarTaxisTarjeta, {
      headers: {
        'Ocp-Apim-Subscription-Key': environment.keyApiManager
      }, params:params
    });
  }

  /*consultarExceptuado(placa: string): Observable<any> {
    return this.http.get<any[]>(environment.consultarExceptuado + placa, {
      headers: {
        'Ocp-Apim-Subscription-Key': environment.keyExceptuado
      },
    });
  }*/

  consultarExceptuado(placa: string): Observable<any> {
    let any = {
      placa: placa
    }

    let params = JSON.stringify(any);
    return this.http.get(environment.consultarExceptuado+"?placa="+placa,
      {
        observe: 'response',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': environment.keyApiManager
  }
      });
  }

}