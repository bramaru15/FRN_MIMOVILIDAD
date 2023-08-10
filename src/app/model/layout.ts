import { SafeHtml } from '@angular/platform-browser';

export interface menuMimo {
    nameMenu: string
    iconLink: string
    link: string
    isSubMenu: boolean
    subMenu?: menuMimo[]
}