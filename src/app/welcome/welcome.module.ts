import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModules } from '../shared.module';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { BusinessRegisterComponent } from './business-register/business-register.component';
import { SignupAdminComponent } from './signup-admin/signup-admin.component';
import { AppSetupModule } from '../app-root/app-setup/app-setup.module';
import { VerificationComponent } from './signup-admin/verification/verification.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    BusinessRegisterComponent,
    SignupAdminComponent,
    VerificationComponent
  ],
  
  imports: [
    CommonModule,
    SharedModules,
    WelcomeRoutingModule,AppSetupModule
  ],
  providers:[SignupAdminComponent]
})
export class WelcomeModule { }
