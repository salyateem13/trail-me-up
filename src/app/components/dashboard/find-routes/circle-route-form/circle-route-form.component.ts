import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import {CircleRoute} from '../../../../models/circle-route';
import {GoogleMapsService} from '../../../../shared/services/google-maps.service';
import { emit } from 'cluster';
import { BehaviorSubject } from 'rxjs';
import { LocationService } from 'src/app/shared/services/location.service';
import { MapService } from 'src/app/shared/services/map.service';
@Component({
  selector: 'app-circle-route-form',
  templateUrl: './circle-route-form.component.html',
  styleUrls: ['./circle-route-form.component.scss']
})
export class CircleRouteFormComponent implements OnInit {
  totalDistance: any = 2;
  routeDetails = new CircleRoute(null, '', null , '2','N');
  
  @Input()  pos: Position;
  @Output() positionObject = new EventEmitter<any>();

  @Input()  circleRoute: any;
  @Output() circleRouteObject = new EventEmitter<any>();

  // Marker title.
  title: string;

  // Info window.
  content: string;

  // Address to be searched.
  address: string;

  // Warning flag & message.
  warning: boolean;
  message: string;

  position: google.maps.LatLng;

  // Center map. Required.
  center: google.maps.LatLng;


  constructor(
    public googleMapsService: GoogleMapsService,
    public locationService: LocationService,
    public mapService: MapService
  ) { }


  ngOnInit() {
    this.positionObject.emit(this.pos);
  }


  valueChanged(e) {
  
    this.totalDistance =e;
}


//   findMe(){

//     var options = {
//       enableHighAccuracy: true,
//       timeout: 15000,
//       maximumAge: 0
//     };

    

//     function error(err) {
//       console.warn(`ERROR(${err.code}): ${err.message}`);
//     }
// 1

//       navigator.geolocation.getCurrentPosition((position)=>{
//         this.position = position;
//         this.routeDetails.startLocation= position;
//         this.mapsService.CoordToAddress(position)
//           .subscribe(address => this.routeDetails.startAddress = address);
//           console.log("Current Address from Geolocation " + this.routeDetails.startAddress);
//         this.positionObject.emit(position);
//       }, error, options);
      
//   }




   findMe(){
    this.warning = false;
    this.message = "";

    if (navigator.geolocation) {
        this.locationService.getCurrentPosition().subscribe(
            (position: Position) => {
              this.positionObject.emit(position);
             },
            (error: PositionError) => {
                if (error.code > 0) {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            this.message = 'permission denied';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            this.message = 'position unavailable';
                            break;
                        case error.TIMEOUT:
                            this.message = 'position timeout';
                            break;
                    }
                    this.warning = true;
                }
            },
            () => console.log('Geolocation service: completed.'));

    } else {
        this.message = "browser doesn't support geolocation";
        this.warning = true;
    }




    
    // this.locationService.FetchLocation().subscribe((data) => {
    //   this.pos = data;
    //   this.locationService.SetLocation(data);
    // });

    //    this.pos.next(positionFromService);
    //   this.pos.subscribe( val => {
    //   console.log(val);
    // });
    
  }

   // Sets the marker & the info window.
   setMarker(latLng: google.maps.LatLng, title: string, content: string): void {
    this.mapService.deleteMarkers();
    // Sets the marker.
    this.position = latLng;
    this.title = title;
    // Sets the info window.
    this.content = content;
}


   

  //emit routeObject to paremnt component
    onSubmit(){                                                                                                                                                                                                                                             
      this.circleRouteObject.emit(this.routeDetails);
      
    }

}
