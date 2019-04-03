import {Address} from './address';
export abstract class Route {
 

    constructor( 
        public id: number,
        public startLocation: google.maps.LatLng,
        public startAddress: Address,
        public endLocation?: google.maps.LatLng,
        public endAddress?: Address,
        public directionsResult?: google.maps.DirectionsResult){

    }
    
   

}