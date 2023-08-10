import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';
import { SessionService } from 'src/app/core/service/session.service';
import { buttonLink } from 'src/app/model/cardTramite';
import { persona } from 'src/app/model/persona';
import { environment } from 'src/environments/environment';
import { PersonService } from 'src/app/core/service/person.service';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-notificacion-electro',
  templateUrl: './notificacion-electro.component.html',
  styleUrls: ['./notificacion-electro.component.scss']
})
export class NotificacionElectroComponent {
  proceso: boolean = false;

  persona: persona

  registerForm: FormGroup;
  isConsulta: boolean = false;
  styleCustom: string = "width: 100% !important;"
  listButton: buttonLink[] = [];
  cardText: string ="";
  cardText2: string = "";


  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private personService: PersonService,
    private translocoService: TranslocoService

  ) {
    this.translocoService.selectTranslateObject('notificacionElectro').subscribe(value => {
      this.cardText = value.cardText
      this.cardText2 = value.cardText2
      this.listButton = [
        {
          name: value.actualizacion,
          link: '/pages/mi-perfil',
          linkIcon: "assets/icons/Actualización de datos_icono.svg",
          linkVus:false,
          direciona: false
        }/*,
        {
          name: value.comoAutorizar,
          link: environment.direccionamiento.notificacionElectronica.comohacerlanotificacion,
          linkIcon: "assets/icons/Como_agendar_cita_icono-01.svg",
          linkVus:false,
          direciona: true,
          categoria: value.notificacion,
          tipo_tramite: value.opciones,
        },*/
      ]
    });

    this.persona = this.sessionService.getItemObject(SessionConstants.PERSON);
    ////console.log(this.persona);
    this.registerForm = this.fb.group({
      email: [this.persona.correoElectronico, [Validators.required]],
    }
    );
  }

  consultar() {

  }
}
