import {Route} from './route';
import {Address} from './address';
export class CircleRoute  extends Route{
    
    constructor(
        public id: number,
        public startLocation: any,
        public startAddress: Address,
        public radius: any,
        public heading: string
            
) {
        super( id, startLocation, startAddress);
    
    }

}
