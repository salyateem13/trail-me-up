import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { FormsModule } from "@angular/forms";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';


import {ViewChild} from '@angular/core';
import { AppRoutingModule } from './shared/app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

import { AuthService } from "./shared/services/auth.service";
import { RunComponent } from './components/dashboard/run/run.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';

import { DeviceDetectorModule } from 'ngx-device-detector';
import { FindRoutesComponent } from './components/dashboard/find-routes/find-routes.component';
import {GoogleMapsService} from './shared/services/google-maps.service';
import { CircleRouteFormComponent } from './components/dashboard/find-routes/circle-route-form/circle-route-form.component';
import { StraightShotFormComponent } from './components/dashboard/find-routes/straight-shot-form/straight-shot-form.component';
import { RouteService } from './shared/services/route.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginFormComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    RunComponent,
    ProfileComponent,
    FindRoutesComponent,
    CircleRouteFormComponent,
    StraightShotFormComponent,
    
    
  ],
  imports: [
    
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    MatButtonModule, 
    MatCheckboxModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    DeviceDetectorModule.forRoot(),
    
    
 
  ],
  providers: [AuthService,RouteService,
    GoogleMapsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
