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
    return Observable.create((observer:Observer<google.maps.DirectionsResult>) => {
      this.directionsService.route({
        origin : routeObject.startAddress.address + routeObject.startAddress.city+ routeObject.startAddress.state,
        destination: routeObject.startAddress.address + routeObject.startAddress.city+ routeObject.startAddress.state,
        waypoints: this.FindWaypoints(routeObject),
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
        });
    });
      
    } else if (routeObject instanceof StraightRoute){
      //return route object without waypoints
      return Observable.create((observer:Observer<google.maps.DirectionsResult>) => {
        this.directionsService.route({
          origin : routeObject.startAddress.address + routeObject.startAddress.city+ routeObject.startAddress.state,
          destination: routeObject.endAddress.address + routeObject.endAddress.city+ routeObject.endAddress.state,
          travelMode: google.maps.TravelMode.WALKING 
        }, 
          (result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus) => {
              if (status === google.maps.DirectionsStatus.OK) {
                  observer.next(result);
                  observer.complete();
              } else {
                  console.log('Directions request failed due to: ' + status);
                  observer.error(status);
              }
          });
      });
    }
   }

 
  FindWaypoints (routeObject:CircleRoute):google.maps.DirectionsWaypoint[]{

      //gecode address to LatLng to find waypoints
     if (routeObject.startLocation.lat() == 0 && routeObject.startLocation.lng() == 0){
       console.log("start location is null");
       this.geocodeService.codeAddress(routeObject.startAddress.address + routeObject.startAddress.city + routeObject.startAddress.state).forEach(
        (results:google.maps.GeocoderResult[])=>{      
         // var lat:number = ;
         var location= new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
         // routeObject.startLocation= results[0].geometry.location;
         routeObject.startLocation = location;
        });
     }

      //calculate wayponts starting in starting direction
      switch(routeObject.heading){
        case 'N' :
        
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
         
      
        case 'NE' :
          
            var waypoints:google.maps.DirectionsWaypoint[] = [];
            waypoints.push({
              location: new google.maps.LatLng(routeObject.startLocation.lat() + ((1/69)*(routeObject.radius/11.314)), routeObject.startLocation.lng() + ((1/69)*(routeObject.radius/11.314))),
              stopover: false
            });
            waypoints.push({
              location: new google.maps.LatLng(routeObject.startLocation.lat(), routeObject.startLocation.lng()+((1/69)*(routeObject.radius/5.657))),
              stopover: false
            });
            waypoints.push({
              location: new google.maps.LatLng(routeObject.startLocation.lat() - ((1/69)*(routeObject.radius/11.314)), routeObject.startLocation.lng() + ((1/69)*(routeObject.radius/11.314))),
              stopover: false
            });
            
            routeObject.waypoints = waypoints;
            routeObject.endAddress = routeObject.startAddress;
        return waypoints;
        case 'NW' :
          var waypoints:google.maps.DirectionsWaypoint[] = [];
          waypoints.push({
            location: new google.maps.LatLng(routeObject.startLocation.lat() + ((1/69)*(routeObject.radius/11.314)), routeObject.startLocation.lng() + ((1/69)*(routeObject.radius/11.314))),
            stopover: false
          });
          waypoints.push({
            location: new google.maps.LatLng(routeObject.startLocation.lat(), routeObject.startLocation.lng()+((1/69)*(routeObject.radius/5.657))),
            stopover: false
          });
          waypoints.push({
            location: new google.maps.LatLng(routeObject.startLocation.lat() - ((1/69)*(routeObject.radius/11.314)), routeObject.startLocation.lng() + ((1/69)*(routeObject.radius/11.314))),
            stopover: false
          });
          
          routeObject.waypoints = waypoints;
          routeObject.endAddress = routeObject.startAddress;
          return waypoints;
        case 'S' :
          var waypoints:google.maps.DirectionsWaypoint[] = [];
          waypoints.push({
            location: new google.maps.LatLng(routeObject.startLocation.lat() - ((1/69)*(routeObject.radius/4)) , routeObject.startLocation.lng()),
            stopover: false
          });
          waypoints.push({
            location: new google.maps.LatLng(routeObject.startLocation.lat() - ((1/69)*(routeObject.radius/4)), routeObject.startLocation.lng()- ((1/69)*(routeObject.radius/4))),
            stopover: false
          });
          waypoints.push({
            location: new google.maps.LatLng(routeObject.startLocation.lat() , routeObject.startLocation.lng()- ((1/69)*(routeObject.radius/4))),
            stopover: false
          });
          
          routeObject.waypoints = waypoints;
          routeObject.endAddress = routeObject.startAddress;
          return waypoints;
        case 'SE' :
          var waypoints:google.maps.DirectionsWaypoint[] = [];
          waypoints.push({
            location: new google.maps.LatLng(routeObject.startLocation.lat() + ((1/69)*(routeObject.radius/11.314)), routeObject.startLocation.lng() + ((1/69)*(routeObject.radius/11.314))),
            stopover: false
          });
          waypoints.push({
            location: new google.maps.LatLng(routeObject.startLocation.lat(), routeObject.startLocation.lng()+((1/69)*(routeObject.radius/5.657))),
            stopover: false
          });
          waypoints.push({
            location: new google.maps.LatLng(routeObject.startLocation.lat() - ((1/69)*(routeObject.radius/11.314)), routeObject.startLocation.lng() + ((1/69)*(routeObject.radius/11.314))),
            stopover: false
          });
          
          routeObject.waypoints = waypoints;
          routeObject.endAddress = routeObject.startAddress;
          return waypoints;
        case 'SW' :
            var waypoints:google.maps.DirectionsWaypoint[] = [];
            waypoints.push({
              location: new google.maps.LatLng(routeObject.startLocation.lat() + ((1/69)*(routeObject.radius/11.314)), routeObject.startLocation.lng() + ((1/69)*(routeObject.radius/11.314))),
              stopover: false
            });
            waypoints.push({
              location: new google.maps.LatLng(routeObject.startLocation.lat(), routeObject.startLocation.lng()+((1/69)*(routeObject.radius/5.657))),
              stopover: false
            });
            waypoints.push({
              location: new google.maps.LatLng(routeObject.startLocation.lat() - ((1/69)*(routeObject.radius/11.314)), routeObject.startLocation.lng() + ((1/69)*(routeObject.radius/11.314))),
              stopover: false
            });
            
            routeObject.waypoints = waypoints;
            routeObject.endAddress = routeObject.startAddress; 
            return waypoints;
        case 'E' :
          var waypoints:google.maps.DirectionsWaypoint[] = [];
          waypoints.push({
            location: new google.maps.LatLng(routeObject.startLocation.lat() , routeObject.startLocation.lng()+ ((1/69)*(routeObject.radius/4))),
            stopover: false
          });
          
          waypoints.push({
            location: new google.maps.LatLng(routeObject.startLocation.lat() - ((1/69)*(routeObject.radius/4)), routeObject.startLocation.lng()+ ((1/69)*(routeObject.radius/4))),
            stopover: false
          });
          waypoints.push({
            location: new google.maps.LatLng(routeObject.startLocation.lat() - ((1/69)*(routeObject.radius/4)), routeObject.startLocation.lng()),
            stopover: false
          });
          
          
          routeObject.waypoints = waypoints;
          routeObject.endAddress = routeObject.startAddress;
          return waypoints;
     
        case 'W' :
          var waypoints:google.maps.DirectionsWaypoint[] = [];
          waypoints.push({
            location: new google.maps.LatLng(routeObject.startLocation.lat() , routeObject.startLocation.lng()- ((1/69)*(routeObject.radius/4))),
            stopover: false
          });
          
          waypoints.push({
            location: new google.maps.LatLng(routeObject.startLocation.lat() + ((1/69)*(routeObject.radius/4)), routeObject.startLocation.lng()- ((1/69)*(routeObject.radius/4))),
            stopover: false
          });
          waypoints.push({
            location: new google.maps.LatLng(routeObject.startLocation.lat() + ((1/69)*(routeObject.radius/4)), routeObject.startLocation.lng()),
            stopover: false
          });
          
          
          routeObject.waypoints = waypoints;
          routeObject.endAddress = routeObject.startAddress;
          return waypoints;    
        
      }
    
  }

}


