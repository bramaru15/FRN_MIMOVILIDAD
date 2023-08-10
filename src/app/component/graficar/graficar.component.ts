import { Component, Inject, Input } from '@angular/core';
import { multi } from './data';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import { timeFormatDefaultLocale, timeFormat } from 'd3-time-format';

timeFormatDefaultLocale({
  "dateTime": "%A, %e de %B de %Y, %X",
  "date": "%d/%m/%Y",
  "time": "%H:%M:%S",
  "periods": ["AM", "PM"],
  "days": ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
  "shortDays": ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  "months": ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
  "shortMonths": ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
})

@Component({
  selector: 'app-graficar',
  templateUrl: './graficar.component.html',
  styleUrls: ['./graficar.component.scss']
})
export class GraficarComponent {
  @Input() typeGrafica: 'linea' | 'torta' | 'barra-hor' | 'barra-ver' | 'dona' | 'combo-chart' = 'linea';
  @Input() multi: any[] = [];
  @Input() lineChartSeries: any[] = [];
  @Input() view!: [number, number];
  @Input() tooltipDisabled = false;
  // line, area
  @Input() autoScale = true;
  rangeFillOpacity: number = 0.15;
  roundDomains = false;

  @Input() xScaleMin: any;
  @Input() xScaleMax: any;
  yScaleMin: number = 0;
  yScaleMax: number = 0;

  // options
  @Input() legend: boolean = true;
  @Input() showLabels: boolean = false;
  @Input() animations: boolean = true;
  @Input() xAxis: boolean = true;
  @Input() legendPosition: LegendPosition = LegendPosition.Right;
  @Input() yAxis: boolean = true;
  @Input() isDoughnut: boolean = false;
  @Input() arcWidth: number = 0.25
  @Input() showYAxisLabel: boolean = false;
  @Input() showXAxisLabel: boolean = false;
  @Input() xAxisLabel: string = 'Year';
  @Input() yAxisLabel: string = 'Population';
  @Input() legendTitle: string = 'Legend';
  @Input() showGridLines = true;
  @Input() yAxisLabelRight: string = 'Utilization';
  @Input() noBarWhenZero: boolean = true;
  @Input() timeline: boolean = true;
  @Input() gradient: boolean = false;
  @Input() showDataLabel: boolean = false;
  schemeType = ScaleType.Ordinal;

  @Input() trimXAxisTicks: boolean = true;
  @Input() trimYAxisTicks: boolean = true;
  @Input() rotateXAxisTicks: boolean = true;
  @Input() maxXAxisTickLength: number = 16;
  @Input() maxYAxisTickLength: number = 16;


  @Input() colorScheme: string | Color = {
    name: "test",
    group: ScaleType.Ordinal,
    selectable: false,
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  @Input() lineChartScheme: Color = {
    name: 'coolthree',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#01579b', '#7aa3e5', '#a8385d', '#00bfa5']
  };

  constructor() {

  }

  dateTickFormatting(val: any): any {
    if (val instanceof Date) {
      let date: Date = new Date(val);
      var formatMillisecond = ".%L",
          formatSecond = ":%S",
          formatMinute = "%I:%M",
          formatHour = "%I %p",
          formatDay = "%a %d",
          formatWeek = "%b %d",
          formatMonth = "%B",
          formatYear = "%Y";

      function interval(d: Date, time: string): Date {
        let fecha:Date = new Date(d);
        switch (time) {
          case 'second':
            fecha.setMilliseconds(0)
            return fecha
            break;
          case 'minute':
            fecha.setSeconds(0, 0)
            return fecha
            break;
          case 'hour':
            fecha.setMinutes(0, 0, 0)
            return fecha
            break;
          case 'day':
            fecha.setHours(0, 0, 0, 0)
            return fecha
            break;
          case 'month':
            fecha.setDate(1)
            fecha.setHours(0, 0, 0, 0)
            return fecha
            break;
          case 'week':
            let _dw = fecha.getDate() - fecha.getDay()
            fecha.setDate(_dw)
            fecha.setHours(0, 0, 0, 0)
            return fecha
            break;
          case 'year':
            fecha.setDate(1)
            fecha.setMonth(0)
            fecha.setHours(0, 0, 0, 0)
            return fecha
            break;
          default:
            return d
            break;
        }
      }

      return timeFormat(interval(date, 'second') < val ? formatMillisecond
                        : interval(date, 'minute') < val ? formatSecond
                        : interval(date, 'hour') < val ? formatMinute
                        : interval(date, 'day') < val ? formatHour
                        : interval(date, 'month') < val ? (interval(date, 'week') < val ? formatDay : formatWeek)
                        : interval(date, 'year') < val ? formatMonth
                        : formatYear)(val)
    }
  }

  onSelect(data: any): void {
    ////console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    ////console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    ////console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }



  labelFormatting(name: any) { // this name will contain the name you defined in chartData[]
    let self: any = this; // this "this" will refer to the chart component (pun intented :))

    let data = self.series.filter((x: any) => x.name == name); // chartData will be present in
    // series along with the label
    let countData = 0
    self.series.forEach((x: any) => {
      countData = countData + parseInt(x.value)
    })

    if (data.length > 0) {
      return parseInt(`${data[0].value}`).toLocaleString('es-ES') + ' (' + ((data[0].value / countData) * 100).toPrecision(3) + '%)';
    } else {
      return name;
    }
  }

  /*
  **
  Combo Chart
  **
  [yLeftAxisScaleFactor]="yLeftAxisScale" and [yRightAxisScaleFactor]="yRightAxisScale"
  exposes the left and right min and max axis values for custom scaling, it is probably best to
  scale one axis in relation to the other axis but for flexibility to scale either the left or
  right axis both were exposed.
  **
  */

  yLeftAxisScale(min: any, max: any) {
    return { min: `${min}`, max: `${max}` };
  }

  yRightAxisScale(min: any, max: any) {
    return { min: `${min}`, max: `${max}` };
  }

  yLeftTickFormat(data: any) {
    return `${data.toLocaleString()}`;
  }

  yRightTickFormat(data: any) {
    return `${data}%`;
  }
  /*
  **
  End of Combo Chart
  **
  */

  data: any;

  options: any;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['Vehiculo - Matricula - Matricula vehiculo particular', 'Vehiculo - Matricula - matricula motocicleta', 'Vehiculo - Lecantamiento Prenda - Lecantar Prenda'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
        }
      ]
    };


    this.options = {
      cutout: '80%',
      plugins: {
        legend: {
          display: true,
          labels: {
            color: textColor,
            usePointStyle: true,
          },
          position: 'right'
        }
      },
      responsive: true
    };
  }
}
