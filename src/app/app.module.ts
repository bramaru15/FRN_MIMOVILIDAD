import { LOCALE_ID, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimengModule } from './UI/primeng/primeng.module';
import { MaterialModule } from './UI/material/material.module';
import { AuthModule } from './auth/auth.module';
import { RouterModule, Routes } from '@angular/router';

import { PagesModule } from './main/pages/pages.module';
import { FuncionarioModule } from './main/funcionario/funcionario.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
//import {RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY} from 'ng-recaptcha';
import {environment} from '../environments/environment';
import { ComponentModule } from '../app/component/component.module';
import { LayoutModule } from './layout/layout-principal/layout.module';
import { InicioComponent } from './layout/layout-principal/inicio/inicio.component';
import { InicioFuncionarioComponent } from './layout/layout-principal/inicio-funcionario/inicio-funcionario.component';
import localeESMX from '@angular/common/locales/es-MX';
import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common'
import { AnonimoComponent } from './main/pages/anonimo/anonimo.component';
import { TranslocoRootModule } from './transloco-root.module'
import { DropdownModule } from 'primeng/dropdown';
registerLocaleData(localeESMX);
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { LogoComponent } from './main/logo/logo.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoginComponent } from './auth/login/login.component';
import { RecuperarContrasenaComponent } from './auth/recuperar-contrasena/recuperar-contrasena.component';
import { RegistroComponent } from './auth/registro/registro.component';


const appRoutes: Routes = [
  {
    path: '',
    component: LogoComponent,
    title: 'Mi Movilidad a un clic'
  },
  {
    path: 'signin',
    component: LoginComponent,
    title: 'Log in',
  },
  {
    path: 'usernamerecovery',
    component: RecuperarContrasenaComponent,
  },
  {
    path: 'signup',
    component: RegistroComponent,
  },
  {
    path: 'pages',
    component: InicioComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule)
      }
    ]
    
  },
  {
    path: 'pagesf',
    component: InicioFuncionarioComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./main/funcionario/funcionario.module').then(m => m.FuncionarioModule)
      }
    ]
    
  },
  {
    path: '**',
    redirectTo: '/pages/landing-page' //Error 404 - Page not found
    //redirectTo: '/signin' //Error 404 - Page not found
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LogoComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled'
    }),
    PrimengModule,
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    NgxSpinnerModule,
    ComponentModule,
    DropdownModule,
    //RecaptchaV3Module,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
      
    }),
    LayoutModule,
    BrowserAnimationsModule,
    TranslocoRootModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX'},
    { provide: LocationStrategy, useClass: HashLocationStrategy}
    /*{ provide: RECAPTCHA_V3_SITE_KEY, useValue: environment.keyRecaptcha },*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
