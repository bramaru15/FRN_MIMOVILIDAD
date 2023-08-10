import { Component, OnInit } from '@angular/core';
import { buttonLink, dataCardTramite } from 'src/app/model/cardTramite';
import { HomeService } from 'src/app/core/service/home.service';
import { LoginService } from 'src/app/core/service/login.service';
import { SessionService } from 'src/app/core/service/session.service';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';
import { environment } from 'src/environments/environment'
import { persona } from 'src/app/model/persona';
import { CatalogoTipoDocumento } from 'src/app/core/constant/Catalogo';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-asesorias',
  templateUrl: './asesorias.component.html',
  styleUrls: ['./asesorias.component.sass']
})
export class AsesoriasComponent implements OnInit {

  token: string = '';

  proceso: boolean = true;

  persona: persona;

  listButton: buttonLink[] = []

  window: Window & typeof globalThis = window;

  isSession: boolean;

  constructor(
    private homeService: HomeService,private translocoService: TranslocoService,
    private sessionService: SessionService,
    //private router: Router,
    private loginService: LoginService,
  ) {
    this.persona = this.sessionService.getItemObject(SessionConstants.PERSON);
    if (this.sessionService.isSession()) {
      this.isSession = true;
    } else {
      this.isSession = false;
    }
    this.translocoService.selectTranslateObject('asesorias').subscribe(value => {

      this.listButton = [
        {
          name: value.servicioTaxi,
          link: "",
          linkVus:false,
          subText: value.subTextservicioTaxi,
          categoria: value.asesoriasyconsultas,
          tipo_tramite: value.servicioTaxis,
          styleWithText: '114%',
          btnList: this.isSession? [
            {
              btnText: value.consultar,
              btnVersion: "v1",
              link: "pages/taxis",
              direciona: false,
              accesibilidad: "Haz clic si quieres consultar por placa o tarjeta de control si un vehículo de servicio público, taxi, tiene los papeles al día para prestar su servicio."
            },
            /*{
              btnText: value.calificar,
              btnVersion: "v1",
              link: environment.direccionamiento.serviciosyconsulta.taxi.ver_mas,
              direciona: true
            },*/
            {
              btnText: value.verMas,
              btnVersion: "v1",
              link: environment.direccionamiento.serviciosyconsulta.taxi.ver_mas,
              direciona: true,
              accesibilidad: "Haz clic si quieres redirigirte a la página donde puedes conocer sobre el servicio de taxi en Bogotá"
            },
            
          ] : [
            {
              btnText: value.consultar,
              btnVersion: "v1",
              link: "pages/taxis",
              direciona: false,
              accesibilidad: "Haz clic si quieres consultar por placa o tarjeta de control si un vehículo de servicio público, taxi, tiene los papeles al día para prestar su servicio."
            },
            {
              btnText: value.verMas,
              btnVersion: "v1",
              link: environment.direccionamiento.serviciosyconsulta.taxi.ver_mas,
              direciona: true,
              accesibilidad: "Haz clic si quieres redirigirte a la página donde puedes conocer sobre el servicio de taxi en Bogotá"
            },
          ],
          linkIcon: "assets/icons/Taxi_icono.svg",
          direciona: false
        },
        {
          name: value.excepcionDiscapacidad,
          link: "",
          linkVus:false,
          styleWithText: '150%',
          categoria: value.asesoriasyconsultas,
          tipo_tramite: value.excepcionDiscapacidad,
          subText: value.picoyplacaText,
          btnList: [
            {
              btnText: value.consultar,
              btnVersion: "v1",
              link: "pages/exceptuado",
              direciona: false,
              accesibilidad: "Haz clic si quieres consultar por placa si el vehículo puede circular sin restricción en Bogotá"
            },
            
            {
              btnText: value.btnExcepcionDiscapacidad,
              btnVersion: "v1",
              link: environment.direccionamiento.serviciosyconsulta.exceptuados.por_discapacidad,
              direciona: true,
              accesibilidad: "Haz clic si quieres redirigirte a la página donde puedes realizar el registro para no tener restricción de circulación vial en Bogotá por discapacidad",
            },
            {
              btnText: value.verMas,
              btnVersion: "v1",
              link: environment.direccionamiento.serviciosyconsulta.exceptuados.ver_mas,
              direciona: true,
              accesibilidad: "Haz clic si quieres redirigirte a la página donde puedes conocer todo acerca del pico y placa de Bogotá"
            },
            {
              btnText: value.picoyplaca,
              btnVersion: "v1",
              link: this.isSession? (this.persona.idTipoIdentificacion?.toString() === CatalogoTipoDocumento.NIT)? environment.direccionamiento.serviciosyconsulta.exceptuados.pagar_picoyplacaJudicial : environment.direccionamiento.serviciosyconsulta.exceptuados.pagar_picoyplacaNatural : environment.direccionamiento.serviciosyconsulta.exceptuados.pagar_picoyplaca_anonimo,
              direciona: true,
              accesibilidad: "Haz clic si quieres redirigirte a la página donde puedes realizar el registro y pagar el pico y placa solidario",
            },
          ],
          linkIcon: "assets/icons/carro_icono.svg",
          direciona: false
        },
        {
          name: value.orientacionVictimas,
          link: environment.direccionamiento.serviciosyconsulta.orvi,
          linkVus:false,
          categoria: value.asesoriasyconsultas,
          styleWithText: '400%',
          tipo_tramite: "ORVI",
          subText: value.asesoriasyconsultasText,
          btnVersion: "v2",
          
          linkIcon: "",
          linkImg: "assets/images/3d/Logo_ORVI_vertical.png",
          direciona: true,
          btnList: [
            {
              btnText: value.accederOrvi,
              btnVersion: "v2",
              link: "https://www.movilidadbogota.gov.co/web/ORVI",
              direciona: true,
              accesibilidad: "Haz clic si quieres redirigirte a la página donde puedes conocer todo acerca del Centro de Orientación para víctimas por siniestros viales en Bogotá"
            },
          ]
        },
        /*,
        {
          name: "ORVI",
          link: "https://www.movilidadbogota.gov.co/web/ORVI",
          linkIcon: "assets/icons/orvi_icono.svg",
          direciona: true
        },*/
      ]
      this.proceso = false;

    });

  }


  ngOnInit(): void {
    this.token = this.sessionService.getItemInSession(SessionConstants.TOKEN) + '';

    // var that = this;
    // setTimeout(function(){
    //   that.proceso = false;
    // },1000);
  
  }

  
}
