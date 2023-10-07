import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgSetupRootComponent } from './org-setup-root/org-setup-root.component';




const routes: Routes = [
  {path:'', component:OrgSetupRootComponent,
}];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgSetupRoutingModule { }
