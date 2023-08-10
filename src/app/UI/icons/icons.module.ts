import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import {
  Camera,
  Heart,
  Github,
  AlertTriangle,
  ChevronDown, 
  Calendar, 
  EyeOff, 
  Eye, 
  CheckCircle, 
  Info, 
  AlertCircle, 
  X, 
  FileText, 
  Home, 
  Bell, 
  ArrowLeft, 
  ArrowRight, 
  Search,
  ArrowLeftCircle, 
  ArrowRightCircle,
  Filter,
  ChevronUp,
  ChevronRight
} from 'angular-feather/icons';

const icons = {
  Camera,
  Heart,
  Github,
  AlertTriangle,
  ChevronDown,
  Calendar,
  EyeOff,
  Eye,
  CheckCircle,
  Info,
  AlertCircle,
  X,
  FileText,
  Home,
  Bell,
  ArrowLeft,
  ArrowRight,
  Search,
  ArrowLeftCircle, 
  ArrowRightCircle,
  Filter,
  ChevronUp,
  ChevronRight
};


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }
