import {Route} from './route';
import {Address} from './address';
export class CircleRoute  extends Route{
    
    constructor(
        public radius: any,
        public heading: string,
        public id: number, 
        public startLocation: google.maps.LatLng, 
        public startAddress: Address, 
        public waypoints ?: google.maps.DirectionsWaypoint[] ,
        public endAddress?: Address
            
) {
        super(id, startLocation, startAddress);
        this.radius = radius,
        this.heading = heading
    
    }

}
