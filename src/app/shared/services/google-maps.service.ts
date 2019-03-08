import { Injectable } from '@angular/core';
import {Route} from '../../models/route';
import {CircleRoute} from '../../models/circle-route';
import {StraightRoute} from '../../models/straight-route';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { Address } from 'src/app/models/address';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  



  map: google.maps.Map;
  totalDistance: any = 2;
  isTracking = false;
  marker: google.maps.Marker;
  currentLat: any;
  currentLong: any;
  constructor() { 
    
     
  }
  
   
  
  FindRoute(routeObject:Route){
    console.log(routeObject);
    //let routeStartPos = routeObject.address;
      if( routeObject instanceof CircleRoute){
        //find waypoints
        //let routeWaypoints [] = this.FindWaypoints(routeObject.address);
        //return route object with waypoints
      } else if (routeObject instanceof StraightRoute){
        //return route object without waypoints
      }
    
  } 

  AddressToCoord(address: Address){
    var geocoder = new google.maps.Geocoder;
  
    
    geocoder.geocode({'address' : address.toString()}, function (result, status){
      if (status === google.maps.GeocoderStatus.OK) {
        console.log(result[0].geometry.location);
      }
      else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  
  }

    CoordToAddress(position):Observable<Address>{
    var geocoder = new google.maps.Geocoder;
    var latLng = { lat: position.coords.latitude, lng: position.coords.longitude};
    var address: Address;
    geocoder.geocode({'location':latLng}, function (result, status){
      if(status === google.maps.GeocoderStatus.OK){
        if (result[0]) {
            let address1: Address = {"address": result[0].address_components[0].long_name + " " + result[0].address_components[1].short_name, "city": result[0].address_components[2].short_name, "state":result[0].address_components[4].short_name};
            this.address = address1;
            return address;
        } else {
          window.alert('No results found');
        }
      }else {
        window.alert('Geocoder failed due to: ' + status); 

      }
    });
    return Observable.create(address);

  }
  FindWaypoints (startPos, startHeading, endPos?){
    if (endPos){
        ///calculate route to the end point
        //call findRoute(startPos, endPos)
    }else{
      //calculate wayponts starting in starting direction
      switch(startHeading){
        case 'N' :
          break;
        case 'NE' :
          break;
        case 'NW' :
          break;
        case 'S' :
          break;
        case 'SE' :
          break;
        case 'SW' :
          break;   
        case 'E' :
          break;   
        case 'W' :
          break;      
        
      }
    }
  }

}


