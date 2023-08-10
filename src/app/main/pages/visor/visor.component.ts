import { Component, ViewChild, ElementRef, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Map from '@arcgis/core/Map.js'
import MapView from "@arcgis/core/views/MapView.js";
import FeatureLayer from '@arcgis/core/layers/FeatureLayer.js';
import TileLayer from "@arcgis/core/layers/TileLayer.js";
import Basemap from "@arcgis/core/Basemap.js";
import Locate from '@arcgis/core/widgets/Locate.js';
import Legend from "@arcgis/core/widgets/Legend.js";
import Expand from "@arcgis/core/widgets/Expand.js";
import TimeExtent from "@arcgis/core/TimeExtent.js";
import { MapasService } from 'src/app/core/service/mapas.service';
import { Mapa } from 'src/app/model/mapa';
import * as intl from "@arcgis/core/intl.js";

import * as popupUtils from "@arcgis/core/support/popupUtils.js";
import { Observable, catchError, finalize, retry, tap, throwError } from 'rxjs';
import { MapPosition } from 'src/app/model/mapPosition';
import { TranslocoService } from '@ngneat/transloco';
import { SessionService } from 'src/app/core/service/session.service';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.scss']
})
export class VisorComponent implements OnInit, OnDestroy {

  public view: any = null;
  proceso: boolean = true;
  idMapa: any = null;
  mapa: Mapa = new Mapa(0, [], '', '', []);
  templayer!: FeatureLayer;
  lng: number = -74.080;
  lat: number = 4.6774;
  
  constructor(private rutaActiva: ActivatedRoute,private sessionService: SessionService, private mapasService: MapasService, private translocoService: TranslocoService) {
    if (!(navigator.onLine)) {
      this.sessionService.offlineRoot();
    }
  }

  @HostListener('window:offline', ['$event'])
  onOfflineEvent(event: Event) {
    // Aquí puedes realizar la acción que desees cuando el usuario queda sin conexión
    this.sessionService.offlineRoot();
  }

  // The <div> where we will place the map
  @ViewChild('mapViewDiv', { static: true }) private mapViewEl!: ElementRef;

  initializeMap(): Promise<any> {

    intl.setLocale("es-ES");

    const container = this.mapViewEl.nativeElement;

    const date = new Date();
    const [month, day, year] = [
      date.getMonth(),
      date.getDate(),
      date.getFullYear(),
    ];

    //Inicializar FeatureLayer
    const featureLayers: FeatureLayer[] = [];
    this.mapa.layers.forEach(element => {
      const layer = new FeatureLayer({
        title: element.title,
        url: element.url,
        copyright: element.copyright,
        useViewTime: false,
        timeExtent: new TimeExtent({
          start: new Date(year, month, day - 1),
          end: Date.now()
        })

      });

      featureLayers.push(layer);

    });

    //BaseMap
    let tileLayer = new TileLayer({
      url: "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/Mapa_Referencia/mapa_base_3857/MapServer"
    });

    let basemap = new Basemap({
      baseLayers: [
        tileLayer
      ],
      title: "basemap",
      id: "basemap"
    });

    //Crea Mapa
    const map = new Map({
      basemap: basemap,
      layers: featureLayers
    });


    //Crea vista
    const view = new MapView({
      map: map,
      container,
      center: [this.lng, this.lat],
      zoom: 13,
      constraints: {
        minScale: 1000,
        maxScale: 500000
      }
    });

    if (window.navigator.geolocation){
      // Widget de localizacion
      const locate = new Locate({
        view: view,
        label:"Ir a mi ubicación",
        useHeadingEnabled: false,
        goToOverride: function(view, options) {
          options.target.scale = 8000;
          return view.goTo(options.target);
        }
      });

      view.when(function(){
        // Create an instance of the Locate widget
        let locateWidget = locate;
        // and add it to the view's UI
        // Add widget to the top lef corner of the view
        view.ui.add(locate, "top-left");
        
        locateWidget.locate();
      
      });

    }



    //Widget de leyenda
    const legend = new Expand({
      content: new Legend({
        view: view,
        style: "card" // other styles include 'classic'
      }),
      view: view,
      expanded: true
    });

    // Add widget to the top right corner of the view
    view.ui.add(legend, "top-right");

    this.view = view;

    const toNiceName = function (text: string) {
      if (!text) {
        return '';
      }
      return text
        .toLowerCase()
        .split(/_|__|\s/)
        .join(' ');
    };

    const createMyPopupTemplate = function (layer: any) {
      const config = {
        fields: layer.fields.map((field: { name: any; type: any; alias: string; }) => (
          {
            name: field.name,
            type: field.type,
            alias: toNiceName(field.alias)
          }
        )),
        title: toNiceName(layer.title)
      };
      return popupUtils.createPopupTemplate(config);
    }

    for (const layer of featureLayers) {
      view.whenLayerView(layer).then(function (layerView) {
        const popupTemplate1 = layer.createPopupTemplate();
        layer.popupTemplate = popupTemplate1;
        const popupTemplate = createMyPopupTemplate(layer)
      });
    }


    return this.view.when();
  }

