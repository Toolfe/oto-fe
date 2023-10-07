import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocRecordingRootComponent } from './doc-recording-root/doc-recording-root.component';

const routes: Routes = [
  {path:'', component:DocRecordingRootComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocRecordingRoutingModule { }
