import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import {CircleRoute} from '../../../../models/circle-route';
import {GoogleMapsService} from '../../../../shared/services/google-maps.service';
import { BehaviorSubject } from 'rxjs';
import { LocationService } from 'src/app/shared/services/location.service';
import { MapService } from 'src/app/shared/services/map.service';
import {Address} from '../../../../models/address';
import { GeocodingService } from 'src/app/shared/services/geocoding.service';
@Component({
  selector: 'app-circle-route-form',
  templateUrl: './circle-route-form.component.html',
  styleUrls: ['./circle-route-form.component.scss']
})
export class CircleRouteFormComponent implements OnInit {
  totalDistance: any = 2;
  routeDetails = new CircleRoute('2','N', null,new google.maps.LatLng(0,0) ,{address: '', city: '', state: ''} );
  
  @Input()  pos: Position;
  @Output() positionObject = new EventEmitter<any>();

  @Input()  circleRoute: any;
  @Output() circleRouteObject = new EventEmitter<any>();

  // Marker title.
  title: string;

  // Info window.
  content: string;

 

  // Warning flag & message.
  warning: boolean;
  message: string;

  position: google.maps.LatLng;

  // Center map. Required.
  center: google.maps.LatLng;


  constructor(
    public googleMapsService: GoogleMapsService,
    public locationService: LocationService,
    public geocodeService: GeocodingService
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


  findAddress(){
      
  }

   findMe(){
    this.warning = false;
    this.message = "";
    //if browser has geolocation, subscribe to output of locationService.getCurrentPosition()
    if (navigator.geolocation) {
        this.locationService.getCurrentPosition().subscribe(
            (position: Position) => {
              this.positionObject.emit(position);
              this.routeDetails.startLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
             
             //geocode geolocation to address
              this.geocodeService.geocode(new google.maps.LatLng(position.coords.latitude, position.coords.longitude)).forEach(
                (results:google.maps.GeocoderResult[]) => {
                  this.routeDetails.startAddress.address = results[0].address_components[0].long_name+ " " + results[0].address_components[1].short_name;
                  this.routeDetails.startAddress.city    = results[0].address_components[2].short_name;
                  this.routeDetails.startAddress.state   = results[0].address_components[4].short_name;
                })
                .then(() => console.log('Geocoding complete'))
                .catch((error: google.maps.GeocoderStatus) => {
                  if (error === google.maps.GeocoderStatus.ZERO_RESULTS) {
                    this.message = "zero results";
                    this.warning = true;
                    }
                });
                
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
    // this.googleMapsService.CoordToAddress(this.routeDetails.startLocation).subscribe((address:Address) => 
    //            {
    //              this.routeDetails.startAddress.address =address.address;
    //              this.routeDetails.startAddress.city =address.city;
    //              this.routeDetails.startAddress.state= address.state;
    //              console.log(this.routeDetails);
    //            });




    
    // this.locationService.FetchLocation().subscribe((data) => {
    //   this.pos = data;
    //   this.locationService.SetLocation(data);
    // });

    //    this.pos.next(positionFromService);
    //   this.pos.subscribe( val => {
    //   console.log(val);
    // });
    
  }


   

  //emit routeObject to parent component
    onSubmit(){     
      console.log(this.routeDetails);                                                                                                                                                                                                                                        
      this.circleRouteObject.emit(this.routeDetails);
      
    }

}
