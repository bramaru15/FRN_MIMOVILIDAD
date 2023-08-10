import { buttonLink } from "./cardTramite";
  export class Mapa {
    idMapa: number;
    listButton: buttonLink[];
    nombre: string;
    descripcion:string;
    layers: FeatureLayer[];
    constructor(idMapa:number,listButton:buttonLink[], nombre:string, descripcion:string, layers: FeatureLayer[]){
        this.idMapa = idMapa;
        this.listButton=listButton;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.layers = layers;
    }
  }


  export class FeatureLayer{
    title: string;
    url: string;
    copyright: string;
    constructor(title:string, url:string, copyright: string){
        this.title = title;
        this.url = url;
        this.copyright = copyright;
    }
  }

export { buttonLink };
