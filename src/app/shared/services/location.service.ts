import { Injectable } from '@angular/core';
import { Observer, Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  public positionFromJS = new BehaviorSubject<Position>(null);
  public positionFromJS$ = this.positionFromJS.asObservable();

  constructor() { }

  getCurrentPosition(): Observable<Position> {
    return Observable.create((observer: Observer<Position>) => {
        // Invokes getCurrentPosition method of Geolocation API.
        navigator.geolocation.getCurrentPosition(
            (position: Position) => {
                observer.next(position);
                observer.complete();
            },
            (error: PositionError) => {
                console.log('Geolocation service: ' + error.message);
                observer.error(error);
            }
        );
    });
}

  FetchLocation(){
    // maps query options
    var options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    };
    
    //error function called in navigator.eolocation
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    
     navigator.geolocation.getCurrentPosition((position)=>{
        this.SetLocation( position);
    }, error, options);
    return this.positionFromJS;
  
  }
  SetLocation(data) { 
    this.positionFromJS.next(data)
  }


  // FindMe():Observable<Position>{
  //   let pos: Position;
  //   var options = {
  //     enableHighAccuracy: true,
  //     timeout: 15000,
  //     maximumAge: 0
  //   };
  //   function error(err) {
  //     console.warn(`ERROR(${err.code}): ${err.message}`);
  //   }
  //   navigator.geolocation.getCurrentPosition((position)=>{
  //       console.log( position);
    
  //     }, error, options);

  //     this.positionFromJS.next(pos);
  //     return of (pos);
  // }

}
