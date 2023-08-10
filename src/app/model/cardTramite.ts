export interface buttonCardTramite {
    type: 'fecha' | 'patio' | 'comparendo' | 'estado' | 'multa' | 'ubicacion' | 'agenda';
    name: string;
    estadoButton: boolean;
    estado?: 'activo' | 'inactivo';
    text?: string;
    linkUbicacion?: string;
    icalendar?: icalendar;
}

export interface ifecha {
    year: number;
    month: number;
    date: number;
    hour: number;
    minute: number;
}

export interface icalendar {
    fecha: ifecha;
    summary: string;
    location: string;
    description: string;
}

export interface dataCardTramite {
    linkIcon: string;
    title: string;
    categoria?: string;
    tipo_tramite?: string;
    linkButtonMas: string;
    linkButtonUno: string;
    linkVusBtnUno?: boolean;
    linkVusBtnMas?: boolean;
    textButton: string;
    listaButtonCardTramite: buttonCardTramite[];
}

export interface buttonLink {
    versionCardIcon?:'v1' | 'v2';
    categoria?: string;
    styleWithText?: string; 
    tipo_tramite?: string;
    name: string;
    link: string;
    linkIcon: string;
    linkVus: boolean;
    linkImg?: string;
    subText?: string;
    btnVersion?: 'v1' | 'v2';
    btnList?: btnList[];
    btnText?: string; 
    direciona: boolean;
    estado?: boolean;
    registroTablero?: boolean;
    tamanoTitulo?:'h1' | 'h2' | 'h3';
    estiloRadio?: boolean;
    nameTablero?: string;
    accesibilidad?: string;
}

export interface btnList {
    btnVersion: 'v1' | 'v2';
    btnText: string;
    link: string;
    direciona: boolean;
    nameTablero?: string;
    accesibilidad?: string;
}

export interface listSubTramites {
    title: string;
    filter?: string[];
    subtramite: buttonLink[]
}

export interface dataCardHeader {
    title: string;
    text: string;
}