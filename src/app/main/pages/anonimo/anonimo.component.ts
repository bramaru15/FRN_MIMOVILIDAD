import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ParametroService } from 'src/app/core/service/parametro.service';
import { TranslocoService } from '@ngneat/transloco';
import { SessionService } from 'src/app/core/service/session.service';
import { buttonLink, dataCardHeader } from 'src/app/model/cardTramite';

@Component({
  selector: 'app-anonimo',
  templateUrl: './anonimo.component.html',
  styleUrls: ['./anonimo.component.scss']
})
export class AnonimoComponent {

  proceso: boolean = true;
  textCard: string = "";

  dataCardHeader: dataCardHeader = {
    title: "",
    text: "",
  }

  ngOnInit(): void {
    // var that = this;
    // setTimeout(function(){
    //   that.proceso = false;
    // },1000);
  }

  isSession: boolean;

  window: Window & typeof globalThis = window;

  linkComparendo: string = "/";

  constructor(
    private sessionService: SessionService,
    private translocoService: TranslocoService,
    private router: Router,
    private parametroService: ParametroService,
  ) {
    this.parametroService.parametro('parametro', 'comparendos').toPromise()
      .then(result => {
        //console.log(result);
        if(result.length > 0) {
          this.linkComparendo = result[0].valorParametro;
        }
        this.listBtnComparendo(this.linkComparendo)
      })
      .catch(err => {
        //console.error(err);
        this.listBtnComparendo(this.linkComparendo)
      });
    if (this.sessionService.isSession()) {
      this.isSession = true;
    } else {
      this.isSession = false;
    }
  }
  listaMapas: buttonLink[] =  [];

  listButton: buttonLink[] = [];

  listBtnComparendo(link:string){
    this.translocoService.selectTranslateObject('anonimo').subscribe(value => {

      this.dataCardHeader = {
        title: value.title,
        text: value.text,
      }

      this.textCard = value.text;
      this.listaMapas = [
    
        {
          
          name: value.inmovilizaciones,
          link: "/pages/inmovilizaciones/consulta-vehiculos",
          linkIcon: "assets/icons/Inmovilizaciones_icono.svg",
          linkVus:false,
          direciona: false,
          registroTablero: false,
          categoria: "",
          tipo_tramite: "",
          accesibilidad: "Haz clic si quieres consultar por placa si el vehículo fue inmovilizado y trasladado a los patios autorizados de Bogotá"
        },
        {
          name: value.comparendos,
          link: link,
          linkIcon: "assets/icons/Comparendos_icono _home.svg",
          linkVus:false,
          direciona: true,
          registroTablero: false,
          categoria: "",
          tipo_tramite: "",
          accesibilidad: "Haz clic si quieres redirigirte a la opción donde puedes consultar por identificación o placa si tienes comparendos impuestos en Bogotá y pagar sus multas"
        },
        {
          name: value.exceptuados,
          link: "pages/exceptuado",
          linkIcon: "assets/icons/Vehículos_icono-01.svg",
          linkVus:false,
          direciona: false,
          registroTablero: false,
          categoria: "",
          tipo_tramite: "",
          accesibilidad: "Haz clic si quieres consultar por placa si el vehículo puede circular sin restricción en Bogotá"
        },
        {
          name: value.taxis,
          link: "pages/taxis",
          linkIcon: "assets/icons/Taxi_icono.svg",
          linkVus:false,
          direciona: false,
          registroTablero: false,
          categoria: "",
          tipo_tramite: "",
          accesibilidad: "Haz clic si quieres consultar por placa o tarjeta de control si un vehículo de servicio público, taxi, tiene los papeles al día para prestar su servicio"
        },
        {
          name: value.picoyplaca,
          link: "https://picoyplacasolidario.movilidadbogota.gov.co/PortalCiudadano/#/registro/seleccionarPersona",
          linkIcon: "assets/icons/Icono_tipo_tramite_matricula.svg",
          linkVus:false,
          direciona: true,
          registroTablero: false,
          categoria: "",
          tipo_tramite: "",
          accesibilidad: "Haz clic si quieres redirigirte a la página donde puedes realizar el registro y pagar el pico y placa solidario"
        },
        {
          name: value.excepcionDiscapacitados,
          link: "https://www.movilidadbogota.gov.co/web/SIMUR/excepciones/login/",
          linkIcon: "assets/icons/Actores viales_icono-01.svg",
          linkVus:false,
          direciona: true,
          registroTablero: false,
          categoria: "",
          tipo_tramite: "",
          accesibilidad: "Haz clic si quieres redirigirte a la página donde puedes realizar el registro para no tener restricción de circulación vial en Bogotá por discapacidad"
        }
      ]
      this.listButton = this.isSession? [
        {
          name: value.app,
          link: "/pages/apps",
          subText: value.apptext,
          btnText: value.appBtn,
          styleWithText: "350%",
          direciona: false,
          linkIcon: "",
          linkVus:false,
          btnList:[
            {
              btnText:value.appBtn,
              btnVersion: "v1",
              link: "/pages/apps",
              direciona: false,
              accesibilidad: "Hac clic para conocer las aplicaciones recomendadas para tu dispositivo móvil"
            }
          ]
        }
      ] : [
        {
          name: value.masServicios,
          link: "/signup",
          subText: value.masServiciosText,
          btnText: value.registrate,
          styleWithText: "350%",
          direciona: false,
          linkIcon: "",
          linkVus:false,
          btnList:[
            {
              btnText: value.registrate,
              btnVersion: "v2",
              link: "/signup",
              direciona: false,
              accesibilidad: "Haz clic para crear tu cuenta personal y acceder a otros servicios"
            }
          ]
        },
        {
          name: value.app,
          link: "/pages/apps",
          subText: value.apptext,
          btnText: value.appBtn,
          styleWithText: "350%",
          direciona: false,
          linkIcon: "",
          linkVus:false,
          btnList:[
            {
              btnText: value.appBtn,
              btnVersion: "v1",
              link: "/pages/apps",
              direciona: false,
              accesibilidad: "Hac clic para conocer las aplicaciones recomendadas para tu dispositivo móvil"
            }
          ]
        }
      ]
      //console.log(this.textCard)
      this.proceso = false;
    })
  }

}
