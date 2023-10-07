import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HelpRoutingModule } from './help-routing.module';
import { SharedModules } from '../shared.module';
import { HelpRootComponent } from './help-root/help-root.component';
import { SetupComponent } from './setup/setup.component';


@NgModule({
  declarations: [
    HelpRootComponent,
    SetupComponent
  ],
  imports: [
    CommonModule,
    HelpRoutingModule, SharedModules
  ]
})
export class HelpModule { }
