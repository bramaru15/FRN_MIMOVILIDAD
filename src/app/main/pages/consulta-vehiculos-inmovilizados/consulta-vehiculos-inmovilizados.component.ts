import { Component, ChangeDetectorRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';
import { InmovilizacionServiceService } from 'src/app/core/service/inmovilizacion-service.service';
import { LoginService } from 'src/app/core/service/login.service';
import { SessionService } from 'src/app/core/service/session.service';
import { TableroService } from 'src/app/core/service/tablero.service';
import { buttonLink } from 'src/app/model/cardTramite';
import { ReCaptchaV3Service } from 'ng-recaptcha';


@Component({
  selector: 'app-consulta-vehiculos-inmovilizados',
  templateUrl: './consulta-vehiculos-inmovilizados.component.html',
  styleUrls: ['./consulta-vehiculos-inmovilizados.component.scss']
})
export class ConsultaVehiculosInmovilizadosComponent {
  proceso: boolean = true;
  placaVehiculo: string = "";
  resultadoBusqueda: boolean = false;
  mostrarTarjeta: boolean = false
  listButton: buttonLink[] = [];
  safehtmlStr: SafeHtml = "";
  registerForm: FormGroup;
  styleCustom: string = "width: 100% !important;"
  isConsulta: boolean = false;
  comparendos: string = "";
  mensajeBusqueda: string = "";

  tipoResiltado: 'inmovilizacion' | 'inmovilizacion' = 'inmovilizacion'
  
  ngOnInit(): void {
    this.safehtmlStr = this.sanitizer.bypassSecurityTrustHtml('aslgo');
  }

  @HostListener('window:offline', ['$event'])
  onOfflineEvent(event: Event) {
    // Aquí puedes realizar la acción que desees cuando el usuario queda sin conexión
    this.sessionService.offlineRoot();
  }

  constructor(
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef,
    private inmovilizacionService: InmovilizacionServiceService,
    private sessionService: SessionService,
    private tableroService: TableroService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private translocoService: TranslocoService,
    private loginService: LoginService) {

    this.registerForm = this.fb.group({
      valor: [null, [Validators.required]],
    }
    );

    this.translocoService.selectTranslateObject('consultaVehiculos').subscribe(value => {
      this.listButton = [
        {
          name: value.vehiculosInmobilizados,
          link: "",
          subText: value.subText,
          categoria: value.asesoriasyconsultas,
          tipo_tramite: value.servicioTaxis,
          styleWithText: '150%',
          versionCardIcon: 'v2',
          btnList: [],
          tamanoTitulo: 'h1',
          linkIcon: "assets/icons/Interna Vehículos inmovilizados.svg",
          linkVus: false,
          direciona: false
        }
      ]
    });

    if (!(navigator.onLine)) {
      this.sessionService.offlineRoot();
    } else {

      let logincmovil = {
        "usuario": "SDMUsuario",
        "password": "Secret@riaM0v1l1d@d"
      }
      this.loginService.loginCMovil(logincmovil).toPromise().then((tokenCmovil) => {
        ////console.log("TOKENS");
        let data = tokenCmovil;
        ////console.log(data);
        this.sessionService.setItemInSession(SessionConstants.TOKENCMOVIL, tokenCmovil);
        this.sessionService.setItemLocal(SessionConstants.TOKENCMOVIL, tokenCmovil);
        this.proceso = false;
      }).catch(errr => {
        //console.log(errr);
        this.sessionService.setItemInSession(SessionConstants.TOKENCMOVIL, errr.error.text);
        this.proceso = false;
      });
    }
  }

  subConsulta() {
    this.isConsulta = true;
    this.mostrarTarjeta = false;
    this.mensajeBusqueda = "";
    this.placaVehiculo = (this.registerForm.get('valor')?.value + "").toUpperCase();
    let placa = {
      "placa": this.registerForm.get("valor")?.value
    }
    this.tableroService.registroTablerov2('tramite', 'Inmovilizaciones', 'Vehículos inmovilizados', 'Consultar').toPromise();

    let token = this.sessionService.getItemInSession(SessionConstants.TOKENCMOVIL) + '';

    this.inmovilizacionService.consultarVehiculoInmo(token, placa).toPromise().then(async (result) => {
      //let data=result?.body;
      let data: any = result?.body;
      //console.log(data);
      this.translocoService.selectTranslateObject('consultaVehiculos').subscribe(value => {
        if (data.respuesta.estado === "SI") {
          this.tipoResiltado = 'inmovilizacion';
          this.resultadoBusqueda = true;
          this.mostrarTarjeta = true;
          let listaComparendos: any[] = data.respuesta.comparendos;
          let comp: any[] = [];
          this.isConsulta = false;
          this.comparendos = '';
          for (var i = 0; i < listaComparendos.length; i++) {
            this.comparendos = this.comparendos + listaComparendos[i].infraccion + ", ";
          }
          this.comparendos = this.comparendos.substring(0, this.comparendos.length - 2);
          this.mensajeBusqueda = value.mensajeBusqueda1 + ' ' + data.respuesta.fechaInmovilizacion + ' ' + value.mensajeBusqueda2 + ' ' + this.comparendos + ' ' + value.mensajeBusqueda3 + ' '
        } else {
          //this.mensajeBusqueda = value.mensajeBusqueda1 + data.respuesta.fechaInmovilizacion + value.mensajeBusqueda2 + this.comparendos + value.mensajeBusqueda3
          this.resultadoBusqueda = false;
          this.tipoResiltado = 'inmovilizacion';
          this.mostrarTarjeta = true;
          this.isConsulta = false;
          //this.mensajeBusqueda="El vehículo de placa "+this.placaVehiculo+" no se encuentra inmovilizado en el patio  Álamos TRANSV.93 # 53-35"
        }
      })

      //console.log(this.tipoResiltado)
      //console.log(this.mensajeBusqueda)
    }).catch(errr => {
      //console.log(errr);
      this.isConsulta = false;
      this.resultadoBusqueda = false;
      this.mostrarTarjeta = true;
    });
  }

  consultaVehiculo() {
    if (!(this.sessionService.isSession())) {
      this.reCaptchaV3Service.execute('importantAction')
        .subscribe((token: string) => {
          console.debug(`Token [${token}] generated`);
          this.subConsulta();
        });
    } else {
      this.subConsulta();
    }
  }
}
