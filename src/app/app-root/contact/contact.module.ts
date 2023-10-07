import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { ContactRoutingModule } from './contact-routing.module';
import { ContactRootComponent } from './contact-root/contact-root.component';
import { DefineComponent } from './define/define.component';
//import { DataFieldsComponent } from './data-fields/data-fields.component';
import { CategoryComponent } from './define/category/category.component';
import { FunctionalityComponent } from './define/functionality/functionality.component';
//import { SubCategoryComponent } from './define/sub-category/sub-category.component';
//import { ContactType1Component } from './define/contact-type1/contact-type1.component';
//import { ContactType2Component } from './define/contact-type2/contact-type2.component';
//import { AddDatafieldsComponent } from './data-fields/add-datafields/add-datafields.component';
import { AddCategoryComponent } from './define/category/add-category/add-category.component';
//import { AddType1Component } from './define/contact-type1/add-type1/add-type1.component';
//import { AddType2Component } from './define/contact-type2/add-type2/add-type2.component';
import { AddFunctionalityComponent } from './define/functionality/add-functionality/add-functionality.component';
//import { AddSubCategoryComponent } from './define/sub-category/add-sub-category/add-sub-category.component';
import { SharedModules } from 'src/app/shared.module';


@NgModule({
  declarations: [
    ContactRootComponent,
    DefineComponent,
   // DataFieldsComponent,
    CategoryComponent,
    FunctionalityComponent,
    // SubCategoryComponent,
    // ContactType1Component,
    // ContactType2Component,
    // AddDatafieldsComponent,
    AddCategoryComponent,
    // AddType1Component,
    // AddType2Component,
    AddFunctionalityComponent,
    // AddSubCategoryComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,SharedModules
  ]
})
export class ContactModule { }
