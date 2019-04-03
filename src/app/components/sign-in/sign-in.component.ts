import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from "../../shared/services/auth.service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginUserData ={};
  constructor(
    public authService: AuthService,
    public router: Router
  ) { 
  }

  ngOnInit() {
  }
  loginUser(){
    this.authService.SpringLoginUser(this.loginUserData)
    .subscribe((response)=>{
      if(response){
        if(response.token){
          localStorage.setItem('springUser', JSON.stringify(response));
          this.router.navigate(['dashboard'])
        }
      }
      console.log('no response');

    })
    
  }
}
