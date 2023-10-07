import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SharedModules } from 'src/app/shared.module';
import { DocRecordingRoutingModule } from './doc-recording-routing.module';
import { DocRecordingRootComponent } from './doc-recording-root/doc-recording-root.component';
import { Type1Component } from './type1/type1.component';
import { AddType1Component } from './type1/add-type1/add-type1.component';


@NgModule({
  declarations: [
    DocRecordingRootComponent,
    Type1Component,
    AddType1Component
  ],
  imports: [
    CommonModule,
    DocRecordingRoutingModule,SharedModules
  ]
})
export class DocRecordingModule { }
