import { Injectable } from '@angular/core';
import {Route} from '../../models/route';
import {CircleRoute} from '../../models/circle-route';
import {StraightRoute} from '../../models/straight-route';
import { Observable, Observer,  of, BehaviorSubject } from 'rxjs';
import {GeocodingService} from './geocoding.service';
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
  
  constructor(
    public geocodeService: GeocodingService
  ) { 
    this.directionsService = new google.maps.DirectionsService();
    
     
  }
  
   GetRoute(routeObject:Route):Observable<google.maps.DirectionsResult>{
    
    
    if( routeObject instanceof CircleRoute){
      //find waypoints
     ///var routeWithWaypoints= this.FindWaypoints(routeObject);
      
      //return route object with waypoints
      var wpt = this.FindWaypoints(routeObject);
      // var endAdrs = JSON.stringify(routeObject.startAddress.toString() )  ;
      // console.log(JSON.stringify(routeObject.startAddress.toString() ));
    return Observable.create((observer:Observer<google.maps.DirectionsResult>) => {
      this.directionsService.route({
        origin : routeObject.startAddress.address + routeObject.startAddress.city+ routeObject.startAddress.state,
        destination: routeObject.startAddress.address + routeObject.startAddress.city+ routeObject.startAddress.state,
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

 
  FindWaypoints (routeObject:CircleRoute):google.maps.DirectionsWaypoint[]{

      //gecode address to LatLng to find waypoints
     
      var geoResult= this.geocodeService.codeAddress(routeObject.startAddress.address + routeObject.startAddress.city + routeObject.startAddress.state).forEach(
        (results:google.maps.GeocoderResult[])=>{
          
         // var lat:number = ;
         var location= new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
         // routeObject.startLocation= results[0].geometry.location;
         routeObject.startLocation = location;
        });
        
     

      //calculate wayponts starting in starting direction
      switch(routeObject.heading){
        case 'N' :
        
         




        // wp1 = " 5235 Abbey Ln Atlanta GA 30345";

        // wp2 = " 5551 Briarcliff rd Atlanta GA 30345";
        // wp3= "2453 Clairemont Rd Atlanta GA 30345"
        
         var waypoints:google.maps.DirectionsWaypoint[] = [];
         waypoints.push({
           location: new google.maps.LatLng(routeObject.startLocation.lat() , routeObject.startLocation.lng()+ ((1/69)*(routeObject.radius/4))),
           stopover: false
         });
         waypoints.push({
          location: new google.maps.LatLng(routeObject.startLocation.lat() + ((1/69)*(routeObject.radius/4)), routeObject.startLocation.lng()+ ((1/69)*(routeObject.radius/4))),
          stopover: false
        });
        waypoints.push({
          location: new google.maps.LatLng(routeObject.startLocation.lat() + ((1/69)*(routeObject.radius/4)), routeObject.startLocation.lng()),
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


