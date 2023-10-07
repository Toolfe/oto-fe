import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportTypeRootComponent } from './report-type-root/report-type-root.component';

const routes: Routes = [
  {path:'', component:ReportTypeRootComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportTypeRoutingModule { }
