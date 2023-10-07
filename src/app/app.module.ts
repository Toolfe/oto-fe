import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
//Custom imports
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModules } from './shared.module';
//Modules in this application
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthService } from './services/auth/authentication/auth.service';
import { AppRootModule } from './app-root/app-root.module';
import { MobileQueryService } from './services/mobile-query/mobile-query.service';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { RouterModule, ROUTES } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    BrowserAnimationsModule,SharedModules,
    LoginModule,DashboardModule,AppRootModule, PopoverModule.forRoot()
  ],
  providers: [AuthService, MobileQueryService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
