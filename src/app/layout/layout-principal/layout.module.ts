import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InicioComponent } from './inicio/inicio.component';
import { PrimengModule } from 'src/app/UI/primeng/primeng.module';
import { MaterialModule } from 'src/app/UI/material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { IconsModule } from 'src/app/UI/icons/icons.module';
import { ComponentModule } from 'src/app/component/component.module';
import { InicioFuncionarioComponent } from './inicio-funcionario/inicio-funcionario.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    InicioComponent,
    InicioFuncionarioComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    MaterialModule,
    RouterModule,
    PrimengModule,
    MaterialModule,
    IconsModule,
    ComponentModule,
    TranslocoModule
  ],
  exports:[
    NavbarComponent,
    SidebarComponent,
    InicioComponent]
})
export class LayoutModule { }
