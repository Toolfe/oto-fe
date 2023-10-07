import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { PartnerService } from '../../setup-service/business-partners/partner/partner.service';
import { CategoryService } from '../../setup-service/business-contact-setup/business-category/business-category.service';
import { FunctionalityService } from '../../setup-service/business-contact-setup/business-functionality/business-functionality.service';
import { SubCategoryService } from '../../setup-service/business-contact-setup/sub-category/sub-category.service';
import { Type1Service } from '../../setup-service/business-contact-setup/type1/type1.service';
import { Type2Service } from '../../setup-service/business-contact-setup/type2/type2.service';
import { EmployeeService } from '../../setup-service/emp-setup/employee/employee.service';
import { BasicInfoService } from '../../setup-service/org-setup/basic-info/basic-info.service';
import { CompanyService } from '../../setup-service/org-setup/company/company.service';
import { DeptService } from '../../setup-service/org-setup/dept/dept.service';
import { DesignationService } from '../../setup-service/org-setup/designation/designation.service';
import { DivisionService } from '../../setup-service/org-setup/division/division.service';
import { IndustryService } from '../../setup-service/org-setup/industry/industry.service';
import { LanguagesService } from '../../setup-service/org-setup/languages/languages.service';
import { LocationService } from '../../setup-service/org-setup/location/location.service';
import { QualificationService } from '../../setup-service/org-setup/qualification/qualification.service';
import { ResourceService } from '../../setup-service/org-setup/resource/resource.service';
import { SubDeptService } from '../../setup-service/org-setup/sub-dept/sub-dept.service';
import { UnitService } from '../../setup-service/org-setup/unit/unit.service';
import { UomService } from '../../setup-service/org-setup/uom/uom.service';
import { WorkingGroupService } from '../../setup-service/org-setup/working-group/working-group.service';
import { ProjectService } from '../../setup-service/project-setup/project.service';

@Component({
  selector: 'app-business-partner-root',
  templateUrl: './business-partner-root.component.html',
  styleUrls: ['./business-partner-root.component.scss'],

})
export class BusinessPartnerRootComponent{}
