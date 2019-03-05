import {Route} from './route';
export class CircleRoute  extends Route{
    
    constructor(
        public id: number,
        public radius: any,
        public heading: string,
        public address?: string,
        public zipCode?: string,
        
) {
        super( id, heading, address, zipCode);
        this.radius=radius
    
        }

}
