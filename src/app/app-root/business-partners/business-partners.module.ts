import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusinessPartnersRoutingModule } from './business-partners-routing.module';
import { BusinessPartnerRootComponent } from './business-partner-root/business-partner-root.component';
import { ViewBusinessPartnersComponent } from './contacts/view-business-partners/view-business-partners.component';
import { SharedModules } from 'src/app/shared.module';
import { EditComponent } from './contacts/edit/edit.component';
import { PartnerComponent } from './brand-info/partner/partner.component';
import { AddPartnerComponent } from './brand-info/add-partner/add-partner.component';
import { AddContactPartnerComponent } from './contacts/add-contact-partner/add-contact-partner.component';
import { ViewPartnerDataDialogComponent } from './contacts/view-partner-details/view-partner-detail-component';
import { AddBusinessPartnerComponent } from './contacts/add-business-partner/add-business-partner.component';



@NgModule({
  declarations: [
    BusinessPartnerRootComponent,
    ViewBusinessPartnersComponent,
    EditComponent,
    PartnerComponent,
    AddPartnerComponent,
    AddContactPartnerComponent,
    ViewPartnerDataDialogComponent,
    AddBusinessPartnerComponent
  ],
  imports: [
    CommonModule,SharedModules,
    BusinessPartnersRoutingModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class BusinessPartnersModule { }
