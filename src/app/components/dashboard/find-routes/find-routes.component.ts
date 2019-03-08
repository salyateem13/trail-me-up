import { Component, OnInit, AfterContentInit } from '@angular/core';
import * as $ from 'jquery';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';
import {GoogleMapsService} from '../../../shared/services/google-maps.service'
import { Tabs } from './tabs/tabs';
import {LocationService} from '../../../shared/services/location.service';

@Component({
  selector: 'app-find-routes',
  templateUrl: './find-routes.component.html',
  styleUrls: ['./find-routes.component.scss']
})

export class FindRoutesComponent implements OnInit{
  @ViewChild('poop') mapElement: any;
  @ViewChild('poop2') mapElement2: any;
  map: google.maps.Map;
  public pos;

  public c1isShown: boolean;
  public c2isShown: boolean;

 
  marker: google.maps.Marker;
 

  currentLat: any = 100000;
  currentLong: any = 100000;

  directionsService: google.maps.DirectionsService;
  directionsRequest :
  {
    origin: google.maps.LatLng | String | google.maps.Place,
    destination: google.maps.LatLng | String | google.maps.Place,
    travelMode: google.maps.TravelMode,
    transitOptions: google.maps.TransitOptions,
    drivingOptions: google.maps.DrivingOptions,
    unitSystem: google.maps.UnitSystem,
    waypoints: google.maps.DirectionsWaypoint,
    optimizeWaypoints: Boolean,
    provideRouteAlternatives: Boolean,
    avoidFerries: Boolean,
    avoidHighways: Boolean,
  
  };

  waypoints: google.maps.DirectionsWaypoint[] ;

  public tabs: String[];
  constructor(
    public mapService: GoogleMapsService,
    public locationService: LocationService
  ) {
   
   }

   
   ngOnInit(): void {
    //set circular rotue form to true visibile
    this.c1isShown = true;
    this.c2isShown= false;
    this.tabs= ['test', 'test2', 'test4'];;

    var mapProp = {
      center: new google.maps.LatLng(44.5793, -90.8143),
      zoom: 3,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProp);
    
  }

  public toggleA(): void { 

      this.c1isShown= true;
      this.c2isShown = false;
      console.log("c1 =" + this.c1isShown);
      console.log("c2 =" + this.c2isShown);
 
  
}
  public toggleB(): void { 
 
    this.c1isShown= false;
    this.c2isShown = true;
    console.log("c1 =" + this.c1isShown);
    console.log("c2 =" + this.c2isShown);

  

  }



  onSubmitRoute(routeObject){
      this.mapService.FindRoute(routeObject);
  }
  onFindMe(position: any){
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);
    this.map.setZoom(15);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Starting Location'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

 
  
 

}
