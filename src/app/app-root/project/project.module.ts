import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectRootComponent } from './project-root/project-root.component';
import { AllProjectComponent } from './all-project/all-project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { SharedModules } from 'src/app/shared.module';
import { OrderNumberComponent } from './order-number/order-number.component';
import { AddOrderNumberComponent } from './add-order-number/add-order-number.component';

@NgModule({
  declarations: [
    ProjectRootComponent,
    AllProjectComponent,
    AddProjectComponent,
    OrderNumberComponent,
    AddOrderNumberComponent,
    
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,SharedModules
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    
    exports: [AllProjectComponent,
      OrderNumberComponent ,AddOrderNumberComponent,ProjectRootComponent]
})
export class ProjectModule { }
