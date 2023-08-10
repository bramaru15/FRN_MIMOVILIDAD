import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { DetalleTaxiService } from 'src/app/core/service/detalle.taxis.service';
import { SessionService } from 'src/app/core/service/session.service';
import { TableroService } from 'src/app/core/service/tablero.service';
import { buttonLink } from 'src/app/model/cardTramite';
import { taxis } from 'src/app/model/taxis';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-exceptuados',
  templateUrl: './exceptuados.component.html',
  styleUrls: ['./exceptuados.component.scss']
})
export class ExceptuadosComponent implements OnInit {
  
  proceso: boolean = true;
  tipoResiltado: 'placa' | 'tarjetaOperation' | 'exceptuado' = 'exceptuado'
  styleCustom: string = "width: 100% !important;"
  registerForm: FormGroup;
  placa: string = '';
  isConsulta: boolean = false;
  resultadoBusqueda: boolean = false;
  mostrarResultados: boolean = false;
  exceptuadoConsulta: any[] = [];
  listButton: buttonLink[] =[];

  constructor(
    private sessionService: SessionService,
    private fb: FormBuilder,
    private tableroService: TableroService,
    private serviceExceptuado: DetalleTaxiService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private translocoService: TranslocoService

  ) {
    this.translocoService.selectTranslateObject('exceptuados').subscribe(value => {
      this.listButton = [{
        name: value.vehiculosExceptuados,
        link:"",
        tamanoTitulo: 'h1',
        versionCardIcon:'v2',
        categoria: value.centroAyuda,
        tipo_tramite: value.asistente,
        subText: value.subText,
        btnVersion: "v2",
        styleWithText: "300%",
        linkIcon: "assets/icons/carro_icono.svg",
        linkVus:false,
        //linkImg: "",
        direciona: false
      }]
    });

    this.registerForm = this.fb.group({
      valor: [null, [Validators.required]],
    }
    );
  }

  ngOnInit(): void {
    var that = this;
    setTimeout(function () {
      that.proceso = false;
    }, 1000);
  }

  subConsulta() {
    this.tableroService.registroTablerov2('tramite', 'Asesorías y consultas', 'Vehículos exceptuados', 'Consultar').toPromise()
    this.placa = (this.registerForm.get('valor')?.value + "").toUpperCase();
    this.mostrarResultados = false;
    this.exceptuadoConsulta = [];
    this.isConsulta = true;
    this.serviceExceptuado.consultarExceptuado(this.placa).toPromise()
      .then((result) => {
        //console.log(result);
        if (result.body !== null && result.body.length > 0) {
          this.exceptuadoConsulta.push(result.body);
          this.resultadoBusqueda = true;
        } else {
          this.resultadoBusqueda = false;
        }
        this.isConsulta = false;
        this.mostrarResultados = true;
      })
      .catch((err) => {
        this.isConsulta = false;
        this.resultadoBusqueda = false;
        this.mostrarResultados = true;
        console.error(err)
      })
  }


  consultar() {
    if (!(navigator.onLine)) {
      this.sessionService.offline();
    } else {
      if (!(this.sessionService.isSession())) {
        this.recaptchaV3Service.execute('importantAction')
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
