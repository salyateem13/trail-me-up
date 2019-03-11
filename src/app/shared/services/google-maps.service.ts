import { Injectable } from '@angular/core';
import {Route} from '../../models/route';
import {CircleRoute} from '../../models/circle-route';
import {StraightRoute} from '../../models/straight-route';
import { Observable, Observer,  of, BehaviorSubject } from 'rxjs';

import { Address } from 'src/app/models/address';
import { debug } from 'util';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  

  directionsService: google.maps.DirectionsService;
  directionsRequest :
  {
    origin: google.maps.LatLng | String | google.maps.Place,
    destination: google.maps.LatLng | String | google.maps.Place,
    travelMode: google.maps.TravelMode,
    transitOptions: google.maps.TransitOptions,
    drivingOptions: google.maps.DrivingOptions,
    unitSystem: google.maps.UnitSystem,
    waypoints: google.maps.DirectionsWaypoint [],
    optimizeWaypoints: Boolean,
    provideRouteAlternatives: Boolean,
    avoidFerries: Boolean,
    avoidHighways: Boolean,
  
  };

  map: google.maps.Map;
  totalDistance: any = 2;
  isTracking = false;
  marker: google.maps.Marker;
  currentLat: any;
  currentLong: any;
  
  constructor() { 
    this.directionsService = new google.maps.DirectionsService();
     
  }
  
   GetRoute(routeObject:Route):Observable<google.maps.DirectionsResult>{
    
    
    if( routeObject instanceof CircleRoute){
      //find waypoints
     ///var routeWithWaypoints= this.FindWaypoints(routeObject);
      
      //return route object with waypoints
      var wpt = this.FindWaypoints(routeObject);
      var endAdrs = routeObject.endAddress.toString();
    return Observable.create((observer:Observer<google.maps.DirectionsResult>) => {
      this.directionsService.route({
        origin : '2055 Shaudi Ln Atlanta GA 30345',
        destination: '2055 Shaudi Ln Atlanta GA 30345',
        waypoints: wpt,
    
        //waypoints: routeWithWaypoints,
        
        travelMode: google.maps.TravelMode.WALKING

      }, 
        (result, status: google.maps.DirectionsStatus) => {
            if (status === google.maps.DirectionsStatus.OK) {
                observer.next(result);
                observer.complete();
            } else {
                console.log('Directions request failed due to: ' + status);
                observer.error(status);
            }
        }
        
      
        );
    });
      
    } else if (routeObject instanceof StraightRoute){
      //return route object without waypoints
      return Observable.create((observer:Observer<google.maps.DirectionsResult>) => {
        this.directionsService.route({
          origin : routeObject.startAddress.toString(),
          destination: routeObject.endAddress.toString(),
          travelMode: google.maps.TravelMode.WALKING 
  
        }, 
          (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
              if (status === google.maps.DirectionsStatus.OK) {
                  observer.next(result);
                  observer.complete();
              } else {
                  console.log('Geocoding service: geocoder failed due to: ' + status);
                  observer.error(status);
              }
          }
          
        
          );
      });
    }
    
    
   
    
   }
  
  
  // AddressToCoord(address: Address){
  //   var geocoder = new google.maps.Geocoder;
  
    
  //   geocoder.geocode({'address' : address.toString()}, function (result, status){
  //     if (status === google.maps.GeocoderStatus.OK) {
  //       console.log(result[0].geometry.location);
  //     }
  //     else {
  //       alert('Geocode was not successful for the following reason: ' + status);
  //     }
  //   });
  
  // }

  //   CoordToAddress(position):Observable<Address>{
  //   var geocoder = new google.maps.Geocoder;
  //   var latLng = { lat: position.coords.latitude, lng: position.coords.longitude};
  //   var address: Address;
  //   geocoder.geocode({'location':latLng}, function (result, status){
  //     if(status === google.maps.GeocoderStatus.OK){
  //       if (result[0]) {
  //           let address1: Address = {"address": result[0].address_components[0].long_name + " " + result[0].address_components[1].short_name, "city": result[0].address_components[2].short_name, "state":result[0].address_components[4].short_name};
  //           this.address = address1;
  //           return address;
  //       } else {
  //         window.alert('No results found');
  //       }
  //     }else {
  //       window.alert('Geocoder failed due to: ' + status); 

  //     }
  //   });
  //   return Observable.create(address);

  // }

  FindWaypoints (routeObject:CircleRoute):google.maps.DirectionsWaypoint[]{
      //calculate wayponts starting in starting direction
      switch(routeObject.heading){
        case 'N' :
        
         




        // wp1 = " 5235 Abbey Ln Atlanta GA 30345";

        // wp2 = " 5551 Briarcliff rd Atlanta GA 30345";
        // wp3= "2453 Clairemont Rd Atlanta GA 30345"
        
         var waypoints:google.maps.DirectionsWaypoint[] = [];
         waypoints.push({
           location: new google.maps.LatLng(routeObject.startLocation.coords.latitude , routeObject.startLocation.coords.longitude+ ((1/69)*(routeObject.radius/4))),
           stopover: false
         });
         waypoints.push({
          location: new google.maps.LatLng(routeObject.startLocation.coords.latitude + ((1/69)*(routeObject.radius/4)), routeObject.startLocation.coords.longitude+ ((1/69)*(routeObject.radius/4))),
          stopover: false
        });
        waypoints.push({
          location: new google.maps.LatLng(routeObject.startLocation.coords.latitude + ((1/69)*(routeObject.radius/4)), routeObject.startLocation.coords.longitude),
          stopover: false
        });
         
         routeObject.waypoints = waypoints;
         routeObject.endAddress = routeObject.startAddress;
         return waypoints;
         
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


