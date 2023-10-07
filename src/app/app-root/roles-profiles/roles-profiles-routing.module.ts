import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProfilesComponent } from './profiles/add-profiles/add-profiles.component';



import { ProfilesComponent } from './profiles/profiles.component';
import { RolesProfileRootComponent } from './roles-profile-root/roles-profile-root.component';
import { AddRolesComponent } from './roles/add-roles/add-roles.component';
import { RolesComponent } from './roles/roles.component';



const routes: Routes = [

  
  { path: '', component: RolesProfileRootComponent, },
  { path: 'add-role', component: AddRolesComponent, },
  {path:'view-role', component:RolesComponent,},
  { path: 'add-role', component: AddRolesComponent, },
  { path: 'add-profile', component: AddProfilesComponent, },
  { path: 'view-profile', component: ProfilesComponent, },


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesProfilesRoutingModule { }
