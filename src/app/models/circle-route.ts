import {Route} from './route';
import {Address} from './address';
export class CircleRoute  extends Route{
    
    constructor(
        public id: number,
        public startLocation: Position,
        public startAddress: Address,
        public radius: any,
        public heading: string,
        public waypoints ?: google.maps.DirectionsWaypoint[] 
            
) {
        super( id, startLocation, startAddress);
        this.radius = radius,
        this.heading = heading
    
    }

}
