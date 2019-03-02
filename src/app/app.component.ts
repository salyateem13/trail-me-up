import { Component, NgZone } from '@angular/core';
import { AuthService } from "src/app/shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-app';

  constructor(
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) { }
  
}
