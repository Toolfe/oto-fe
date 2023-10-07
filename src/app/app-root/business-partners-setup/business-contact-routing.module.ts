import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessPartnersetupComponent } from './business-partner-setup-root/business-partner-setup-root.component';
const routes: Routes = [{
  path:'', component:BusinessPartnersetupComponent,
/*   children:[
    {path:'define', component:DefineComponent},
    {path:'', redirectTo:'define', pathMatch:'full'},
    {path:'data-fields', component:DataFieldsComponent}
  ]*/
} ];

@NgModule({
  imports: [RouterModule.forChild(routes),
  ],

  exports: [RouterModule]
})
export class BusinessPartnersRoutingModule { }
