import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrgSetupRoutingModule } from './org-setup-routing.module';
import { BasicComponent } from './basic/basic.component';
import { DivisionComponent } from './division/division.component';
import { OrgSetupRootComponent } from './org-setup-root/org-setup-root.component';
import { LocationComponent } from './location/location.component';
import { UnitComponent } from './unit/unit.component';
import { DepartmentComponent } from './department/department.component';
import { SubDeptComponent } from './sub-dept/sub-dept.component';
import { CurrencyComponent } from './currency/currency.component';
import { ViewDivisionComponent } from './division/view-division/view-division.component';
import { ViewUnitComponent } from './unit/view-unit/view-unit.component';
import { ViewDeptComponent } from './department/view-dept/view-dept.component';
import { ViewSubDeptComponent } from './sub-dept/view-sub-dept/view-sub-dept.component';
import { ViewCurrencyComponent } from './currency/view-currency/view-currency.component';
import { EmpGroupComponent } from './emp-group/emp-group.component';
import { ViewEmpCategoryComponent } from './emp-group/view-components/view-emp-category/view-emp-category.component';
import { ViewEmpGroupComponent } from './emp-group/view-components/view-emp-group/view-emp-group.component';
import { AddEmpCategoryComponent } from './emp-group/view-components/view-emp-category/add-emp-category/add-emp-category.component';
import { AddEmpCompanyComponent } from './emp-group/view-components/view-emp-company/add-emp-company/add-emp-company.component';
import { ViewEmpCompanyComponent } from './emp-group/view-components/view-emp-company/view-emp-company.component';
import { AddEmpDesignationComponent } from './emp-group/view-components/view-emp-designation/add-emp-designation/add-emp-designation.component';
import { ViewEmpDesignationComponent } from './emp-group/view-components/view-emp-designation/view-emp-designation.component';
import { AddEmpGroupComponent } from './emp-group/view-components/view-emp-group/add-emp-group/add-emp-group.component';
import { AddEmpIndustryComponent } from './emp-group/view-components/view-emp-industry/add-emp-industry/add-emp-industry.component';
import { ViewEmpIndustryComponent } from './emp-group/view-components/view-emp-industry/view-emp-industry.component';
import { AddEmpLanguagesComponent } from './emp-group/view-components/view-emp-languages/add-emp-languages/add-emp-languages.component';
import { ViewEmpLanguagesComponent } from './emp-group/view-components/view-emp-languages/view-emp-languages.component';
import { AddEmpQualificationComponent } from './emp-group/view-components/view-emp-qualification/add-emp-qualification/add-emp-qualification.component';
import { ViewEmpQualificationComponent } from './emp-group/view-components/view-emp-qualification/view-emp-qualification.component';
import { AddEmpResourceComponent } from './emp-group/view-components/view-emp-resource/add-emp-resource/add-emp-resource.component';
import { ViewEmpResourceComponent } from './emp-group/view-components/view-emp-resource/view-emp-resource.component';
import { AddEmpSkillsComponent } from './emp-group/view-components/view-emp-skills/add-emp-skills/add-emp-skills.component';
import { ViewEmpSkillsComponent } from './emp-group/view-components/view-emp-skills/view-emp-skills.component';
import { AddEmpSpecificSkillsComponent } from './emp-group/view-components/view-emp-specific-skills/add-emp-specific-skills/add-emp-specific-skills.component';
import { ViewEmpSpecificSkillsComponent } from './emp-group/view-components/view-emp-specific-skills/view-emp-specific-skills.component';
import { AddEmpTypeComponent } from './emp-group/view-components/view-emp-type/add-emp-type/add-emp-type.component';
import { ViewEmpTypeComponent } from './emp-group/view-components/view-emp-type/view-emp-type.component';
import { AddEmpUomComponent } from './emp-group/view-components/view-emp-uom/add-emp-uom/add-emp-uom.component';
import { ViewEmpUOmComponent } from './emp-group/view-components/view-emp-uom/view-emp-uom.component';
import { AddEmpWorkProcessesComponent } from './emp-group/view-components/view-emp-work-processes/add-emp-work-processes/add-emp-work-processes.component';
import { ViewEmpWorkProcessesComponent } from './emp-group/view-components/view-emp-work-processes/view-emp-work-processes.component';
import { AddEmpWorkingGroupComponent } from './emp-group/view-components/view-emp-working-group/add-emp-working-group/add-emp-working-group.component';
import { ViewEmpWorkingGroupComponent } from './emp-group/view-components/view-emp-working-group/view-emp-working-group.component';
import { ViewLocationsComponent } from './location/view-locations/view-locations.component';
import { BasicRootComponent } from './org-setup-root/basic-root/basic-root.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SharedModules } from 'src/app/shared.module';



@NgModule({
  declarations: [
    BasicComponent,
    DivisionComponent,
    OrgSetupRootComponent,
    LocationComponent,
    UnitComponent,
    DepartmentComponent,
    SubDeptComponent,
    CurrencyComponent,
    ViewDivisionComponent,
    ViewUnitComponent,
    ViewDeptComponent,
    ViewSubDeptComponent,
    ViewCurrencyComponent,

    EmpGroupComponent,
    ViewEmpGroupComponent,
    ViewEmpCategoryComponent,
    ViewEmpTypeComponent,
    ViewEmpWorkingGroupComponent,
    ViewEmpQualificationComponent,
    ViewEmpSkillsComponent,
    ViewEmpSpecificSkillsComponent,
    ViewEmpLanguagesComponent,
    ViewEmpCompanyComponent,
    ViewEmpDesignationComponent,
    ViewEmpWorkProcessesComponent,
    ViewEmpResourceComponent,
    ViewEmpUOmComponent,
    ViewLocationsComponent,
    AddEmpGroupComponent,
    AddEmpCategoryComponent,
    AddEmpTypeComponent,
    AddEmpWorkingGroupComponent,
    AddEmpQualificationComponent,
    AddEmpSkillsComponent,
    AddEmpSpecificSkillsComponent,
    AddEmpLanguagesComponent,
    AddEmpCompanyComponent,
    AddEmpDesignationComponent,
    AddEmpWorkProcessesComponent,
    AddEmpResourceComponent,
    AddEmpUomComponent,
    ViewEmpIndustryComponent,
    AddEmpIndustryComponent,
    BasicRootComponent
  ],
  imports: [
    CommonModule,SharedModules,
    OrgSetupRoutingModule,Ng2SearchPipeModule,
  ],
  providers:[OrgSetupRootComponent]
})
export class OrgSetupModule { }
