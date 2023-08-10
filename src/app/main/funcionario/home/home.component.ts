import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { menuMimo } from 'src/app/model/layout';
import { buttonTableroHome } from 'src/app/model/tablero';
import { TableroService } from '../../../core/service/tablero.service'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from 'src/app/core/util/util.service';
import * as moment from 'moment';
import { listaManuRolFuncionario, listaManuRolFuncionarioEn } from 'src/app/model/menuFuncionario';
import { TipoReporte } from 'src/app/core/constant/Tableros';
import { SessionService } from 'src/app/core/service/session.service';
import { Router } from '@angular/router';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';
import { TranslocoService } from '@ngneat/transloco';

const dateDay: Date = new Date();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  usuario: any = "USUARIO";
  iconSinRistro: string = 'assets/icons/Grafica_icono.svg'
  sinRegistro: string = 'NO SE REGISTRA INFORMACIÓN';

  window: Window & typeof globalThis = window;

  width: number = (window.innerWidth * 0.01);

  height: number = 300;

  isGrafica: boolean = false;
  isCargarFiltro: boolean = false;

  range: FormGroup;

  fechaIni: Date = dateDay.getDate() === 1? this.restarMeses(1) : this.fechaDia(1)
  fechaFin: Date = this.obtenerDiaAnterior()

  graficaTop5 = []

  usuariosPorMes = []

  listButton: buttonTableroHome[] = [];

  styleCustom: string = ""
  sytleCustomNavbar: string = "";
  mode: MatDrawerMode = "side";
  open: boolean = true;

  colorScheme: string | Color = {
    name: "test",
    group: ScaleType.Ordinal,
    selectable: false,
    domain: ['#20223E']
  };

  colorScheme2: string | Color = {
    name: "test",
    group: ScaleType.Ordinal,
    selectable: false,
    domain: ['#BED000']
  };

  listaManuRolFuncionario: menuMimo[];

  ngDoCheck(){
    if(this.sessionService.getItemInSession(SessionConstants.LOCALE) === 'en'){
      this.listaManuRolFuncionario = listaManuRolFuncionarioEn
    } else {
      this.listaManuRolFuncionario = listaManuRolFuncionario
    }
  }

  constructor(
    private tableroService: TableroService,
    private fb: FormBuilder,
    private sessionService: SessionService,
    private router: Router,
    private translocoService: TranslocoService,

  ) {
    if(this.sessionService.getItemInSession(SessionConstants.LOCALE) === 'en'){
      this.listaManuRolFuncionario = listaManuRolFuncionarioEn
    } else {
      this.listaManuRolFuncionario = listaManuRolFuncionario
    }

    if (this.sessionService.getItem(SessionConstants.USER_NAME) !== null) {
      this.usuario = this.sessionService.getItem(SessionConstants.USER_NAME_CORTO);
    }
    this.sessionService.deleteItemLocal('fechaI')
    this.sessionService.deleteItemLocal('fechaF')
    this.range = this.fb.group({
      start: [this.fechaIni, [Validators.required]],
      end: [this.fechaFin, [Validators.required]],
    },
      {
        validator: [
          UtilService.fechaFuturas('start'),
          UtilService.fechaFuturas('end'),
          UtilService.fechaMenorYYYY('start','end')
        ]
      });
    this.onResize();
  }

  guardarLocalStorageFecha(){
    this.sessionService.setItemLocal('fechaI', this.range.get("start")?.value.toISOString())
    this.sessionService.setItemLocal('fechaF', this.range.get("end")?.value.toISOString())
  }

  direcionarReporte(){
    this.guardarLocalStorageFecha();
    this.router.navigateByUrl('/pagesf/reporte/tramite');
  }

  momentCustom(_any: any, format: string) {
    return moment(_any).format(format)
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d !== null ? d : new Date())
    return (day <= new Date());
  };

  restarMeses(n: number): Date {
    const fechaActual: Date = new Date();
    const diaActual: number = fechaActual.getDate();
    const mesActual: number = fechaActual.getMonth();
    const anioActual: number = fechaActual.getFullYear();
    if(fechaActual.getMonth() === 0) {
      fechaActual.setFullYear(anioActual - 1)
      fechaActual.setMonth(11)
      n = n - 1;
    }
    fechaActual.setMonth(fechaActual.getMonth() - n);
    return fechaActual;
  }

  fechaDia(n: number): Date {
    const fechaActual: Date = new Date();
    fechaActual.setDate(n);
    return fechaActual;
  }

  obtenerDiaAnterior(): Date {
    const hoy: Date = new Date();
    const diaActual: number = hoy.getDate();
    const mesActual: number = hoy.getMonth();
    const anioActual: number = hoy.getFullYear();
    
    if (diaActual === 1 && mesActual === 0) { // 1 de enero
      return new Date(anioActual - 1, 11, 31); // 31 de diciembre del año anterior
    }
    
    const ultimoDiaMesAnterior: number = new Date(anioActual, mesActual, 0).getDate();
    const diaAnterior: Date = new Date(anioActual, mesActual, diaActual - 1);
    
    if (diaActual === 1) {
      return new Date(anioActual, mesActual - 1, ultimoDiaMesAnterior);
    }
    
    return diaAnterior;
  }

  ngOnInit(): void {
    ////console.log(dateDay.getMonth());
    this.graficar();
  }

  graficar(){
    if(!this.range.valid){
      this.isCargarFiltro = false;
      return
    }
    this.isGrafica = false;
    this.graficaTop5 = [];
    this.usuariosPorMes = [];
    this.tableroService.graficasHome(
      moment(this.range.get("start")?.value).format('YYYY-MM-DD'),
      moment(this.range.get("end")?.value).format('YYYY-MM-DD')
    ).toPromise()
      .then((result) => {
        let cantidades: {name: string, value: string}[];
        if(result.body !== null) {
          this.graficaTop5 = result.body.topTramites;
          this.usuariosPorMes = result.body.mesesUsuario;
          cantidades = result.body.cantidades; 
        } else {
          cantidades = []; 
        }
        ////console.log(cantidades);
        this.translocoService.selectTranslateObject('home').subscribe(value => {
          this.listButton = [
            {
              name: value.numeroInstalaciones,
              link: "pagesf/reporte/"+TipoReporte.INSTALACION,
              linkIcon: "assets/icons/Grafica_icono.svg",
              cantidad: cantidades.length === 0? 0 : parseInt(cantidades.filter(x => x.name === TipoReporte.INSTALACION).length === 0? '0' :cantidades.filter(x => x.name === TipoReporte.INSTALACION)[0].value)
            },
            {
              name: value.firmasElectronicas,
              link: "pagesf/reporte/"+TipoReporte.FIRMA_ELECTRONICA,
              linkIcon: "assets/icons/Firmas electrónicas_icono.svg",
              cantidad: cantidades.length === 0? 0 :parseInt(cantidades.filter(x => x.name === TipoReporte.FIRMA_ELECTRONICA).length === 0? '0' :cantidades.filter(x => x.name === TipoReporte.FIRMA_ELECTRONICA)[0].value)
            },
            {
              name: value.notificaciones,
              link: "pagesf/reporte/"+TipoReporte.NOTIFICACION_ELECTRONICA,
              linkIcon: "assets/icons/Notificaciones electrónicas_icono.svg",
              cantidad: cantidades.length === 0? 0 :parseInt(cantidades.filter(x => x.name === TipoReporte.NOTIFICACION_ELECTRONICA).length === 0? '0' :cantidades.filter(x => x.name === TipoReporte.NOTIFICACION_ELECTRONICA)[0].value)
            },
            {
              name: value.usuariosActivos,
              link: "pagesf/reporte/"+TipoReporte.USUARIO,
              linkIcon: "assets/icons/Usuarios activos_icono.svg",
              cantidad: cantidades.length === 0? 0 :parseInt(cantidades.filter(x => x.name === TipoReporte.USUARIO).length === 0? '0' :cantidades.filter(x => x.name === TipoReporte.USUARIO)[0].value)
            }
          ]
        })
       
        this.isGrafica = true;
        this.isCargarFiltro = false;
      })
      .catch((err) => {
        console.error(err)
        this.isGrafica = true;
        this.isCargarFiltro = false;
      })
  }

  aplicar(){
    this.isCargarFiltro = true;
    this.graficar();
  }

  filtrarRango(n: number): void {
    this.range.get("start")?.setValue(this.restarMeses(n))
    this.range.get("end")?.setValue(this.obtenerDiaAnterior())
    this.isCargarFiltro = true;
    this.graficar();
  }

  rengoFecha(){
    if(this.range.get("end")?.value != null && this.range.get("start")?.value != null) {
      this.isCargarFiltro = true;
      this.graficar();
    }
  }

  restablecer(){
    this.range.get("start")?.setValue(dateDay.getDate() === 1? this.restarMeses(1) : this.fechaDia(1))
    this.range.get("end")?.setValue(this.obtenerDiaAnterior())
    this.isCargarFiltro = true;
    this.graficar();
  }


  sytleCustomOnDrawer: string = "";
  sytleCustomOnDrawer_two: string = "";

  onDrawerOpened() {
    if (window.innerWidth < 1300) {
      this.sytleCustomOnDrawer = "margin-top: -50px;"
      this.sytleCustomOnDrawer_two = "display: block; height: 50px;"
    }
  }

  onDrawerClosed() {
    this.sytleCustomOnDrawer = ""
    this.sytleCustomOnDrawer_two = "display: none;"
  }

  onResize() {

    if (window.innerWidth >= 1300) {
      this.sytleCustomNavbar = "";
      this.styleCustom = "display: none;";
      this.mode = "side";
      this.open = true;
    } else {
      this.sytleCustomNavbar = "display: none;";
      this.styleCustom = "";
      this.mode = "over";
      this.open = false;
    }
  }

  minString(text: string): string {
    return text.toLowerCase();
  }
}
