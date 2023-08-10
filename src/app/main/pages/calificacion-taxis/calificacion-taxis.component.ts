import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DetalleTaxiService } from 'src/app/core/service/detalle.taxis.service';
import { SessionService } from 'src/app/core/service/session.service';
import { TableroService } from 'src/app/core/service/tablero.service';
import { RatingModule } from 'primeng/rating';

@Component({
  selector: 'app-calificacion-taxis',
  templateUrl: './calificacion-taxis.component.html',
  styleUrls: ['./calificacion-taxis.component.scss']
})
export class CalificacionTaxisComponent {

  proceso: boolean = false;
  styleCustom: string = "width: 100% !important;"
  registerForm: FormGroup;
  val: number = 3;

  constructor(    private sessionService: SessionService,
    private detalleInformacionConductor: DetalleTaxiService,
    private fb: FormBuilder,
    private deviceService: DeviceDetectorService,
    private tableroService: TableroService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private translocoService: TranslocoService,
    ){

      this.registerForm = this.fb.group({
        selectedTipoConsulta: [null, [Validators.required]],
        valor: [null, [Validators.required]],
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
            //this.subConsulta();
          });
      } else {
        //this.subConsulta();
      }
    }
  }
}
