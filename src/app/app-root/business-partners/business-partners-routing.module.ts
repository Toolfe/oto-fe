import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerComponent } from './brand-info/partner/partner.component';
import { BusinessPartnerRootComponent } from './business-partner-root/business-partner-root.component';
import { AddContactPartnerComponent } from './contacts/add-contact-partner/add-contact-partner.component';
import { ViewBusinessPartnersComponent } from './contacts/view-business-partners/view-business-partners.component';

const routes: Routes = [
  {path:'', component:BusinessPartnerRootComponent,
  children:[
    {path:'', redirectTo:'partners', pathMatch:'full'},
    {path:'partners', component:PartnerComponent},
    {path:'add-contact', component:AddContactPartnerComponent},
    {path:'contacts', component:ViewBusinessPartnersComponent}
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessPartnersRoutingModule { }
