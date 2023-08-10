import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/core/service/home.service';
import { LoginService } from 'src/app/core/service/login.service';
import { SessionService } from 'src/app/core/service/session.service';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogoTipoDocumento } from 'src/app/core/constant/Catalogo';
import { DetalleConductoresTaxiComponent } from 'src/app/component/detalle-conductores-taxi/detalle-conductores-taxi.component';
import { DetalleTaxiService } from 'src/app/core/service/detalle.taxis.service';
import { conductor } from 'src/app/model/conductor';
import { taxis } from 'src/app/model/taxis';
import { registroTablero } from 'src/app/model/tablero';
import { TipoReporte } from 'src/app/core/constant/Tableros';
import { DeviceDetectorService } from 'ngx-device-detector';
import { TableroService } from 'src/app/core/service/tablero.service';
import { buttonLink } from 'src/app/model/cardTramite';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-taxis',
  templateUrl: './taxis.component.html',
  styleUrls: ['./taxis.component.scss']
})
export class TaxisComponent implements OnInit {

  registerForm: FormGroup;
  tipoResiltado: 'placa' | 'tarjetaOperation' | 'exceptuado' = 'placa'
  token: string = '';
  placa: string = '';
  placaOT: string = '';
  tarjetaControl: string = '';
  proceso: boolean = true;
  title: string = '';
  icono: string = '';
  listTaxistas: taxis[] = [];
  listadoConductores: any[] = [];
  styleCustom: string = "width: 100% !important;"
  mostrarResultados: boolean = false;
  isConsulta: boolean = false;
  resultadoBusqueda: boolean = false;
  condcutores: any[] = [];
  deviceInfo: any;
  listButton: buttonLink[] = [];
  seleccione: string ="";


  constructor(
    private sessionService: SessionService,
    private detalleInformacionConductor: DetalleTaxiService,
    private fb: FormBuilder,
    private deviceService: DeviceDetectorService,
    private tableroService: TableroService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private translocoService: TranslocoService
  ) {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.registerForm = this.fb.group({
      selectedTipoConsulta: [null, [Validators.required]],
      valor: [null, [Validators.required]],
    }
    );
    this.translocoService.selectTranslateObject('taxis').subscribe(value => {
      this.listButton = [{
      name: value.titulo,
      link:"",
      linkVus:false,
      versionCardIcon:'v2',
      tamanoTitulo: 'h1',
      categoria: value.categoria,
      tipo_tramite: value.asistente,
      subText: value.subText,
      styleWithText: "100%",
      linkIcon: "assets/icons/Taxi_icono.svg",
      //linkImg: "",
      direciona: false
    }]
    })
    
  }



  ngOnInit(): void {
    var that = this;
    setTimeout(function () {
      that.proceso = false;
    }, 1000);
    this.token = this.sessionService.getItemInSession(SessionConstants.TOKEN) + '';
  }

  tablero(): void {
    let registro: registroTablero = {
      tipo: TipoReporte.TRAMITE,
      categoria: 'Asesorías y consultas',
      tipoTramite: 'Consulta de Taxis',
      tramite: 'Consultar',
      dispositivo: this.deviceInfo.deviceType,
      navegador: this.deviceInfo.browser,
      so: this.deviceInfo.os
    }
    this.tableroService.registroTablero(registro).toPromise()
      .then(result => {
      })
      .catch(err => {
        console.error(err)
      })
  }

  subConsulta() {
    this.placa = (this.registerForm.get('valor')?.value + "").toUpperCase();
    this.tablero();
    this.placaOT = this.placa
    this.mostrarResultados = false;
    this.listTaxistas = [];
    this.isConsulta = true;
    this.translocoService.selectTranslateObject('taxis').subscribe(value => {
      this.seleccione = value.selecciona

      if (this.registerForm.get('selectedTipoConsulta')?.value == 'placa') {
        this.title = value.vehiculoPlaca
        this.icono = "assets/icons/Icono_tipo_tramite_matricula.svg"
        this.detalleInformacionConductor.consultarPlaca(this.placa).toPromise()
          .then((result) => {
            this.tipoResiltado = 'placa';
            this.isConsulta = false;
            if (result != null) {
              this.listTaxistas = result;
              this.resultadoBusqueda = true;
              this.placa = this.listTaxistas[0].placa;
              this.mostrarResultados = true;
            } else {
              this.resultadoBusqueda = false;
              this.mostrarResultados = true;
            }
          })
          .catch((err) => {
            console.error(err)
            this.isConsulta = false;
            this.tipoResiltado = 'placa';
            this.resultadoBusqueda = false;
            this.mostrarResultados = true;
          });
      }
      if (this.registerForm.get('selectedTipoConsulta')?.value == 'tarjeta') {
        this.title = value.tarjetaControl
        this.icono = "assets/icons/expedir licencia.svg"
        this.detalleInformacionConductor.consultarTarjeta(this.placa).toPromise()
          .then((result) => {
            this.tipoResiltado = 'tarjetaOperation';
            this.isConsulta = false;
            if (result != null) {
              this.listTaxistas.push(result);
              this.placa = this.listTaxistas[0].placa;
              this.mostrarResultados = true;
              this.resultadoBusqueda = true;
            } else {
              this.resultadoBusqueda = false;
              this.mostrarResultados = true;
            }
          })
          .catch((err) => {
            console.error(err)
            this.isConsulta = false;
            this.tipoResiltado = 'tarjetaOperation';
            this.resultadoBusqueda = false;
            this.mostrarResultados = true;
          });
      }
    });


  }

  consultar() {
    if (!(navigator.onLine)) {
      this.sessionService.offline();
    } else {
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

}


