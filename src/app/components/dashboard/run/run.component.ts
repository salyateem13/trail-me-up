import { Component, OnInit, NgZone} from '@angular/core';
import { AuthService } from "../../../shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) { }

  ngOnInit() {
    var map;
      function initMap() {
        
      }
  }
  

  
}
