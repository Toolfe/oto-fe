import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmpRootComponent } from './emp-root/emp-root.component';
import { OrderModule } from 'ngx-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { ViewMoreComponent } from './view-more/view-more.component';
import { EmpPhotoComponent } from './emp-photo/emp-photo.component';
import { SharedModules } from 'src/app/shared.module';
import { EmpBasicInfoComponent } from './view-more/emp-basic-info/emp-basic-info.component';
import { EmpOthersInfoComponent } from './view-more/emp-others-info/emp-others-info.component';


@NgModule({
  declarations: [
    EmpRootComponent,
    AddEmployeeComponent,
    ViewEmployeeComponent,
    ViewMoreComponent,
    EmpPhotoComponent,
    EmpBasicInfoComponent,
    EmpOthersInfoComponent,
  ],
  imports: [
    CommonModule,SharedModules,
    EmployeeRoutingModule,OrderModule,Ng2SearchPipeModule
  ],
  providers:[EmpRootComponent]
})
export class EmployeeModule { }
