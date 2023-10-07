import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignEscalateRoutingModule } from './assign-escalate-routing.module';
import { AssignEscalateRootComponent } from './assign-escalate-root/assign-escalate-root.component';
import { AssignComponent } from './assign/assign.component';
import { AddAssignComponent } from './assign/add-assign/add-assign.component';
import { SharedModules } from 'src/app/shared.module';



@NgModule({
  declarations: [
    AssignEscalateRootComponent,
    AssignComponent,
    AddAssignComponent,
  ],
  imports: [
    CommonModule,
    AssignEscalateRoutingModule,SharedModules
  ]
})
export class AssignEscalateModule { }
