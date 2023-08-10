import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../layout/layout-principal/navbar/navbar.component';
import { RouterModule, Routes } from '@angular/router';
import { FuncionarioRouting } from './funcionario.routing';
import { SidebarComponent } from '../../layout/layout-principal/sidebar/sidebar.component';
import { PrimengModule } from 'src/app/UI/primeng/primeng.module';
import { MaterialModule } from 'src/app/UI/material/material.module';
import {IconsModule} from '../../UI/icons/icons.module';
import { ComponentModule } from '../../component/component.module';
import { HomeComponent } from './home/home.component';
import { LayoutModule } from 'src/app/layout/layout-principal/layout.module';
import { ReporteComponent } from './reporte/reporte.component';
import { HelpFuncionarioComponent } from './help-funcionario/help-funcionario.component';
import { TranslocoModule } from '@ngneat/transloco';



  

@NgModule({
  declarations: [
    HomeComponent,
    ReporteComponent,
    HelpFuncionarioComponent,
  ],
  imports: [
    CommonModule,
    FuncionarioRouting,
    PrimengModule,
    MaterialModule,
    IconsModule,
    ComponentModule,
    LayoutModule,
    TranslocoModule
  ],
  exports:[
  ]
  
})
export class FuncionarioModule { }
