import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ConfirmationService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { DividerModule } from "primeng/divider";
import {SplitterModule} from 'primeng/splitter';
import {SkeletonModule} from 'primeng/skeleton';
import {KeyFilterModule} from 'primeng/keyfilter'
import { InputMaskModule } from 'primeng/inputmask';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PasswordModule,
    InputNumberModule,
    InputTextModule,
    CardModule,
    DropdownModule,
    ButtonModule,
    SidebarModule,
    AvatarModule,
    AvatarGroupModule,
    DividerModule,
    SplitterModule,
    SkeletonModule,
    KeyFilterModule,
    InputMaskModule,
    ChartModule
  ],
  exports: [
    CommonModule,
    PasswordModule,
    InputNumberModule,
    InputTextModule,
    CardModule,
    DropdownModule,
    ButtonModule,
    SidebarModule,
    AvatarModule,
    AvatarGroupModule,
    DividerModule,
    SplitterModule,
    SkeletonModule,
    KeyFilterModule,
    InputMaskModule,
    ChartModule
  ],
  providers: [ConfirmationService],
})
export class PrimengModule { }
