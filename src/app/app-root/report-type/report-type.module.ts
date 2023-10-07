import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModules } from 'src/app/shared.module';
import { ReportTypeRoutingModule } from './report-type-routing.module';
import { ReportTypeRootComponent } from './report-type-root/report-type-root.component';
import { AddProjectDetailsComponent } from './add-project-details/add-project-details.component';
import { ViewProjectDetailsComponent } from './view-project-details/view-project-details.component';


@NgModule({
  declarations: [
    ReportTypeRootComponent,
    AddProjectDetailsComponent,
    ViewProjectDetailsComponent
  ],
  imports: [
    CommonModule,SharedModules,
    ReportTypeRoutingModule
  ]
})
export class ReportTypeModule { }
