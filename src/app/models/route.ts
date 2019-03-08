import {Address} from './address';
export abstract class Route {
  
    constructor( 
        public id: number,
        public startLocation: any,
        public startAddress: Address,
        public endAddress?: Address){

    }
    
   

}