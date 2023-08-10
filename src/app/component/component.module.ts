import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { MaterialModule } from '../UI/material/material.module';
import { IconsModule } from '../UI/icons/icons.module';
import { NavegacionComponent } from './navegacion/navegacion.component';
import { ButtonNotificacionComponent } from './button-notificacion/button-notificacion.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { TitlePagesComponent } from './title-pages/title-pages.component';
import { CardTramitesComponent } from './card-tramites/card-tramites.component';
import { CardButtonLinkComponent } from './card-button-link/card-button-link.component';
import { GroupsButtonCardComponent } from './groups-button-card/groups-button-card.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonCardTramiteComponent } from './button-card-tramite/button-card-tramite.component';
import { GrupsButtonLinkSubtramiteComponent } from './grups-button-link-subtramite/grups-button-link-subtramite.component';
import { CardButtonLinkSubtramiteComponent } from './card-button-link-subtramite/card-button-link-subtramite.component';
import { PrimengModule } from '../UI/primeng/primeng.module';
import { IconMenuComponent } from './icon-menu/icon-menu.component';
import { SliderDateCustomComponent } from './slider-date-custom/slider-date-custom.component';
import { CardButtonTablaroHomeComponent } from './card-button-tablaro-home/card-button-tablaro-home.component';
import { GroupButtonTablaroHomeComponent } from './group-button-tablaro-home/group-button-tablaro-home.component';
import { GraficarComponent } from './graficar/graficar.component'
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ComboChartComponent} from './combo-chart/combo-chart.component';
import {ComboSeriesVerticalComponent } from './combo-chart/combo-series-vertical.component';
import { CardHeaderCentroAyudaComponent } from './card-header-centro-ayuda/card-header-centro-ayuda.component';
import { CardCentroAyudaComponent } from './card-centro-ayuda/card-centro-ayuda.component'
import { ErrorMenssageComponent } from './error-menssage/error-menssage.component'
import { CheckboxFiltroTableroComponent } from './checkbox-filtro-tablero/checkbox-filtro-tablero.component';
import { MensajeGraficaComponent } from './mensaje-grafica/mensaje-grafica.component'
import { CardBtnHomeV2Component } from './card-btn-home-v2/card-btn-home-v2.component';
import { CardTaxisComponent } from './card-taxis/card-taxis.component';
import { DetalleConductoresTaxiComponent } from './detalle-conductores-taxi/detalle-conductores-taxi.component';
import { CheckboxConductoresUniselectComponent } from './checkbox-conductores-uniselect/checkbox-conductores-uniselect.component';
import { DetalleExceptuadosComponent } from './detalle-exceptuados/detalle-exceptuados.component';
import { SinInformacionComponent } from './sin-informacion/sin-informacion.component';
import { CardHeaderV1Component } from './card-header-v1/card-header-v1.component';
import { CardHeaderV4Component } from './card-header-v4/card-header-v4.component';
import { BtnIdiomaComponent } from './btn-idioma/btn-idioma.component';
import { TranslocoModule } from '@ngneat/transloco';
import { BtnAccesibilidadComponent } from './btn-accesibilidad/btn-accesibilidad.component';



@NgModule({
    declarations: [
        NotificacionComponent,
        NavegacionComponent,
        ButtonNotificacionComponent,
        CardHeaderComponent,
        TitlePagesComponent,
        CardTramitesComponent,
        CardButtonLinkComponent,
        GroupsButtonCardComponent,
        ButtonCardTramiteComponent,
        GrupsButtonLinkSubtramiteComponent,
        CardButtonLinkSubtramiteComponent,
        IconMenuComponent,
        SliderDateCustomComponent,
        CardButtonTablaroHomeComponent,
        GroupButtonTablaroHomeComponent,
        GraficarComponent,
        ComboChartComponent,
        ComboSeriesVerticalComponent,
        CardHeaderCentroAyudaComponent,
        CardCentroAyudaComponent,
        ErrorMenssageComponent,
        CheckboxFiltroTableroComponent,
        MensajeGraficaComponent,
        CardBtnHomeV2Component,
        CardTaxisComponent,
        DetalleConductoresTaxiComponent,
        CheckboxConductoresUniselectComponent,
        DetalleExceptuadosComponent,
        SinInformacionComponent,
        CardHeaderV1Component,
        CardHeaderV4Component,
        BtnIdiomaComponent,
        BtnAccesibilidadComponent
    ],
    exports: [
        NotificacionComponent,
        NavegacionComponent,
        ButtonNotificacionComponent,
        CardHeaderComponent,
        TitlePagesComponent,
        CardTramitesComponent,
        CardButtonLinkComponent,
        GroupsButtonCardComponent,
        ButtonCardTramiteComponent,
        GrupsButtonLinkSubtramiteComponent,
        CardButtonLinkSubtramiteComponent,
        IconMenuComponent,
        SliderDateCustomComponent,
        CardButtonTablaroHomeComponent,
        GroupButtonTablaroHomeComponent,
        GraficarComponent,
        ComboChartComponent,
        ComboSeriesVerticalComponent,
        CardHeaderCentroAyudaComponent,
        CardCentroAyudaComponent,
        ErrorMenssageComponent,
        CheckboxFiltroTableroComponent,
        MensajeGraficaComponent,
        CardBtnHomeV2Component,
        CardTaxisComponent,
        CheckboxConductoresUniselectComponent,
        SinInformacionComponent,
        CardHeaderV1Component,
        CardHeaderV4Component,
        BtnIdiomaComponent,
        BtnAccesibilidadComponent 
    ],
    imports: [
        CommonModule,
        MaterialModule,
        IconsModule,
        RouterModule,
        PrimengModule,
        NgxChartsModule,
        TranslocoModule
    ]
})
export class ComponentModule { }
