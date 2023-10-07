import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModules } from 'src/app/shared.module';
import { BusinessPartnersetupComponent } from './business-partner-setup-root/business-partner-setup-root.component';
import { BusinessPartnersRoutingModule } from './business-contact-routing.module';
import { SubCategoryComponent } from './business-define/sub-category/sub-category.component';
import { AddSubCategoryComponent } from './business-define/sub-category/add-sub-category/add-sub-category.component';
import { ContactType1Component } from './business-define/contact-type1/contact-type1.component';
import { AddType1Component } from './business-define/contact-type1/add-type1/add-type1.component';
import { ContactType2Component } from './business-define/contact-type2/contact-type2.component';
import { AddType2Component } from './business-define/contact-type2/add-type2/add-type2.component';
import { AddBusinessFunctionalityComponent } from './business-define/business-functionality/add-business-functionality/add-business-functionality.component';
import { BusinessFunctionalityComponent } from './business-define/business-functionality/business-functionality.component';
import { AddBusinessCategoryComponent } from './business-define/business-category/add-business-category/add-business-category.component';
import { BusinessCategoryComponent } from './business-define/business-category/business-category.component';
import { AddBusinessDatafieldsComponent } from './business-data-fields/add-business-datafields/add-business-datafields.component';
import { BusinessDataFieldsComponent } from './business-data-fields/business-data-fields.component';
import { FunctionalityComponent } from './business-define/functionality/functionality.component';
import { AddFunctionalityComponent } from './business-define/functionality/add-functionality/add-functionality.component';
import { CategoryComponent } from './business-define/category/category.component';
import { AddCategoryComponent } from './business-define/category/add-category/add-category.component';
@NgModule({
  declarations: [

    BusinessPartnersetupComponent,

    BusinessCategoryComponent,
    AddBusinessCategoryComponent,
    AddBusinessDatafieldsComponent,
    BusinessDataFieldsComponent,

    SubCategoryComponent,
    AddSubCategoryComponent,
    ContactType1Component,
    AddType1Component,
    ContactType2Component,
    AddType2Component,
    BusinessFunctionalityComponent,
    AddBusinessFunctionalityComponent,

    CategoryComponent,
    AddCategoryComponent,

    FunctionalityComponent,
    AddFunctionalityComponent
  ],
  imports: [
    CommonModule,
    BusinessPartnersRoutingModule,SharedModules
  ]
})
export class BusinessContactModule { }
