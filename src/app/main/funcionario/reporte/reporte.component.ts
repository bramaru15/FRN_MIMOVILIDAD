import { Component, ElementRef, Renderer2, ViewChild, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { menuMimo } from 'src/app/model/layout';
import { buttonTableroHome } from 'src/app/model/tablero';
import { TableroService } from '../../../core/service/tablero.service'
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UtilService } from 'src/app/core/util/util.service';
import * as moment from 'moment';
import { listaManuRolFuncionario, listaManuRolFuncionarioEn } from 'src/app/model/menuFuncionario';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoReporte } from 'src/app/core/constant/Tableros';
import { SessionService } from 'src/app/core/service/session.service';
import { SessionConstants } from 'src/app/core/constant/SessionConstants';
import { TranslocoService } from '@ngneat/transloco';

const dateDay: Date = new Date();

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})
export class ReporteComponent {

  formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  iconSinRistro: string = 'assets/icons/Grafica_icono.svg'
  sinRegistro: string = 'NO SE REGISTRA INFORMACIÓN';

  cantidad: number = 0;
  username: string = "";
  mensajeCantidad: string = '';

  window: Window & typeof globalThis = window;

  legendPositionBelow: LegendPosition = LegendPosition.Below;
  legendPositionRight: LegendPosition = LegendPosition.Right;

  isGrafica: boolean = false;
  isCatalogo: { dispositivo: boolean, categoria: boolean, SO: boolean, navegador: boolean, tramite: boolean } = { dispositivo: false, categoria: false, SO: false, navegador: false, tramite: false };
  isCargarFiltro: boolean = false;
  isArchivo: boolean = false;
  typeReporte: string = 'tramite';
  textCantidad: string = "";

  width: number = (window.innerWidth * 0.01);

  height: number = 300;

  range: FormGroup;

  fechaIni: Date = dateDay.getDate() === 1 ? this.restarMeses(1) : this.fechaDia(1)
  fechaFin: Date = this.obtenerDiaAnterior()

  graficatramite: any[] = [];
  graficaSO = [];
  graficaDispositivo = [];
  graficaNavegador = [];
  graficanotificacionElec = [];

  catalogoDispositivo: { nombre: string }[] = [];
  selectionCatalogoDispositivo = new SelectionModel<any>(true, []);
  selectionDispositivo(selection: any) {
    this.selectionCatalogoDispositivo = selection;
    this.isCargarFiltro = true;
    this.graficar();
  }

  catalogoCategoria: { nombre: string }[] = [];
  selectionCatalogoCategoria = new SelectionModel<any>(true, []);
  selectionCategoria(selection: any) {
    this.selectionCatalogoCategoria = selection;
    this.isCatalogo.tramite = true;
    this.isCargarFiltro = true;
    let aux: string[] = [];
    this.selectionCatalogoCategoria.selected.forEach(x => {
      aux.push(x.nombre);
    })
    this.selectionCatalogoTramite.clear();
    if (aux.length > 0) {
      this.tableroService.catalogo('', aux, 2).toPromise()
        .then((result) => {

          this.catalogoTramite = result.body.listado;
          this.isCatalogo.tramite = false;
          this.isCargarFiltro = false;
        })
        .catch((err) => {
          console.error(err)
        })
    } else {
      this.catalogoTramite = []
      this.isCatalogo.tramite = false;
    }
    this.graficar();
  }

  catalogoSO: { nombre: string }[] = [];
  selectionCatalogoSO = new SelectionModel<any>(true, []);
  selectionSO(selection: any) {
    this.selectionCatalogoSO = selection;
    this.isCargarFiltro = true;
    this.graficar();
  }

  catalogoNavegador: { nombre: string }[] = [];
  selectionCatalogoNavegador = new SelectionModel<any>(true, []);
  selectionNavegador(selection: any) {
    this.selectionCatalogoNavegador = selection;
    this.isCargarFiltro = true;
    this.graficar();
  }

  catalogoTramite: { nombre: string }[] = [];
  selectionCatalogoTramite = new SelectionModel<any>(true, []);
  selectionTramite(selection: any) {
    this.selectionCatalogoTramite = selection;
    this.isCargarFiltro = true;
    this.graficar();
  }


  selectionTypeReporte(type: string): string {
    switch (type) {
      case TipoReporte.TRAMITE:
        return TipoReporte.TRAMITE_TEXT
        break;
      case TipoReporte.FIRMA_ELECTRONICA:
        return TipoReporte.FIRMA_ELECTRONICA_TEXT
        break;
      case TipoReporte.INSTALACION:
        return TipoReporte.INSTALACION_TEXT
        break;
      case TipoReporte.USUARIO:
        return TipoReporte.USUARIO_TEXT
        break;
      case TipoReporte.NOTIFICACION_ELECTRONICA:
        return TipoReporte.NOTIFICACION_ELECTRONICA_TEXT
        break;
      default:
        return ''
        break;
    }
  }

  selectionTypeReporteCantidad(type: string): any {
    this.translocoService.selectTranslateObject('reporte.total').subscribe(value => {
      switch (type) {
        case TipoReporte.TRAMITE:
          return value.tramite
          break;
        case TipoReporte.FIRMA_ELECTRONICA:
          return value.firmaElectronica
          break;
        case TipoReporte.INSTALACION:
          return value.instalaciones
          break;
        case TipoReporte.USUARIO:
          return value.usuario
          break;
        case TipoReporte.NOTIFICACION_ELECTRONICA:
          return value.notificacion
          break;
        default:
          return ''
          break;
      }
    })
  }

  clearFiltro() {
    this.selectionCatalogoTramite.clear()
    this.selectionCatalogoCategoria.clear()
    this.selectionCatalogoDispositivo.clear()
    this.selectionCatalogoNavegador.clear()
    this.selectionCatalogoSO.clear();
  }

  selectionTypeGrafica(type: string) {
    this.typeReporte = type
    this.clearFiltro();
    this.isCargarFiltro = true;
    this.graficar();
  }


  quitarSelection() {
    alert("hola")
  }

  styleCustom: string = ""
  sytleCustomNavbar: string = "";
  mode: MatDrawerMode = "side";
  open: boolean = true;

  colorScheme: string | Color = {
    name: "test",
    group: ScaleType.Ordinal,
    selectable: false,
    domain: ['#20223E', '#BED000', '#7B558E', '#6EC5AA', '#B24445', '#425287']
  };

  colorScheme2: string | Color = {
    name: "test",
    group: ScaleType.Ordinal,
    selectable: false,
    domain: ['#BED000']
  };

  listaManuRolFuncionario: menuMimo[];
  categorias: any[] = [];

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
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService,
    private translocoService: TranslocoService,
  ) {
    if(this.sessionService.getItemInSession(SessionConstants.LOCALE) === 'en'){
      this.listaManuRolFuncionario = listaManuRolFuncionarioEn
    } else {
      this.listaManuRolFuncionario = listaManuRolFuncionario
    }
    this.translocoService.selectTranslateObject('reporte').subscribe(value => {
      switch (this.typeReporte) {
        case TipoReporte.TRAMITE:
          this.textCantidad = value.total.tramite
          break;
        case TipoReporte.FIRMA_ELECTRONICA:
          this.textCantidad = value.total.firmaElectronica
          break;
        case TipoReporte.INSTALACION:
          this.textCantidad = value.total.instalaciones
          break;
        case TipoReporte.USUARIO:
          this.textCantidad = value.total.usuario
          break;
        case TipoReporte.NOTIFICACION_ELECTRONICA:
          this.textCantidad = value.total.notificacion
          break;
        default:
          this.textCantidad = ''
          break;
      }

      this.categorias = [
        {
          name: value.instalaciones,
          type: TipoReporte.INSTALACION,
          link: '/pagesf/reporte/' + TipoReporte.INSTALACION
        },
        {
          name: value.usuarios,
          type: TipoReporte.USUARIO,
          link: '/pagesf/reporte/' + TipoReporte.USUARIO
        },
        {
          name: value.tramite,
          type: TipoReporte.TRAMITE,
          link: '/pagesf/reporte/' + TipoReporte.TRAMITE
        },
        {
          name: value.firma,
          type: TipoReporte.FIRMA_ELECTRONICA,
          link: '/pagesf/reporte/' + TipoReporte.FIRMA_ELECTRONICA
        },
        {
          name: value.notificacion,
          type: TipoReporte.NOTIFICACION_ELECTRONICA,
          link: '/pagesf/reporte/' + TipoReporte.NOTIFICACION_ELECTRONICA
        }
      ]
    });
    this.username = this.sessionService.getItemLocal(SessionConstants.USER_NAME) === null ? "NaN" : this.sessionService.getItemLocal(SessionConstants.USER_NAME) + "";
    this.route.params.subscribe(params => {
      this.typeReporte = params["id"];
    });
    this.localStorageFecha()
    this.range = this.fb.group({
      start: [this.fechaIni, [Validators.required]],
      end: [this.fechaFin, [Validators.required]],
    },
      {
        validator: [
          UtilService.fechaFuturas('start'),
          UtilService.fechaFuturas('end'),
          UtilService.fechaMenorYYYY('start', 'end')
        ]
      });
    this.onResize();
  }

  localStorageFecha() {
    let fechaI = this.sessionService.getItemLocal('fechaI');
    let fechaF = this.sessionService.getItemLocal('fechaF');
    if (fechaI !== null && fechaF !== null) {
      this.fechaIni = new Date(fechaI)
      this.fechaFin = new Date(fechaF);
    }
  }

  momentCustom(_any: any, format: string): string {
    return moment(_any).format(format).toString()
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
    if (fechaActual.getMonth() === 0) {
      fechaActual.setFullYear(anioActual - 1)
      fechaActual.setMonth(11)
      n = n - 1;
    }
    fechaActual.setMonth(fechaActual.getMonth() - n);
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

  fechaDia(n: number): Date {
    const fechaActual: Date = new Date();
    fechaActual.setDate(n);
    return fechaActual;
  }

  ngOnInit(): void {
    this.isCatalogo.dispositivo = false;
    this.tableroService.catalogo('dispositivo', [], 1).toPromise()
      .then((result) => {

        this.catalogoDispositivo = result.body.listado;
        this.isCatalogo.dispositivo = true;
      })
      .catch((err) => {
        console.error(err)
      })
    this.isCatalogo.categoria = false;
    this.tableroService.catalogo('categoria', [], 3).toPromise()
      .then((result) => {

        this.catalogoCategoria = result.body.listado;
        this.isCatalogo.categoria = true;
      })
      .catch((err) => {
        console.error(err)
      })
    this.isCatalogo.SO = false;
    this.tableroService.catalogo('SO', [], 1).toPromise()
      .then((result) => {

        this.catalogoSO = result.body.listado;
        this.isCatalogo.SO = true;
      })
      .catch((err) => {
        console.error(err)
      })
    this.isCatalogo.navegador = false;
    this.tableroService.catalogo('navegador', [], 1).toPromise()
      .then((result) => {

        this.catalogoNavegador = result.body.listado;
        this.isCatalogo.navegador = true;
      })
      .catch((err) => {
        console.error(err)
      })
    this.graficar();
  }

  aplicar() {
    this.isCargarFiltro = true;
    this.graficar();
  }

  rengoFecha() {
    if (this.range.get("end")?.value != null && this.range.get("start")?.value != null) {
      this.isCargarFiltro = true;
      this.graficar();
    }
  }

  restablecer() {
    this.router.navigateByUrl('/pagesf/reporte/' + TipoReporte.INSTALACION);
    this.typeReporte = TipoReporte.INSTALACION
    this.range.get("start")?.setValue(dateDay.getDate() === 1 ? this.restarMeses(1) : this.fechaDia(1))
    this.range.get("end")?.setValue(this.obtenerDiaAnterior())
    this.clearFiltro();
    this.isCargarFiltro = true;
    this.graficar();
  }

  graficar() {
    if (!this.range.valid) {
      this.isCargarFiltro = false;
      this.clearFiltro()
      return
    }

    this.isGrafica = false;
    this.graficatramite = [];
    this.graficaSO = [];
    this.graficaDispositivo = [];
    this.graficaNavegador = [];
    let categoria: string[] = [];
    this.selectionCatalogoCategoria.selected.forEach(x => {
      categoria.push(x.nombre);
    })

    let tramite: string[] = [];
    this.selectionCatalogoTramite.selected.forEach(x => {
      tramite.push(x.nombre);
    })

    let SO: string[] = [];
    this.selectionCatalogoSO.selected.forEach(x => {
      SO.push(x.nombre);
    })

    let dispositivo: string[] = [];
    this.selectionCatalogoDispositivo.selected.forEach(x => {
      dispositivo.push(x.nombre);
    })

    let navegador: string[] = [];
    this.selectionCatalogoNavegador.selected.forEach(x => {
      navegador.push(x.nombre);
    })

    this.tableroService.graficaReporte(
      this.typeReporte,
      categoria,
      tramite,
      dispositivo,
      navegador,
      SO,
      moment(this.range.get("start")?.value).format('YYYY-MM-DD'),
      moment(this.range.get("end")?.value).format('YYYY-MM-DD')).toPromise()
      .then((result) => {
        ////console.log(result);
        if (result.body !== null) {
          this.graficatramite = result.body.graficatramite;
          let aux: { name: string, series: { name: Date, value: string }[] }[] = []
          this.graficatramite.forEach((element: any) => {
            let _series: { name: Date, value: string }[] = [];
            element.series.forEach((x: any) => {
              _series.push({ name: new Date(x.name), value: x.value })
            })
            aux.push({ name: element.name, series: _series })
          });
          ////console.log(aux);
          this.graficatramite = [];
          this.graficatramite = aux;
          this.graficaSO = result.body.graficaSistemaOperativo;
          this.graficaDispositivo = result.body.graficaDispositivo;
          this.graficaNavegador = result.body.graficaNavegador;
          this.cantidad = this.cantidadMayorTramite(this.graficatramite);
        }
        this.isGrafica = true;
        this.isCargarFiltro = false;
      })
      .catch((err) => {
        //console.log(err)
        this.isGrafica = true;
        this.isCargarFiltro = false;
      })
  }

  archivo() {
    if (!this.range.valid) {
      this.isCargarFiltro = false;
      this.clearFiltro()
      return
    }

    this.isArchivo = true;
    let categoria: string[] = [];
    this.selectionCatalogoCategoria.selected.forEach(x => {
      categoria.push(x.nombre);
    })

    let tramite: string[] = [];
    this.selectionCatalogoTramite.selected.forEach(x => {
      tramite.push(x.nombre);
    })

    let SO: string[] = [];
    this.selectionCatalogoSO.selected.forEach(x => {
      SO.push(x.nombre);
    })

    let dispositivo: string[] = [];
    this.selectionCatalogoDispositivo.selected.forEach(x => {
      dispositivo.push(x.nombre);
    })

    let navegador: string[] = [];
    this.selectionCatalogoNavegador.selected.forEach(x => {
      navegador.push(x.nombre);
    })

    this.tableroService.reporteArchivo(
      this.username,
      this.typeReporte,
      categoria,
      tramite,
      dispositivo,
      navegador,
      SO,
      moment(this.range.get("start")?.value).format('YYYY-MM-DD'),
      moment(this.range.get("end")?.value).format('YYYY-MM-DD')).toPromise()
      .then((result) => {
        ////console.log(result);
        if (result.body !== null) {
          ////console.log(result.body);
          this.descargarCSV(result.body.archivo, result.body.nombreArchivo)
        }
        this.isArchivo = false;
      })
      .catch((err) => {
        //console.log(err)
        this.isArchivo = false;
      })
  }

  descargarCSV(docBase64: string, nameFile: string) {
    let contenido = `data:text/csv;charset=UTF-8;base64,${docBase64}`;
    var link = document.createElement("a");
    link.setAttribute("href", encodeURI(contenido));
    link.setAttribute("download", nameFile);
    document.body.appendChild(link);
    link.click();;
  }

  cantidadMayorTramite(ob: any[]): number {
    let aux: number[] = []

    if (ob.length > 0) {
      ob.forEach(x => {
        let count: number = 0
        x.series.forEach((y: any) => {
          count = count + parseInt(y.value)
        })
        aux.push(count)
      })

      return Math.max(...aux)
    } else {
      return 0
    }
  }

  filtrarRango(n: number): void {
    this.range.get("start")?.setValue(this.restarMeses(n))
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

}
