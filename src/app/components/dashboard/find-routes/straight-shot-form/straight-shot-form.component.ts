import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {StraightRoute} from '../../../../models/straight-route';
import {Address} from '../../../../models/address';
import {GeocodingService} from '../../../../shared/services/geocoding.service';
import {GoogleMapsService} from '../../../../shared/services/google-maps.service';
@Component({
  selector: 'app-straight-shot-form',
  templateUrl: './straight-shot-form.component.html',
  styleUrls: ['./straight-shot-form.component.scss']
})
export class StraightShotFormComponent implements OnInit {
  routeDetails = new StraightRoute(null, new google.maps.LatLng(0,0) ,{address: '', city: '', state: ''}, new google.maps.LatLng(0,0) ,{address: '', city: '', state: ''} );
  @Input()  pos: google.maps.LatLng;
  @Output() positionObject = new EventEmitter<any>();

  @Input()  straightRoute: any;
  @Output() straightRouteObject = new EventEmitter<any>();
  constructor(
    public googleMapsService: GoogleMapsService,
    public geocodeService: GeocodingService
  ) { }

  ngOnInit() {
  }
  findAddress(address:Address){
    let position:google.maps.LatLng;
    this.geocodeService.codeAddress(address.address + '' + address.city + '' + address.state)
    .subscribe((result) => {
      position = new google.maps.LatLng (result[0].geometry.location.lat(), result[0].geometry.location.lng());
      this.positionObject.emit(position);
    });
    
  }

  onSubmit(){     
    console.log(this.routeDetails);                                                                                                                                                                                                                                        
    this.straightRouteObject.emit(this.routeDetails);
    
  }
}
