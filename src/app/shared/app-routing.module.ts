import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



// Import all the components for which navigation service has to be activated 
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../components/verify-email/verify-email.component';
import {RunComponent}   from '../components/dashboard/run/run.component';
import {ProfileComponent} from '../components/dashboard/profile/profile.component';
import {FindRoutesComponent} from "../components/dashboard/find-routes/find-routes.component"

// Import canActivate guard services

import { AuthGuard } from "../shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "src/app/shared/guard/secure-inner-pages.guard";


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'dashboard', 
    component: DashboardComponent, 
    canActivate: [AuthGuard],
    children: [{ 
              path: 'run', 
              component: RunComponent,  
              canActivate: [AuthGuard],
            },
            { 
              path: 'profile', 
              component: ProfileComponent, 
              canActivate: [AuthGuard] 
            },
            { 
              path: 'find-routes', 
              component: FindRoutesComponent, 
              canActivate: [AuthGuard]
           }
        ]},
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard]}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
