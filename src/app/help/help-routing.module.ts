import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpRootComponent } from './help-root/help-root.component';
import { SetupComponent } from './setup/setup.component';

const routes: Routes = [
  {path:'', component:HelpRootComponent,
  children:[
    {path:'setup', component:SetupComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
