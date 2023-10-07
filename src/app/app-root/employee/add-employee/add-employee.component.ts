import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { EmpsetupService } from '../../setup-service/emp-setup/empsetup.service';
import { FetchCommon } from '../../setup-service/common-function/fetch-common';
import { LocationService } from '../../setup-service/org-setup/location/location.service';
import { DivisionService } from '../../setup-service/org-setup/division/division.service';
import { UnitService } from '../../setup-service/org-setup/unit/unit.service';
import { DeptService } from '../../setup-service/org-setup/dept/dept.service';
import { SubDeptService } from '../../setup-service/org-setup/sub-dept/sub-dept.service';
import { EmpCategoryService } from '../../setup-service/org-setup/emp-category/emp-category.service';
import { EmpGroupService } from '../../setup-service/org-setup/emp-group/emp-group.service';
import { EmpTypeService } from '../../setup-service/org-setup/emp-type/emp-type.service';
import { WorkingGroupService } from '../../setup-service/org-setup/working-group/working-group.service';
import { DesignationService } from '../../setup-service/org-setup/designation/designation.service';
import { CompanyService } from '../../setup-service/org-setup/company/company.service';
import { SkillSetService } from '../../setup-service/org-setup/skill-set/skill-set.service';
import { IndustrySkillsService } from '../../setup-service/org-setup/industry-skills/industry-skills.service';
import { LanguagesService } from '../../setup-service/org-setup/languages/languages.service';
import { WorkProcessService } from '../../setup-service/org-setup/work-process/work-process.service';
import { ResourceService } from '../../setup-service/org-setup/resource/resource.service';
import { CountryCodeService } from 'src/app/shared/country-code/country-code.service';
import { EmployeeService } from '../../setup-service/emp-setup/employee/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../employee.model';
import { RolesService } from '../../setup-service/role-setup/roles/roles.service';


