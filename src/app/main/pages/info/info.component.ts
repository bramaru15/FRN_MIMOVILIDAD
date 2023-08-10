import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from "ngx-device-detector";
import { v4 as uuidv4 } from 'uuid';
import { DeviceUUID } from "device-uuid";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.sass']
})
export class InfoComponent implements OnInit {

  deviceInfo!: DeviceInfo;
  isDesktopDevice: boolean = false;
  isTablet: boolean = false;
  isMobile: boolean = false;
  

  constructor(private deviceService: DeviceDetectorService) {
    
  }


  ngOnInit() {
    // TODO document why this method 'ngOnInit' is empty
    const myId = uuidv4();

    //console.log("navigator: "+navigator);
    //console.log("navigator.userAgent: "+navigator.userAgent);
    //console.log("navigator.vendor: "+navigator.vendor);
    //console.log("navigator.language: "+navigator.language);
    //console.log("navigator.cookieEnabled: "+navigator.cookieEnabled);
    //console.log("navigator.permissions: "+navigator.permissions);

    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();


    //console.log("this.deviceInfo:"+this.deviceInfo);
    //console.log("this.isMobile:"+this.isMobile);
    //console.log("this.isTablet:"+this.isTablet);
    //console.log("this.isDesktopDevice:"+this.isDesktopDevice);
    
    //console.log("**********************");
    //console.log("uuid: "+myId);

    var lsUUID = this.getData("uuid");

    var devUUID =  new DeviceUUID().get();
    
    //console.log("lsUUID:"+lsUUID);
    //console.log("devUUID:"+devUUID);
    

    if (lsUUID == null ){
      //console.log("Sin UUID");
      this.saveData("uuid",myId);
    }else{
      //console.log("length lsUUID:"+lsUUID?.length);
    }


  }


  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public getData(key: string) {
    return localStorage.getItem(key)
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }


}
