import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginService } from 'src/app/core/service/login.service';
import { InicioComponent } from '../../layout/layout-principal/inicio/inicio.component';
import { ActoresVialesComponent } from './actores-viales/actores-viales.component';
import { ComparendosComponent } from './comparendos/comparendos.component';
import { HomeComponent } from './home/home.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { MisCitasComponent } from './mis-citas/mis-citas.component';
import { ServiciosPublicosComponent } from './servicios-publicos/servicios-publicos.component';
import { TramitesComponent } from './tramites/tramites.component';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { InmovilizacionComponent } from './inmovilizacion/inmovilizacion.component'
import { CentroAyudaComponent } from './centro-ayuda/centro-ayuda.component';
import { AsesoriasComponent } from './asesorias/asesorias.component'
import { MapasComponent } from './mapas/mapas.component'
import { TaxisComponent } from './taxis/taxis.component'
import { VisorComponent } from './visor/visor.component';
import { ExceptuadosComponent } from './exceptuados/exceptuados.component'
import { ConsultaVehiculosInmovilizadosComponent } from './consulta-vehiculos-inmovilizados/consulta-vehiculos-inmovilizados.component';
import { FirmaElectronicaComponent } from './firma-electronica/firma-electronica.component';
import { NotificacionElectroComponent } from './notificacion-electro/notificacion-electro.component';
import { AppDescargaComponent } from './app-descarga/app-descarga.component';
import { AnonimoComponent } from './anonimo/anonimo.component';
import { CalificacionTaxisComponent } from './calificacion-taxis/calificacion-taxis.component';

const routes: Routes = [
  {
    path: 'calificacion-taxis',
    component: CalificacionTaxisComponent
  },
  {
    path: 'landing-page',
    component: AnonimoComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginService]
  },
  {
    path: 'mi-perfil',
    component: MiPerfilComponent,
    canActivate: [LoginService]
  },
  {
    path: 'firma-electronica',
    component: FirmaElectronicaComponent,
    canActivate: [LoginService]
  },
  {
    path: 'notificacion-electronica',
    component: NotificacionElectroComponent,
    canActivate: [LoginService]
  },
  {
    path: 'help',
    component: CentroAyudaComponent,
    //canActivate: [LoginService]
  },
  {
    path: 'inmovilizaciones',
    component: InmovilizacionComponent,
    canActivate: [LoginService]
  },
  {
    path: 'inmovilizaciones/consulta-vehiculos',
    component: ConsultaVehiculosInmovilizadosComponent,
    //canActivate: [LoginService]
  },
  {
    path: 'comparendos',
    component: ComparendosComponent,
    canActivate: [LoginService]
  },
  {
    path: 'tramites',
    component: TramitesComponent,
    canActivate: [LoginService]
  },
  {
    path: 'tramites/vehiculos',
    component: VehiculosComponent,
    canActivate: [LoginService]
  },
  {
    path: 'tramites/actores-viales',
    component: ActoresVialesComponent,
    canActivate: [LoginService]
  },
  {
    path: 'tramites/servicio-publico',
    component: ServiciosPublicosComponent,
    canActivate: [LoginService]
  },
  {
    path: 'mis-citas',
    component: MisCitasComponent,
    canActivate: [LoginService]
  },
  {
    path: 'asesorias',
    component: AsesoriasComponent,
    //canActivate: [LoginService]
  },
  {
    path: 'taxis',
    component: TaxisComponent,
    //canActivate: [LoginService]
  },
  {
    path: 'exceptuado',
    component: ExceptuadosComponent,
    //canActivate: [LoginService]
  },
  {
    path: 'mapas',
    component: MapasComponent,
    //canActivate: [LoginService]
  },
  {
    path: 'apps',
    component: AppDescargaComponent,
    //canActivate: [LoginService]
  },
  {
    path: 'mapas/visor/:id_mapa',
    component: VisorComponent,
    //canActivate: [LoginService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class pagesRouting { }