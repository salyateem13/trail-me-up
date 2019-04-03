import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registerUserData ={};
  constructor(    
      public authService: AuthService
    ) { }

  ngOnInit() {
  } 

  registerUser(user){
    return this.authService.SpringRegisterUser(this.registerUserData).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }

}
