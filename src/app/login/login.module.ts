import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { AppRoutingModule } from '../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { ResetComponent } from './reset/reset.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { SharedModules } from '../shared.module';


@NgModule({
  declarations: [
    LoginComponent,
    ResetComponent,
  ],
  imports: [
    CommonModule,SharedModules,AppRoutingModule,ReactiveFormsModule,MatCardModule,MatFormFieldModule,MatIconModule,MatDialogModule
  ]
})
export class LoginModule { }
