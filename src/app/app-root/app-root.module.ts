import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRootRoutingModule } from './app-root-routing.module';
import { AppRootComponent } from './app-root/app-root.component';
import { OrgSetupModule } from './org-setup/org-setup.module';
import { EmployeeModule } from './employee/employee.module';
import { BusinessPartnersModule } from './business-partners/business-partners.module';
import { ContactModule } from './contact/contact.module';
import { RolesProfilesModule } from './roles-profiles/roles-profiles.module';
import { AssignEscalateModule } from './assign-escalate/assign-escalate.module';
import { ReportTypeModule } from './report-type/report-type.module';
import { SharedModules } from '../shared.module';


@NgModule({
  declarations: [
    AppRootComponent,
  ],
  imports: [
    CommonModule,SharedModules,
    AppRootRoutingModule,OrgSetupModule,EmployeeModule,
    BusinessPartnersModule,ContactModule,RolesProfilesModule, AssignEscalateModule,ReportTypeModule
  ],
  exports:[AppRootComponent]
})
export class AppRootModule{ 



}