export interface Password {
  password: string;


}
export interface phoneNumber {
  phoneNumber: any;


}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit, AfterViewInit {

  employee$ = this.employee.employee$;
  location$ = this.location.location$;
  division$ = this.division.division$;
  unit$ = this.unit.unit$;
  department$ = this.departmentService.department$;
  subDept$ = this.subdept.subDept$;
  designation$ = this.designationService.designation$;
  role$ = this.rolesService.role$;

  empgroup$ = this.group.empgroup$;
  empcategory$ = this.category.empcategory$;
  emptype$ = this.type.emptype$;
  workinggroup$ = this.workingGroup.workinggroup$;

  skillset$ = this.skill.skillset$;
  specificskill$ = this.industrySkill.specificskill$;
  company$ = this.company.company$;
  workprocess$ = this.wrkProcess.workprocess$;
  language$ = this.languages.language$;
  resources$ = this.resources.resource$;

  subDept: any;

  employeeForm: any = FormGroup;
  orgDivison: any;
  orgUnit: any
  orgDepartment: any;
  orgSubDepartment: any
  orgDesignation: any;
  empWorkingGroup: any;
  empTypes: any;
  empGroups: any;
  empCategory: any;
  designations: any;
  orgCompany: any;
  orgIndustry: any;

  skillSet: any;
  industrySkills: any;
  language: any;
  previousCompany: any;
  workProcess: any;
  resource: any;
  photo = new FormControl;
  orgDetails: any;

  orgdivCode: any;
  orgLocCode: any;
  orgunitCode: any
  orgDepartmentCode: any
  orgLocation: any;
  department: any;
  subDepartment: any;
  designation: any;
  customRole: any;
  remark1: any;
  remark2: any;

  $employee: any;
  $empName: any;

  experience: any[] = ["None", "1 Year", "2 Years", "3 Years", "4 Years", "5 Years", "6 Years", "7 Years", "8 Years", "9 Years", "10 Years",]
  grade: any[] = ["A", "B", "C", "D"]
  orgLocation$: any

  password: any;
  priority: any;

  update!: boolean
  edit!: boolean;
  phoneNumber: any;

  constructor(private fb: FormBuilder,
    private service: EmpsetupService,
    private employee: EmployeeService,
    private notification: NotifierService,
    private fetch: FetchCommon,
    private location: LocationService,
    private division: DivisionService,
    private unit: UnitService,
    private departmentService: DeptService,
    private subdept: SubDeptService,
    private group: EmpGroupService,
    private category: EmpCategoryService,
    private type: EmpTypeService,
    private workingGroup: WorkingGroupService,
    private designationService: DesignationService,
    private rolesService: RolesService,
    private company: CompanyService,
    private skill: SkillSetService,
    private industrySkill: IndustrySkillsService,
    private languages: LanguagesService,
    private wrkProcess: WorkProcessService,
    private resources: ResourceService,
    private countryService: CountryCodeService,
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    public dialogRef: MatDialogRef<any>,
  ) {

    if (data) {
      this.update = true;

    }
  }
  imageString(event$: any) {
    this.photo.setValue(event$);
    return this.photo;
  }
  getId(employeeCode: string) {
    this.service.empid = employeeCode;
  }

  ngOnInit(): void {
    this.getemp();
    this.password = 'Otomate@123'
    this.empDetails();
    this.empForm();

  }
  empDetails() {

    let employee: any = {}
    let employees: any[] = [];
    this.employee.resEmp.forEach((data: any) => {
      employee.id = data.id;
      employee.firstName = data.firstName;
      employees.push(employee);
      employee = {};
      this.$empName = employees
    });

  }

  getemp() {
    this.employee.getEmployee().subscribe(() => {

    })
  }

  empForm() {
    this.employeeForm = this.fb.group({

      employeeCode: [],
      firstName: [],
      lastName: [],
      nationalCode: [],
      remark1: [],
      remark2: [],
      primaryEmail: ['', [Validators.required, Validators.email]],
      secondaryEmail: ['', [Validators.email]],
      primaryPhone: ['', [Validators.required]],
      password:this. password,
      permanentAddress: [],
      presentAddress: [],
      joiningDate: [],
      resignDate: [],
      departmentId: [],
      subDepartmentId: [],
      designationId: [],
      roleId: [],
      secondaryPhone: [],
      photo: [],
      roleTypeId: 2,
      employeeGroupId: [],
      employeeCategoryId: [],
      employeeTypeId: [],
      employeeWorkingGroupId: [],
      siblingProfession: [],
      parentProfession: [],
      familyBusiness: [],
      nativePlace: [],
      ethnicOrigin: [],
      previousCompanyName: [],
      previousIndustry: [],
      closeRelationship: [],
      businessContact: [],
      skillSet: [],
      industrySpecificSkill: [],
      language: [],
      previousCompany: [],
      workProcess: [],
      resource: [],
      functionalReportingId: [],
      businessReportingId: []
    })
    if (this.data != null) {
      this.update = true;
      this.edit = true;
      this.editData()
    }
  }

  ngAfterViewInit(): void {
    // this.getPhoneNumber()
  }

  editData() {
    this.employee.viewEmployee(this.data.id).subscribe((res) => {
      if (res.success = true) {
        this.employeeForm.patchValue({
          id: this.data.id,
          employeeCode: res.data.employeeCode,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          nationalCode: res.data.nationalCode,
          remark1: res.data.remark1,
          remark2: res.data.remark2,
          primaryEmail: res.data.primaryEmail,
          secondaryEmail: res.data.secondaryEmail,
          primaryPhone: res.data.primaryPhone,
          password: res.data.password,
          permanentAddress: res.data.permanentAddress,
          presentAddress: res.data.presentAddress,
          joiningDate: res.data.joiningDate,
          resignDate: res.data.resignDate,
          departmentId: res.data.departmentId,
          subDepartmentId: res.data.subDepartmentId,
          designationId: res.data.designationId,
          roleId: res.data.roleId,
          secondaryPhone: res.data.secondaryPhone,
          photo: res.data.photo,
          roleTypeId: res.data.roleTypeId,
          employeeGroupId: res.data.employeeGroupId,
          employeeCategoryId: res.data.employeeCategoryId,
          employeeTypeId: res.data.employeeTypeId,
          employeeWorkingGroupId: res.data.employeeWorkingGroupId,
          siblingProfession: res.data.siblingProfession,
          parentProfession: res.data.parentProfession,
          familyBusiness: res.data.familyBusiness,
          nativePlace: res.data.nativePlace,
          ethnicOrigin: res.data.ethnicOrigin,
          previousCompanyName: res.data.previousCompanyName,
          previousIndustry: res.data.previousIndustry,
          closeRelationship: res.data.closeRelationship,
          businessContact: res.data.businessContact,
          functionalReportingId: res.data.functionalReportingId,
          businessReportingId: res.data.businessReportingId,
          skillSet: res.skillSet,
          industrySpecificSkill: res.industrySpecificSkill,
          language: res.language,
          previousCompany: res.previousCompany,
          workProcess: res.workProcess,
          resource: res.resource,
        })
      }
    });
  }


  updateEmployee() {
    this.employeeForm.value.id = this.data.id;
    let dataRow: any = this.employeeForm.value;
    
    this.employee.postEmployee(dataRow).subscribe((res) => {
      this.dialogRef.close(res);
      this.notification.openSnackBar(' Updated Successfully', 1);
    })
    this.employeeForm.reset();
  }


  public addItem(): any {
    if (this.employeeForm.valid == true) {
      let dataRow: any = this.employeeForm.value
      this.employee.postEmployee(dataRow).subscribe(data => {
        this.notification.openSnackBar("Employee added successfully!", 1)
        this.dialogRef.close(data);
        this.employeeForm.reset(); //reset the form
      },
        err => {
          this.notification.openSnackBar("Something went wrong!", 0)
        });
    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue', 0)
    }
  }

  onDivChange(divCode: any) {
    this.orgdivCode = divCode;
    if (this.orgdivCode != undefined) {
      if (this.orgLocCode != undefined) {
        this.fetchUnits(this.orgdivCode, this.orgLocCode);

      } else {
        alert("Select a Location to continue");
      }
    }
  }
  onLocChange(locCode: any) {
    this.orgLocCode = locCode;
    if (this.orgdivCode != undefined) {
      if (this.orgLocCode != undefined) {
        this.fetchUnits(this.orgdivCode, this.orgLocCode);
      } else {
        alert("Select a valid Location");
      }
    }
  }
  fetchUnits(divCode: any, locCode: any) {
    this.orgUnit = this.fetch.fetchCommon(this.orgDivison, this.orgLocation, divCode, locCode);
  }

  onUnitChange(unitCode: any) {
    this.orgunitCode = unitCode;
    let dpt = this.orgUnit[0];
    this.orgDepartment = dpt.departments;
  }

  onDepartmentChange(DepartmentCode: any) {
    this.orgDepartmentCode = DepartmentCode;
    let subDpt = this.orgDepartment[0];
    this.orgSubDepartment = subDpt.subdepartments;
  }

  getDepartment(value: any) {


    this.subDept = value.subdepartments;
  }


}