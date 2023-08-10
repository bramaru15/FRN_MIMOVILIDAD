import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { RecuperarContrasenaComponent } from './recuperar-contrasena/recuperar-contrasena.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../UI/material/material.module';
import { PrimengModule } from '../UI/primeng/primeng.module';
import {FormsModule} from '@angular/forms';
import {IconsModule} from '../UI/icons/icons.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ComponentModule } from '../component/component.module';
import { TranslocoModule } from '@ngneat/transloco';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    RecuperarContrasenaComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    PrimengModule,
    FormsModule,
    IconsModule,
    NgxSpinnerModule,
    NgxMaskDirective, NgxMaskPipe,
    ComponentModule,
    TranslocoModule
  ],
  providers: [provideNgxMask()],
})
export class AuthModule { }
