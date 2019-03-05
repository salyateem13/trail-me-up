export abstract class Route {
  
    constructor( 
         public id: number,
         public heading: string,
         public address?: string,
         public zipCode?: string){

    }
    
   

}