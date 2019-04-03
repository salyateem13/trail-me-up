import { Injectable } from '@angular/core';
import {HttpClientModule, HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  private _routesUrl =   "http://localhost:8080/route";

  constructor(
    private http: HttpClient
  ) { }

  saveRoute(dirResult){
    const user = localStorage.getItem('springUser.id');
    //return this.http.post<any>(this._routesUrl, user)
    console.log(user);

  }

}
