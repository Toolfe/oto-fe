import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { SharedModules } from '../shared.module';
import { GreetingComponent } from './greeting/greeting.component';


@NgModule({
  declarations: [
    HomeComponent,
    SearchComponent,
    GreetingComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule, SharedModules
  ]
})
export class HomeModule { }
