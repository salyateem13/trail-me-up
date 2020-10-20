import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';
import { text } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class RouteService {
  
  private _routesUrl =   "http://localhost:8080/route";
                       

  constructor(
    private http: HttpClient
  ) { }

  SaveRoute(dirResult){
    const user = localStorage.getItem('springUser.id');
    console.log("Route save attamped at service tier")
    const headers = new HttpHeaders (
      {'Access-Control-Allow-Origin': '*',
        'Content-Type': 'multipart/form-data'
      }
  )
    
    return this.http.post<any>(this._routesUrl, dirResult)
    .subscribe();
 
  }

}
