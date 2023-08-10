import { Component, OnInit } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { DeviceDetectorService } from 'ngx-device-detector';
import { buttonLink, dataCardTramite } from 'src/app/model/cardTramite';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  styleUrls: ['./mapas.component.sass']
})
export class MapasComponent implements OnInit {

  proceso: boolean = true;
  listButton: buttonLink[] = [];
  listaMapas: buttonLink[] = [];
  constructor(private deviceService: DeviceDetectorService, private translocoService: TranslocoService,
    ){
    //console.log(this.deviceService.getDeviceInfo().os)
    this.translocoService.selectTranslateObject('mapas').subscribe(value => {
      this.listButton = [
        {
          name: value.planificaViaje,
          link:"",
          categoria: value.appRecomendadas,
          tipo_tramite: value.appsMoviles,
          subText: value.subText1,
          btnVersion: "v2",
          styleWithText: "300%",
          btnText: value.descargar,
          linkIcon: "",
          linkVus:false,
          linkImg: "assets/images/3d/Logo Transmilenio.jpg",
          direciona: true,
          btnList:[
            {
              btnText: value.descargar,
              btnVersion: "v2",
              link: this.deviceService.getDeviceInfo().os === 'Windows' || this.deviceService.getDeviceInfo().os === 'Android' || this.deviceService.getDeviceInfo().os === 'Linux'? environment.direccionamiento.apprecomendadas.planifica_tu_viaje.android : environment.direccionamiento.apprecomendadas.planifica_tu_viaje.iOS,
              direciona: true
            }
          ]
        },
        {
          name: value.temBici,
          categoria: value.appRecomendadas,
          link:"",
          tipo_tramite: value.appsMoviles,
          styleWithText: "300%",
          subText: value.subText2,
          btnVersion: "v1",
          btnText: value.descargar,
          linkIcon: "",
          linkVus:false,
          linkImg: "assets/images/3d/Logo tembici.jpg",
          direciona: true,
          btnList:[
            {
              btnText: value.descargar,
              btnVersion: "v1",
              link: this.deviceService.getDeviceInfo().os === 'Windows' || this.deviceService.getDeviceInfo().os === 'Android' || this.deviceService.getDeviceInfo().os === 'Linux'? environment.direccionamiento.apprecomendadas.temBici_Alquila_Bicicleta.android : environment.direccionamiento.apprecomendadas.temBici_Alquila_Bicicleta.iOS,
              direciona: true
            }
          ]
        }
      ]

      this.listaMapas = [
        {
          name: value.cicloRutas,
          link: "pages/mapas/visor/1",
          linkIcon: "assets/icons/bicicleta_icono.svg",
          linkVus:false,
          direciona: false,
          registroTablero: true,
          categoria: value.titulo,
          tipo_tramite: value.mapa,
          accesibilidad: "Haz clic para conocer las rutas exclusivas para bicicletas en Bogotá"
        },
        {
          name: value.cicloVias,
          link: "pages/mapas/visor/2",
          linkIcon: "assets/icons/ciclovia.svg",
          linkVus:false,
          direciona: false,
          registroTablero: true,
          categoria: value.titulo,
          tipo_tramite: value.mapa,
          accesibilidad: "Haz clic para conocer los corredores recreo-deportivos de la ciudad"
        },
        {
          name: value.cicloParqueaderos,
          link: "pages/mapas/visor/3",
          linkIcon: "assets/icons/cicloparquedero.svg",
          linkVus:false,
          direciona: false,
          registroTablero: true,
          categoria: value.titulo,
          tipo_tramite: value.mapa,
          accesibilidad: "Haz clic para conocer lugares donde puedes estacionar tu bicicleta en la ciudad de forma segura"
        },
        {
          name: value.parqueoPago,
          link: "pages/mapas/visor/4",
          linkIcon: "assets/icons/zona parqueadero.svg",
          linkVus:false,
          direciona: false,
          registroTablero: true,
          categoria: value.titulo,
          tipo_tramite: value.mapa,
          accesibilidad: "Haz clic para conocer las zonas autorizadas de estacionamiento en vía de Bogotá"
        },
        {
          name: value.incidentes,
          link: "pages/mapas/visor/5",
          linkIcon: "assets/icons/problemas via.svg",
          linkVus:false,
          direciona: false,
          registroTablero: true,
          categoria: value.titulo,
          tipo_tramite: value.mapa,
          accesibilidad: "Haz clic para conocer los incidentes reportados en las calles de Bogotá"
        },
        {
          name: value.obras,
          link: "pages/mapas/visor/6",
          linkIcon: "assets/icons/obra via.svg",
          linkVus:false,
          direciona: false,
          registroTablero: true,
          categoria: value.titulo,
          tipo_tramite: value.mapa,
          accesibilidad: "Haz clic para conocer los cierres viales por obras o eventos autorizados en Bogotá"
        },
      ]
    })
  }

  ngOnInit(): void {
    var that = this;
    setTimeout(function(){
      that.proceso = false;
    },1000);
  }

}
