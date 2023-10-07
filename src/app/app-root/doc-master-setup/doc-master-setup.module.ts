import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { DocMasterSetupRoutingModule } from './doc-master-setup-routing.module';
import { DocMasterRootComponent } from './doc-master-root/doc-master-root.component';
import { CategoryComponent } from './category/category.component';
import { TypeComponent } from './type/type.component';

import { UserComponent } from './user/user.component';
import { AccesComponent } from './acces/acces.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { AddTypeComponent } from './type/add-type/add-type.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { AddAccesComponent } from './acces/add-acces/add-acces.component';
import { SharedModules } from 'src/app/shared.module';




@NgModule({
  declarations: [
    DocMasterRootComponent,
    CategoryComponent,
    TypeComponent,
    UserComponent,
    AccesComponent,
    AddCategoryComponent,
    AddTypeComponent,
    AddUserComponent,
    AddAccesComponent,
   
    
  ],
  imports: [
    CommonModule,
    DocMasterSetupRoutingModule,SharedModules
  ]
})
export class DocMasterSetupModule { }
