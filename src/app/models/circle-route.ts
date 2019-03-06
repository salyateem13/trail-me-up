import {Route} from './route';
export class CircleRoute  extends Route{
    
    constructor(
        public id: number,
        public radius: any,
        public heading: string,
        public address?: string,
        public city?: string,
        public state?: string        
) {
        super( id, heading, address, city, state);
        this.radius=radius;
    
    }

}
