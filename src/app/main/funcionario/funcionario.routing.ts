import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginService } from 'src/app/core/service/login.service';
import { HomeComponent } from './home/home.component';
import { ReporteComponent } from './reporte/reporte.component';
import { TipoReporte } from 'src/app/core/constant/Tableros';
import { HelpFuncionarioComponent } from './help-funcionario/help-funcionario.component';

///pagesf/reporte
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoginService]
  },
  {
    path: 'reporte/:id',
    component: ReporteComponent,
    canActivate: [LoginService]
  },
  {
    path: 'help',
    component: HelpFuncionarioComponent,
    canActivate: [LoginService]
  },
  {
    path: 'reporte',
    redirectTo: '/pagesf/reporte/'+TipoReporte.INSTALACION,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRouting { }