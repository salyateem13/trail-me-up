import { Injectable } from '@angular/core';
 

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
  
   
  FindMe() {
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
        console.log(position);
        console.log("Hello fucking world");
      });
    } else {
      console.log("Hello fucking world");
      alert("Geolocation is not supported by this browser.");
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    }
    else {
      this.marker.setPosition(location);
    }
  }

}
