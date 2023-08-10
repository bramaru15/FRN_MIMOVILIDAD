import { Injectable } from '@angular/core';
import { Mapa, FeatureLayer } from 'src/app/model/mapa';


const MAPAS = [
  new Mapa(1,
    [{
      name: "Ciclorrutas",
      link:"",
      linkVus:false,
      versionCardIcon:'v2',
      categoria: "Centro de ayuda",
      tipo_tramite: "Asistente Virtual",
      subText: "<span>Descubre las rutas exclusivas para bicicletas en Bogotá.</span>",
      btnVersion: "v2",
      styleWithText: "300%",
      linkIcon: "assets/icons/bicicleta_icono.svg",
      direciona: false
    }],
    "Ciclorrutas"
    , "Descubre las rutas exclusivas para bicicletas en Bogotá."
    , [new FeatureLayer("Ciclorrutas",
                        "https://sig.simur.gov.co/arcgis/rest/services/Cicloinfraestructura/Red_Ciclorruta/MapServer/0",
                        "SDM"
                        )]
   ),
   new Mapa(2
    ,[{
      name: "Ciclovías",
      link:"",
      linkVus:false,
      versionCardIcon:'v2',
      categoria: "Centro de ayuda",
      tipo_tramite: "Asistente Virtual",
      subText: "<span>Disfruta de los corredores recreo-deportivos de la ciudad. Encuentra las ubicaciones de las ciclovías del <strong>IDRD</strong>.</span>",
      btnVersion: "v2",
      styleWithText: "300%",
      linkIcon: "assets/icons/ciclovia.svg",
      direciona: false
    }]
    ,"Ciclovías IDRD"
    ,"Disfruta de los corredores recreo-deportivos de la ciudad. Encuentra las ubicaciones de las ciclovías del IDRD."
    , [new FeatureLayer("Recreovía",
                        "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/recreaciondeporte/recreacion/MapServer/0",
                        "SDM"
                        ),
                        new FeatureLayer("Ciclovía",
                        "https://serviciosgis.catastrobogota.gov.co/arcgis/rest/services/recreaciondeporte/recreacion/MapServer/1",
                        "SDM",
                      )]
  ),
   new Mapa(3
    ,[{
      name: "Cicloparqueaderos",
      link:"",
      linkVus:false,
      versionCardIcon:'v2',
      categoria: "Centro de ayuda",
      tipo_tramite: "Asistente Virtual",
      subText: "<span>Encuentra los mejores lugares para estacionar tu bicicleta. Descubre las ubicaciones de los cicloparqueaderos en la ciudad.</span>",
      btnVersion: "v2",
      styleWithText: "300%",
      linkIcon: "assets/icons/cicloparquedero.svg",
      direciona: false
    }]
    ,"Cicloparqueaderos"
    ,"Encuentra los mejores lugares para estacionar tu bicicleta. Descubre las ubicaciones de los cicloparqueaderos en la ciudad."
    , [new FeatureLayer("Cicloparqueadero Ocasional",
                        "https://sig.simur.gov.co/arcgis/rest/services/Cicloinfraestructura/CicloparqueaderoOcasional/MapServer/0",
                        "SDM"
      )
    ]
   ),
   new Mapa(4
    ,[{
      name: "Zonas de parqueo pago",
      link:"",
      linkVus:false,
      versionCardIcon:'v2',
      categoria: "Centro de ayuda",
      tipo_tramite: "Asistente Virtual",
      subText: "<span>Localiza las zonas autorizadas de estacionamiento en vía de Bogotá y planifica tu llegada con anticipación.</span>",
      btnVersion: "v2",
      styleWithText: "300%",
      linkIcon: "assets/icons/zona parqueadero.svg",
      direciona: false
    }]
    ,"Zonas de parqueo pago"
    ,"Localiza las zonas autorizadas de estacionamiento en vía de Bogotá y planifica tu llegada con anticipación."
    , [new FeatureLayer("Zonas de parqueo pago",
                        "https://services2.arcgis.com/NEwhEo9GGSHXcRXV/ArcGIS/rest/services/Proyecto_EEV/FeatureServer/0",
                        "SDM"
    )]
   ),
   new Mapa(5
    ,[{
      name: "Incidentes en la vía",
      link:"",
      linkVus:false,
      versionCardIcon:'v2',
      categoria: "Centro de ayuda",
      tipo_tramite: "Asistente Virtual",
      subText: "<span>Infórmate sobre los incidentes reportados en las calles de Bogotá. Conoce las ubicaciones y evita contratiempos en tu camino.</span>",
      btnVersion: "v2",
      styleWithText: "300%",
      linkIcon: "assets/icons/problemas via.svg",
      direciona: false
    }]
    ,"Incidentes en la vía"
    ,"Infórmate sobre los incidentes reportados en las calles de Bogotá. Conoce las ubicaciones y evita contratiempos en tu camino."
    , [new FeatureLayer("Incidentes en la vía",
                        "https://sig.simur.gov.co/arcgis/rest/services/Hosted/V1_Incidents/FeatureServer/0",
                        "SDM"
    )]
   ),
   new Mapa(6
    ,[{
      name: "Obras en la vía",
      link:"",
      linkVus:false,
      versionCardIcon:'v2',
      categoria: "Centro de ayuda",
      tipo_tramite: "Asistente Virtual",
      subText: "<span>Conoce los cierres viales por obras o eventos autorizados en Bogotá. Planifica tu ruta y evita retrasos.</span>",
      btnVersion: "v2",
      styleWithText: "300%",
      linkIcon: "assets/icons/obra via.svg",
      direciona: false
    }]
    ,"Obras en la vía"
    ,"Conoce los cierres viales por obras o eventos autorizados en Bogotá. Planifica tu ruta y evita retrasos. "
    , [new FeatureLayer("Comite de Obra de Infraestructura",
                        "https://sig.simur.gov.co/arcgis/rest/services/PMT/PMT_Publicacion_Vigentes_Provisional/MapServer/0",
                        "SDM"
                        ),
       new FeatureLayer("Comite de Obra de Servicios Publicos",
                        "https://sig.simur.gov.co/arcgis/rest/services/PMT/PMT_Publicacion_Vigentes_Provisional/MapServer/1",
                        "SDM"
                        ),
        new FeatureLayer("Comite de Obra de Infraestructura en Tramo Vial",
                        "https://sig.simur.gov.co/arcgis/rest/services/PMT/PMT_Publicacion_Vigentes_Provisional/MapServer/2",
                        "SDM"
                        ),
        new FeatureLayer("Comite de Obra de Servicios Publicos en Tramo de Via",
                        "https://sig.simur.gov.co/arcgis/rest/services/PMT/PMT_Publicacion_Vigentes_Provisional/MapServer/3",
                        "SDM"
                        ),
        new FeatureLayer("Comite de Obra de Infraestructura en Parques",
                        "https://sig.simur.gov.co/arcgis/rest/services/PMT/PMT_Publicacion_Vigentes_Provisional/MapServer/4",
                        "SDM"
                        ),
        new FeatureLayer("Desvio",
                        "https://sig.simur.gov.co/arcgis/rest/services/PMT/PMT_Publicacion_Vigentes_Provisional/MapServer/6",
                        "SDM"
                        )
                      ]
   )
  ]
;

@Injectable({
  providedIn: 'root'
})
export class MapasService {

  getMapas(): PromiseLike<Mapa[]> {
      return Promise.resolve<Mapa[]>(MAPAS);
  }

  getMapaById( idMapa:number): Mapa {
    const mapa =  MAPAS.filter(item => item.idMapa == idMapa )[0] ;
    return mapa;
  }

}
