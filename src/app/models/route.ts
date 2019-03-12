import {Address} from './address';
export abstract class Route {
 

    constructor( 
        public id: number,
        public startLocation: google.maps.LatLng,
        public startAddress: Address,
        public endAddress?: Address){

    }
    
   

}