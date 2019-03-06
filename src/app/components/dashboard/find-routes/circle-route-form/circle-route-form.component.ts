import { Component, OnInit, Output, EventEmitter,Input } from '@angular/core';
import {CircleRoute} from '../../../../models/circle-route';
@Component({
  selector: 'app-circle-route-form',
  templateUrl: './circle-route-form.component.html',
  styleUrls: ['./circle-route-form.component.scss']
})
export class CircleRouteFormComponent implements OnInit {
  totalDistance: any = 2;
  routeDetails = new CircleRoute(null, '2', 'N', '','','');
  constructor() { }
  @Input()  pos: any;
  @Output() positionObject = new EventEmitter<any>();
  ngOnInit() {
  }


  valueChanged(e) {
  
    this.totalDistance =e;
}


  findMe(){

    var options = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    };

    function success(pos) {
      this.showPosition(pos);
    
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }


      navigator.geolocation.getCurrentPosition((position)=>{
        this.positionObject.emit(position)
      }, error, options);

  }

  
    onSubmit(){
      console.log(this.routeDetails);
    }

}
