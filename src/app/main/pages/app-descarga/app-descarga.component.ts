import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { DeviceDetectorService } from 'ngx-device-detector';
import { buttonLink, dataCardTramite } from 'src/app/model/cardTramite';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-app-descarga',
  templateUrl: './app-descarga.component.html',
  styleUrls: ['./app-descarga.component.sass']
})
export class AppDescargaComponent implements OnInit {

  proceso: boolean = true;
  listButton: buttonLink[] = [];

  constructor(private deviceService: DeviceDetectorService,private translocoService: TranslocoService,){
    //console.log(this.deviceService.getDeviceInfo().os)

    this.translocoService.selectTranslateObject('appDescarga').subscribe(value => {
      this.listButton = [
        {
          name: value.planificaViaje,
          link:"",
          linkVus:false,
          categoria: "Apps Recomendadas",
          tipo_tramite: "TransMiApp",
          subText: value.planificaViajeText,
          btnVersion: "v2",
          styleWithText: "300%",
          btnText: value.descargar,
          linkIcon: "",
          linkImg: "assets/images/3d/Logo Transmilenio.jpg",
          direciona: true,
          btnList:[
            {
              btnText: value.descargar,
              btnVersion: "v2",
              link: this.deviceService.getDeviceInfo().os === 'Windows' || this.deviceService.getDeviceInfo().os === 'Android' || this.deviceService.getDeviceInfo().os === 'Linux'? environment.direccionamiento.apprecomendadas.planifica_tu_viaje.android : environment.direccionamiento.apprecomendadas.planifica_tu_viaje.iOS,
              direciona: true,
              nameTablero: "Descargar ahora",
              accesibilidad: "Haz clic si quieres redirigirte a la tienda donde podrás instalar la aplicación de Transmilenio y el Sistema Integrado de Transporte Público de la ciudad, TransmiApp."
            }
          ]
        },
        {
          name: value.bici,
          categoria: "Apps Recomendadas",
          link:"",
          linkVus:false,
          tipo_tramite: "TemBici",
          styleWithText: "300%",
          subText: value.temBiciText,
          btnVersion: "v1",
          btnText: value.descargar,
          linkIcon: "",
          linkImg: "assets/images/3d/Logo tembici.jpg",
          direciona: true,
          btnList:[
            {
              btnText: value.descargar,
              btnVersion: "v1",
              link: this.deviceService.getDeviceInfo().os === 'Windows' || this.deviceService.getDeviceInfo().os === 'Android' || this.deviceService.getDeviceInfo().os === 'Linux'? environment.direccionamiento.apprecomendadas.temBici_Alquila_Bicicleta.android : environment.direccionamiento.apprecomendadas.temBici_Alquila_Bicicleta.iOS,
              direciona: true,
              nameTablero: "Descargar ahora",
              accesibilidad: "Haz clic si quieres redirigirte a la tienda donde podrás instalar la aplicación que permite alquilar una bicicleta en la ciudad, TemBici."
            }
          ]
        }
      ]
    });
  }

  ngOnInit(): void {
    var that = this;
    setTimeout(function(){
      that.proceso = false;
    },1000);
  }

  environment: any = environment;

  

}
