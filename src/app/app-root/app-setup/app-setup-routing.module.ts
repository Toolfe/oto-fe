import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSetupRootComponent } from './app-setup-root/app-setup-root.component';
import { BasicComponent } from './basic/basic.component';
import { ModulesComponent } from './modules/modules.component';
import { SetupWelcomeComponent } from './setup-welcome/setup-welcome.component';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  {path:'setup-welcome',component:SetupWelcomeComponent},
  {path:'',component:AppSetupRootComponent,
                 
  children:[
    {path:'', component:BasicComponent},
    //{path:'',redirectTo:'basic', pathMatch:'full'},
    {path:'modules', component:ModulesComponent},
    {path:'subscription', component:SubscriptionComponent},
   
  ],
  
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppSetupRoutingModule{ 

}
