import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskMasterSetupRoutingModule } from './task-master-setup-routing.module';
import { TaskMasterRootComponent } from './task-master-root/task-master-root.component';
import { TypeComponent } from './type/type.component';
import { GroupComponent } from './group/group.component';
import { KpiComponent } from './kpi/kpi.component';
import { PriorityComponent } from './priority/priority.component';
import { ExpectationComponent } from './expectation/expectation.component';
import { ScaleComponent } from './scale/scale.component';
import { RatingComponent } from './rating/rating.component';

import { StatusComponent } from './status/status.component';
import { AddTypeComponent } from './type/add-type/add-type.component';
import { AddStatusComponent } from './status/add-status/add-status.component';
import { AddScaleComponent } from './scale/add-scale/add-scale.component';
import { AddRatingComponent } from './rating/add-rating/add-rating.component';

import { AddPriorityComponent } from './priority/add-priority/add-priority.component';
import { AddKpiComponent } from './kpi/add-kpi/add-kpi.component';
import { AddExpectationComponent } from './expectation/add-expectation/add-expectation.component';
import { AddGroupComponent } from './group/add-group/add-group.component';
import { SharedModules } from 'src/app/shared.module';
import { SetRangeComponent } from './scale/set-range/set-range.component';



@NgModule({
  declarations: [
    TaskMasterRootComponent,
    TypeComponent,
    GroupComponent,
    KpiComponent,
    PriorityComponent,
    ExpectationComponent,
    ScaleComponent,
    RatingComponent,
    StatusComponent, 
    AddTypeComponent,
    AddGroupComponent,
    AddStatusComponent,
    AddExpectationComponent,
    AddKpiComponent,
    AddPriorityComponent,
    AddRatingComponent,
    AddScaleComponent,
    AddGroupComponent,
    SetRangeComponent

    

  ],
  imports: [
    CommonModule,
    TaskMasterSetupRoutingModule,SharedModules
  ]
})
export class TaskMasterSetupModule { }
