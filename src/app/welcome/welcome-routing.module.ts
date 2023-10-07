import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessRegisterComponent } from './business-register/business-register.component';
import { SignupAdminComponent } from './signup-admin/signup-admin.component';
import { WelcomeComponent } from './welcome/welcome.component';

const appsetupModule = () => import('../app-root/app-setup/app-setup.module').then(x => x.AppSetupModule);


const routes: Routes = [
  {path:'', component:BusinessRegisterComponent ,children:[
    {path:'welcome',component:WelcomeComponent},
    {path:'', redirectTo:'welcome', pathMatch:'full'},
    {path:'register-admin', component:SignupAdminComponent},
    {path:'appsetup', loadChildren:appsetupModule},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
