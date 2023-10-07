import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocMasterRootComponent } from './doc-master-root/doc-master-root.component';

const routes: Routes = [
  {path:'', component:DocMasterRootComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocMasterSetupRoutingModule { }
