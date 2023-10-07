import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { CategoryService } from 'src/app/app-root/setup-service/business-contact-setup/business-category/business-category.service';
import { FunctionalityService } from 'src/app/app-root/setup-service/business-contact-setup/business-functionality/business-functionality.service';
import { SubCategoryService } from 'src/app/app-root/setup-service/business-contact-setup/sub-category/sub-category.service';
import { Type1Service } from 'src/app/app-root/setup-service/business-contact-setup/type1/type1.service';
import { Type2Service } from 'src/app/app-root/setup-service/business-contact-setup/type2/type2.service';
import { BusinessPartnersService } from 'src/app/app-root/setup-service/business-partners/business-partners.service';
import { ContactCategoryService } from 'src/app/app-root/setup-service/contact-setup/category/category.service';
import { EmployeeService } from 'src/app/app-root/setup-service/emp-setup/employee/employee.service';
import { BasicInfoService } from 'src/app/app-root/setup-service/org-setup/basic-info/basic-info.service';
import { CompanyService } from 'src/app/app-root/setup-service/org-setup/company/company.service';
import { DeptService } from 'src/app/app-root/setup-service/org-setup/dept/dept.service';
import { DesignationService } from 'src/app/app-root/setup-service/org-setup/designation/designation.service';
import { DivisionService } from 'src/app/app-root/setup-service/org-setup/division/division.service';
import { IndustryService } from 'src/app/app-root/setup-service/org-setup/industry/industry.service';
import { LanguagesService } from 'src/app/app-root/setup-service/org-setup/languages/languages.service';
import { LocationService } from 'src/app/app-root/setup-service/org-setup/location/location.service';
import { QualificationService } from 'src/app/app-root/setup-service/org-setup/qualification/qualification.service';
import { ResourceService } from 'src/app/app-root/setup-service/org-setup/resource/resource.service';
import { SubDeptService } from 'src/app/app-root/setup-service/org-setup/sub-dept/sub-dept.service';
import { UnitService } from 'src/app/app-root/setup-service/org-setup/unit/unit.service';
import { UomService } from 'src/app/app-root/setup-service/org-setup/uom/uom.service';
import { WorkingGroupService } from 'src/app/app-root/setup-service/org-setup/working-group/working-group.service';
import { ProjectService } from 'src/app/app-root/setup-service/project-setup/project.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { ContactFunctionalityService } from 'src/app/app-root/setup-service/contact-setup/functionality/functionality.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-add-contact-partner',
  templateUrl: './add-business-partner.component.html',
  styleUrls: ['./add-business-partner.component.scss']
})


export class AddBusinessPartnerComponent implements OnInit {
  category$ = this.category.category$;
  subcategory$ = this.subcategory.subcategory$;
  partnerBrand$ = this.partner.partner$;
  contactFunctionality$ = this.partner.contactFunctionality$;

  firstCategoryId: number = 0;

  resCategories!: Subscription
  loading!: boolean;
  i: any = 0;
  categories: any[] = []; //Resposne Data from Contact Setup
  formFields: any[] = [];
  partnerCode: any[] = [];
  links = this.categories;
  activeLink = this.links[0];
  background: ThemePalette = undefined;
  
  selectedCategoryIndex: number = 0;
  selectedCategoryId: number = 0;
  contactForm!: FormGroup;
  subBusinessPartnerForm!: FormGroup;
  partnerCodeForm!: FormGroup;

  selectedCategory: any;
  partners: any[] = [];
  userRoleAccess: any;
  creation!: boolean;
  selection!: boolean;
  updation!: boolean;
  deletion!: boolean;
  keywords: any;
  selectedFileName: any


  cat: any;
  datavalues: any[] = [];
  public partnerForm: FormGroup = this.fb.group({
    setup: this.fb.group({
     // id: sessionStorage.getItem('orgId'),
    })
  });

  businessPartner: boolean = false;
  addingContact!: boolean;
  location: any;
  
  constructor(
    private empService: EmployeeService,
    private category: CategoryService,
    private subcategory: SubCategoryService,
    private partner: ContactCategoryService,
    private contactPartner: BusinessPartnersService,
    private deptService: DeptService,
    private designationService: DesignationService,
    private divisionService: DivisionService,
    private industryService: IndustryService,
    private languageService: LanguagesService,
    private locationService: LocationService,
    private qualificationService: QualificationService,
    private resourceService: ResourceService,
    private subdeptService: SubDeptService,
    private unitService: UnitService,
    private uomService: UomService,
    private workinggroupService: WorkingGroupService,
    private type1: Type1Service,
    private type2: Type2Service,
    private functionality: FunctionalityService,
    private contact: ContactCategoryService,
    private contactFunctionality: ContactFunctionalityService,
    private notification: NotifierService,
    private addressService: BasicInfoService,
    private companyService: CompanyService,
    private project: ProjectService,
    private fb: FormBuilder,

    private formBuilder: FormBuilder,
    private dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: any

  ) {

    this.userRoleAccess = CommonMethods.userContext();


  }

  ngOnInit(): void {

    if (this.addingContact == true)
      this.addContactField();

    this.onCategorySelect(this.data.categoryId);


    this.contactForm = this.formBuilder.group({

      contacts: this.formBuilder.array([]),
    });

    this.subBusinessPartnerForm = this.formBuilder.group({

      // subBusinessPartnerForm code , Name , Address ,fields and subcategory fields  validate

      code: ['', Validators.required],
      name: ['', Validators.required],
      address: ['', Validators.required],
      subcategory: ['', Validators.required]
    });

    if (sessionStorage.getItem('role') == '1') {
      this.businessPartner = true;
    }
    if (sessionStorage.getItem('role') == '2') {
      let profiles: any = this.userRoleAccess.customRole;
      profiles = JSON.parse(profiles);

      profiles.forEach((profile: any): any => {
        profile = JSON.parse(profile.businessPartnerModule);
        if (profile.businessPartner.selection == true || profile.businessPartner.creation == true || profile.businessPartner.deletion == true ||
          profile.businessPartner.updation == true) {
          this.businessPartner = true;
          return this.businessPartner;
        }

      })
    }

    this.category.getSelectedCategory(this.data.categoryId).subscribe(
      category => {
        this.categories = category.data;
        this.selectedCategory = this.categories[0];
        this.formFields = this.selectedCategory.businessPartnerCategoryFields;   //passing fields data in array object
        this.loadForm(this.formFields);   //Load First Form
      })

  }
  get contacts(): FormArray {
    return this.contactForm.get('contacts') as FormArray;
  }


  onCategorySelect(categoryId: number) {
    this.subcategory$ = this.subcategory.getSubCategoryList(categoryId);
  }

  // add contact person , category and functionality and validate
  addContactField() {
    const contacts = this.contactForm.get('contacts') as FormArray;
    const newContact = this.formBuilder.group({
      category: [],
      functionality: [],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      selectedFileName: [''], // To track the selected file name
      file: [null] // To store the selected file
    });
    contacts.push(newContact);
  }

  removeContactField(index: number) {
    const contacts = this.contactForm.get('contacts') as FormArray;
    contacts.removeAt(index);
  }
  // Reset the form array
  resetContactFields() {
    this.contactForm.setControl('contacts', this.formBuilder.array([]));
  }



  loadForm(fields: any) {

    this.partnerForm = this.fb.group({});
    for (let i = 0; i < fields.length; i++) {
      this.partnerForm.addControl(fields[i].fieldName, new FormControl(''));
    }

  }

  get email() {
    return this.partnerForm.controls['Email'];
  }


  currentControl(fieldReference: any): any {
    switch (fieldReference) {
      case 'address':
        return this.addressService.address$;
      case 'company':
        return this.companyService.company$;
      case 'department':
        return this.deptService.department$;
      case 'designation':
        return this.designationService.designation$;
      case 'division':
        return this.divisionService.division$;
      case 'employee':
        return this.empService.employee$;
      case 'industry':
        return this.industryService.industry$;
      case 'language':
        return this.languageService.language$;
      case 'location':
        return this.locationService.location$;
      case 'qualification':
        return this.qualificationService.qualification$;
      case 'resource':
        return this.resourceService.resource$;
      case 'sub_department':
        return this.subdeptService.subDept$;
      case 'unit':
        return this.unitService.unit$;
      case 'uom':
        return this.uomService.uom$;
      case 'working_group':
        return this.workinggroupService.workinggroup$;
      case 'business_partner_category':
        return this.category.category$;
      case 'business_partner_sub_category':
        return this.subcategory.subcategory$;
      case 'business_partner_type1':
        return this.type1.type1$;
      case 'business_partner_type2':
        return this.type2.type2$;
      case 'business_partner_functionality':
        return this.functionality.functionality$;

      case 'contact_category':
        return this.contact.partner$;
      case 'contact_functionality':
        return this.contactFunctionality.functionality$;

      case 'project':
        return this.project.project$;
      default:

        break;
    }
  }

  brandPartner!: String;
  onBrandSelect(val: any) {
    this.brandPartner = val;
  }


  uploadFile(event: Event, index: number) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const contacts = this.contactForm.get('contacts') as FormArray;
      const contactGroup = contacts.at(index) as FormGroup;
      contactGroup.patchValue({ selectedFileName: file.name, file: file });
    }
  }

  removeFile(index: number) {
    const contacts = this.contactForm.get('contacts') as FormArray;
    const contactGroup = contacts.at(index) as FormGroup;
    contactGroup.patchValue({ selectedFileName: '', file: null });
  }


  onSubmit() {

    // contact values  stored in contactValues variable 

    let contactValues = this.contactForm.value.contacts.map((contact: any) => {
      return {
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        category: contact.category,
        functionality: contact.functionality
      };
    });

    let formObj: any = this.partnerForm.value;
    let formArr = Object.entries(formObj);
    let obj: any = {};
    let finalData: any[] = [];
    formArr.forEach(ele => {
      obj.name = ele[0];
      obj.value = ele[1];
      finalData.push(obj);
      obj = {};
    })


    if (this.partnerForm.valid || this.subBusinessPartnerForm.valid || this.contactForm.valid) {
      // submit time all Form  values 
      let data: any = {};

      data.code = this.subBusinessPartnerForm.value.code,
        data.name = this.subBusinessPartnerForm.value.name,
        data.address = this.subBusinessPartnerForm.value.address,

        data.subcategory = this.subBusinessPartnerForm.value.subcategory || null,
        data.categoryId = this.selectedCategory.id;

      data.datavalues = finalData;
      data.contactValues = contactValues;



      const contacts = this.contactForm.value.contacts;

      // Loop through contacts and process each form
      const formData = new FormData();
      contacts.forEach((contact: any) => {
        if (contact.file) {
          formData.append('file', contact.file, contact.email); // Append file with filename
        }
      });
      console.log(formData)

      //formData.append('data', JSON.stringify(data));

      this.contactPartner.postPartner(data).subscribe(() => {
        this.notification.openSnackBar('Contact Added Successfully', 1);
        this.partnerForm.reset();
        this.subBusinessPartnerForm.reset();
        this.contactForm.reset();
        this.resetContactFields();
      })

    } else {
      this.notification.openSnackBar('Please fill all required  businesscontactCategoryFields to continue', 0)
    }
  }
}