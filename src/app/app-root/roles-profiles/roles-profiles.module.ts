import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesProfilesRoutingModule } from './roles-profiles-routing.module';
import { RolesProfileRootComponent } from './roles-profile-root/roles-profile-root.component';
import { DefineComponent } from './define/define.component';
import { RolesComponent } from './roles/roles.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { RoleEmployeeComponent } from './role-employee/role-employee.component';
import { AddDefineComponent } from './define/add-define/add-define.component';
import { AddProfilesComponent } from './profiles/add-profiles/add-profiles.component';
import { AddRoleEmployeeComponent } from './role-employee/add-role-employee/add-role-employee.component';
import { AddRolesComponent } from './roles/add-roles/add-roles.component';
import { SharedModules } from 'src/app/shared.module';
import { DefineRootComponent } from './define/define-root/define-root.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@NgModule({
  declarations: [
    RolesProfileRootComponent,
    DefineComponent,
    RolesComponent,
    ProfilesComponent,
    RoleEmployeeComponent,
    AddDefineComponent,
    AddProfilesComponent,
    AddRoleEmployeeComponent,
    AddRolesComponent,
    DefineRootComponent,
 

  ],
  

  imports: [
    CommonModule,
    RolesProfilesRoutingModule,SharedModules
  ],
  providers:[
  {provide: MAT_DIALOG_DATA, useValue: {}}
  ]
 

})
export class RolesProfilesModule { }
