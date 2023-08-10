import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../layout/layout-principal/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { pagesRouting } from './pages.routing';
import { SidebarComponent } from '../../layout/layout-principal/sidebar/sidebar.component';
import { PrimengModule } from 'src/app/UI/primeng/primeng.module';
import { MaterialModule } from 'src/app/UI/material/material.module';
import {IconsModule} from '../../UI/icons/icons.module';
import { HomeComponent } from './home/home.component';
import { TramitesComponent } from './tramites/tramites.component';
import { ComponentModule } from '../../component/component.module';
import { MisCitasComponent } from './mis-citas/mis-citas.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { ActoresVialesComponent } from './actores-viales/actores-viales.component';
import { ServiciosPublicosComponent } from './servicios-publicos/servicios-publicos.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { ComparendosComponent } from './comparendos/comparendos.component';
import { InmovilizacionComponent } from './inmovilizacion/inmovilizacion.component';
import { CentroAyudaComponent } from './centro-ayuda/centro-ayuda.component';
import { AsesoriasComponent } from './asesorias/asesorias.component';
import { MapasComponent } from './mapas/mapas.component';
import { TaxisComponent } from './taxis/taxis.component';
import { VisorComponent } from './visor/visor.component';
import { ExceptuadosComponent } from './exceptuados/exceptuados.component';
import { ConsultaVehiculosInmovilizadosComponent } from './consulta-vehiculos-inmovilizados/consulta-vehiculos-inmovilizados.component';
import { FirmaElectronicaComponent } from './firma-electronica/firma-electronica.component';
import { NotificacionElectroComponent } from './notificacion-electro/notificacion-electro.component';
import { AppDescargaComponent } from './app-descarga/app-descarga.component';
import { AnonimoComponent } from './anonimo/anonimo.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import { TranslocoModule } from '@ngneat/transloco';
import { CalificacionTaxisComponent } from './calificacion-taxis/calificacion-taxis.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    HomeComponent,
    TramitesComponent,
    MisCitasComponent,
    VehiculosComponent,
    ActoresVialesComponent,
    ServiciosPublicosComponent,
    MiPerfilComponent,
    ComparendosComponent,
    InmovilizacionComponent,
    CentroAyudaComponent,
    AsesoriasComponent,
    MapasComponent,
    TaxisComponent,
    VisorComponent,
    ExceptuadosComponent,
    ConsultaVehiculosInmovilizadosComponent,
    FirmaElectronicaComponent,
    NotificacionElectroComponent,
    AppDescargaComponent,
    AnonimoComponent,
    CalificacionTaxisComponent,
  ],
  imports: [
    CommonModule,
    pagesRouting,
    PrimengModule,
    MaterialModule,
    IconsModule,
    ComponentModule,
    RecaptchaV3Module,
    TranslocoModule,
  ],
  exports:[
  ],
  providers:[
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptchaV3.siteKey,
    },
  ]
  
})
export class PagesModule { }
