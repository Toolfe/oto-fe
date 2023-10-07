import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSetupRoutingModule } from './app-setup-routing.module';
import { BasicComponent } from './basic/basic.component';
import { ModulesComponent } from './modules/modules.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { AppSetupRootComponent } from './app-setup-root/app-setup-root.component';
   
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModules } from 'src/app/shared.module';
import { SetupWelcomeComponent } from './setup-welcome/setup-welcome.component';


@NgModule({
  declarations: [
    BasicComponent,
    ModulesComponent,
    SubscriptionComponent,
    AppSetupRootComponent,
    SetupWelcomeComponent,
  ],
  imports: [
    CommonModule,SharedModules,
    AppSetupRoutingModule,MatDatepickerModule,MatNativeDateModule
  ],
  providers:[]
})
export class AppSetupModule { }
