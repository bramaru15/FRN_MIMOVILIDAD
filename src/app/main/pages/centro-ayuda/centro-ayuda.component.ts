import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { buttonLink, dataCardTramite } from 'src/app/model/cardTramite';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-centro-ayuda',
  templateUrl: './centro-ayuda.component.html',
  styleUrls: ['./centro-ayuda.component.sass']
})
export class CentroAyudaComponent implements OnInit {

  proceso: boolean = true;
  listButton: buttonLink[] = []

  ngOnInit(): void {
    var that = this;
    setTimeout(function(){
      that.proceso = false;
    },1000);
  }

  environment: any = environment;

  constructor(private translocoService: TranslocoService,
  ) {
    this.translocoService.selectTranslateObject('centroAyuda').subscribe(value => {

      this.listButton = [
        {
          name: value.asesoraVirtual,
          link:"",
          categoria: value.centroAyuda,
          tipo_tramite: value.asistenteVirtual,
          subText: value.subText1,
          btnVersion: "v2",
          styleWithText: "300%",
          btnText: value.hablaLucia,
          linkIcon: "",
          linkVus:false,
          linkImg: "assets/images/3d/Lucia_Mesa de trabajo.png",
          direciona: true,
          btnList:[
            {
              btnText: value.hablaLucia,
              btnVersion: "v2",
              link: environment.direccionamiento.centroAyuda.lucia,
              direciona: true,
              accesibilidad: "Haz clic si quieres redirigirte a la página que explica el alcance de la asistente virtual (chatbot), Lucía."
            }
          ]
        },
        {
          name: value.orientacionVictimas,
          link: environment.direccionamiento.centroAyuda.orvi,
          categoria: value.centroAyuda,
          tipo_tramite: "ORVI",
          styleWithText: "300%",
          subText: value.subText2,
          btnVersion: "v1",
          btnText: value.chatea,
          linkIcon: "",
          linkVus:false,
          linkImg: "assets/images/3d/Logo_ORVI_vertical.png",
          direciona: true,
          btnList:[
            {
              btnText: value.chatea,
              btnVersion: "v1",
              link: environment.direccionamiento.centroAyuda.orvi,
              direciona: true,
              accesibilidad: "Haz clic si quieres redirigirte al WhastApp del Centro de Orientación para víctimas por siniestros viales en Bogotá"
            }
          ]
        }/*,
        {
          name: "ORVI",
          link: "https://www.movilidadbogota.gov.co/web/ORVI",
          linkIcon: "assets/icons/orvi_icono.svg",
          direciona: true
        },*/
      ]
    });

  }

  
}
