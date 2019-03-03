import { Component, OnInit, NgZone} from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";
import { Router } from "@angular/router";

import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {
  deviceInfo = null;

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    private deviceService: DeviceDetectorService
  ) { 
    this.epicFunction();
  }

  ngOnInit() {
    
  }
  epicFunction() {
    console.log('hello `Home` component');
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    const isDesktopDevice = this.deviceService.isDesktop();
    console.log(this.deviceInfo);
    console.log(isMobile);  // returns if the device is a mobile device (android / iPhone / windows-phone etc)
    console.log(isTablet);  // returns if the device us a tablet (iPad etc)
    console.log(isDesktopDevice); // returns if the app is running on a Desktop browser.
  }
  
}