  getCurrentLocation() {
    // GeolocationCoordinates is global interface
    return new Observable<MapPosition>((observer) => {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {

          //console.log("Permiso concedido");
          const mapPosition = new MapPosition(position.coords.latitude, position.coords.longitude);
          // Observable will call the Observer’s next(value) method to provide data.
          //observer.next(position.coords);
          observer.next(mapPosition)
          // observer.complete() marks the observable as done. It means we can no longer emit any more values out of this observable
          observer.complete();
        },
        // observer.error puts observable into an error state. It means we can no longer emit any more values out of this observable
        (err) => {
          //console.log("Permiso Negado."+err.message);
          const mapPosition = new MapPosition(this.lat, this.lng);
          // Observable will call the Observer’s next(value) method to provide data.
          //observer.next(position.coords);
          observer.next(mapPosition)
          observer.complete();
        }
      );
    }).pipe(
      // When retry receives the error, it will resubscribe to that observable with the same kind of pipe. In rxjs, all observables are cold and unicast. That means whenever we subscribe to an observable, all the logic inside there is going to be executed right away. When retry operator resubscribes to this observable, that really means, all the source observable code re executes, because we are adding a second subcription to it. It does not somehow just magically get that logic to rerun. it actually resubscribes to that observable.
      // the argument to retry is an integer. `retry(1)` it is the number of times you want to retry your logic or really resubscribe. if you do not provide a number, and then it is going to try to resubscribe an infinite number of times.
      retry(1), // OPTIONAL
      // "TAP" generally used for notification or logging system. tap executes if the observable emits value which will be the first arg of tab. if it emits error, second arg of "tab" will run
      // the second argument is a function that gets called any time an error comes out
      // third argument can be a function that will be invoked any time the observable is marked as complete

      tap(
        () => {
          // create a notification service or //console.log it
          //console.log ('Got your location');
        }
        // instead of this, use catchError which returns an observable
        // (err) => {
        //   this.notificationsService.addError('failed to get your location');
        // }
      ),
      // it will be invoked if our source observable emits an error.
      catchError((error) => {
        // inside here we always two different things
        // 1st handle the error
        //console.log ('failed to get your location');
        // #2 return a new observable. that is the requirement of catchError operator
        // why do we return a new observable. that's the reason is why we want to use the catch operator instead of second arg to the tap function.
        // if we cannot fetch anything, we could show a default location
        // or we want to pass the error to the rest of the pipeline.

        return throwError(error);
      })
    );
  }

  ngOnInit(): void {



    //obtiene id mapa
    this.rutaActiva.params.subscribe(params => {
      this.idMapa = params['id_mapa'] || null;
    });

    this.mapa = this.mapasService.getMapaById(this.idMapa);

    this.getCurrentLocation().subscribe(
      position => {
        // Handle result
        //console.log("getPosition:")
        //console.log(position);
        this.lat = position.latitude;
        this.lng = position.longitude;
        //console.log("Latitud: "+this.lat);
        //console.log("Longitud: "+this.lng);

        // Initialize MapView and return an instance of MapView
        this.initializeMap().then(() => {
          // The map has been initialized
          ////console.log('The map is ready.');
          this.proceso = false;
        }).catch(err => console.log(err));

        let that = this;
        setTimeout(function () {
          that.proceso = false;
        }, 2000);
      },
      error => {
        //console.log("getPositionError: "+error)

        //console.log("Latitud: "+this.lat);
        //console.log("Longitud: "+this.lng);
      }
    );



    /*
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then(() => {
      // The map has been initialized
      ////console.log('The map is ready.');
      this.proceso = false;
    });

    var that = this;
    setTimeout(function () {
      that.proceso = false;
    }, 2000);*/
  }

  ngOnDestroy(): void {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }


}


