import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { PartnerService } from '../../../setup-service/business-partners/partner/partner.service';
import { CategoryService } from '../../../setup-service/business-contact-setup/business-category/business-category.service';
import { FunctionalityService } from '../../../setup-service/business-contact-setup/business-functionality/business-functionality.service';
import { SubCategoryService } from '../../../setup-service/business-contact-setup/sub-category/sub-category.service';
import { Type1Service } from '../../../setup-service/business-contact-setup/type1/type1.service';
import { Type2Service } from '../../../setup-service/business-contact-setup/type2/type2.service';
import { EmployeeService } from '../../../setup-service/emp-setup/employee/employee.service';
import { BasicInfoService } from '../../../setup-service/org-setup/basic-info/basic-info.service';
import { CompanyService } from '../../../setup-service/org-setup/company/company.service';
import { DeptService } from '../../../setup-service/org-setup/dept/dept.service';
import { DesignationService } from '../../../setup-service/org-setup/designation/designation.service';
import { DivisionService } from '../../../setup-service/org-setup/division/division.service';
import { IndustryService } from '../../../setup-service/org-setup/industry/industry.service';
import { LanguagesService } from '../../../setup-service/org-setup/languages/languages.service';
import { LocationService } from '../../../setup-service/org-setup/location/location.service';
import { OrgSetupService } from '../../../setup-service/org-setup/org-setup.service';
import { QualificationService } from '../../../setup-service/org-setup/qualification/qualification.service';
import { ResourceService } from '../../../setup-service/org-setup/resource/resource.service';
import { SubDeptService } from '../../../setup-service/org-setup/sub-dept/sub-dept.service';
import { UnitService } from '../../../setup-service/org-setup/unit/unit.service';
import { UomService } from '../../../setup-service/org-setup/uom/uom.service';
import { WorkingGroupService } from '../../../setup-service/org-setup/working-group/working-group.service';
import { ProjectService } from '../../../setup-service/project-setup/project.service';
import { PriorityService } from '../../../setup-service/task-master-setup/priority/priority.service';
import { BusinessPartnersService } from 'src/app/app-root/setup-service/business-partners/business-partners.service';
import { ContactCategoryService } from 'src/app/app-root/setup-service/contact-setup/category/category.service';
import { ContactFunctionalityService } from 'src/app/app-root/setup-service/contact-setup/functionality/functionality.service';
interface DataValues {
  name: string;
  value: string;
}
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  category$ = this.category.category$;
  partnerBrand$ = this.partner.partner$;
  contactFunctionality$ = this.partner.contactFunctionality$;
  subcategory$ = this.subcategory.subcategory$;

  partnerForm: any = FormGroup;
  contactForm: any = FormGroup;
  individualContactForm!: FormGroup;
  subBusinessPartnerForm: any = FormGroup;
  formFields: any[] = [];

  dataValue: any;
  businessFields:any
  contactDataValue: any;
  individualContactData:any;
  businessCategoryId: any;
  businessPartnerId:any;


  finalObject: any = {};
  partnerData: any;
  selectedCategory: any;
  categories: any;
  selectedDataValues: any;


  addingContact!: boolean;
  update!: boolean;
  isEditMode!: boolean;
  selectedFileName: any;
  constructor(
    private fb: FormBuilder,
    private category: CategoryService,
    private partner: ContactCategoryService,
    private contactPartner: BusinessPartnersService,
    private empService: EmployeeService,
    private subdept: SubDeptService,
    private deptService: DeptService,
    private designationService: DesignationService,
    private divisionService: DivisionService,
    private industryService: IndustryService,
    private languageService: LanguagesService,
    private locationService: LocationService,
    private qualificationService: QualificationService,
    private resourceService: ResourceService,
    private unitService: UnitService,
    private uomService: UomService,
    private workinggroupService: WorkingGroupService,

    private contact: ContactCategoryService,
    private contactFunctionality: ContactFunctionalityService,

    private addressService: BasicInfoService,
    private companyService: CompanyService,
    private project: ProjectService,
    private subcategory: SubCategoryService,
    private type1: Type1Service,
    private type2: Type2Service,
    private functionality: FunctionalityService,
    private notification: NotifierService,
    public dialogRef: MatDialogRef<EditComponent>,

    private formBuilder: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  
  }

  ngOnInit(): void {
  
  this.addingContact = this.data.addContact;
  this.businessCategoryId = this.data.businessCategoryId;

  if(this.addingContact==true){
    this.individualContactDataForm();
  }

  //get the  data fields
  this.businessFields = this.data.businessFields ;
  // get the  field data values 
  this.dataValue = this.data.datavalues ;
  // get the  contact  data values
  this.contactDataValue = this.data.contactDataValues;
  this.businessPartnerId = this.data.businessPartnerId;
  

  this.subcategory$ = this.subcategory.getSubCategoryList(this.businessCategoryId);


   //call businessFieldApply  for patch key values
    this.businessFieldApply()
    
    this.partnerForm = this.fb.group({});


  // Add  Custom Fields in  subBusinessPartnerForm 

    this.subBusinessPartnerForm = this.fb.group({
      code: [this.data?.code || null, Validators.required],
      name: [this.data?.name || null, Validators.required],
      address: [this.data?.address || null, Validators.required],
      subcategory: [this.data?.businessSubCategoryId || null, Validators.required],
    });


    this.partnerForm = this.formBuilder.group({});

    // Loop through the atavalues array and set the values to the corresponding form controls
    for (const controlData of this.dataValue) {
      const controlName = controlData.name;
      const controlValue = controlData.value;

      // If the controlName exists in the formFields array, add it to the formGroup
      const fieldControl = this.formFields.find((field) => field.name === controlName);
      if (fieldControl) {
        this.partnerForm.addControl(controlName, new FormControl(controlValue));
      }
    }


    this.contactForm = this.formBuilder.group({
      contacts: this.formBuilder.array([])
    });


   // Add  contactDataVale in  contact forms
    const contactDataValues = this.contactDataValue
    for (const contactData of contactDataValues) {
      this.addContactField(contactData.id, contactData.name, contactData.email, contactData.phone, contactData.category, contactData.functionality,
      );
    }
    
  
    setTimeout(() => {
      this.update = true;
      this.edit();
    }, 500);

  }


  individualContactDataForm() {
    this.individualContactData = this.data.contactData && this.data.contactData.length > 0 ? this.data.contactData[0] : null;
  
    this.individualContactForm = this.fb.group({
      id: [this.individualContactData ? this.individualContactData.id : null],
      name: [this.individualContactData ? this.individualContactData.name : '', Validators.required],
      email: [this.individualContactData ? this.individualContactData.email : '', [Validators.required, Validators.email]],
      phone: [this.individualContactData ? this.individualContactData.phone : '', Validators.required],
      category: [this.individualContactData ? this.individualContactData.contactCategoryId : null, Validators.required],
      functionality: [this.individualContactData ? this.individualContactData.contactFunctionalityId : null, Validators.required],
    });
  }
  
  get contacts(): FormArray {
    return this.contactForm.get('contacts') as FormArray;
  }


  addContactField(id: number = 0, name: string = '', email: string = '', phone: string = '', category: number = 0, functionality: number = 0) {   // add contact fields in edit time
    const contactFormGroup = this.formBuilder.group({
      id: [id],
      name: [name, Validators.required],
      email: [email, [Validators.required, Validators.email]],
      phone: [phone, Validators.required],
      category: [category],
      functionality: [functionality],
    });
    this.contacts.push(contactFormGroup);
  }

  
  removeContactField(index: number) {
    this.contacts.removeAt(index);
  }
  // Reset the form array
  resetContactFields() {
    this.contactForm.setControl('contacts', this.formBuilder.array([]));
  }
  

  

  businessFieldApply() {


    const dataObject: { [key: string]: string } = {};

    for (let i = this.dataValue.length - 1; i >= 0; i--) {
      const item = this.dataValue[i];
      dataObject[item.name] = item.value;
    }
  
      this.formFields =  this.businessFields
      this.partnerForm = this.fb.group({});

      for (let i = 0; i < this.formFields.length; i++) {
        this.partnerForm.addControl(this.formFields[i].fieldName, new FormControl(''));
      }

      for (const key in this.partnerForm.value) {
        this.partnerForm.patchValue({ [key]: dataObject[key] });
      }
      console.log(this.partnerForm.value)
      console.log(this.formFields);
    }
 

  currentControl(ref: any): any {
    switch (ref) {
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
        return this.subdept.subDept$;
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

 
  edit() {

    return this.finalObject;
  }
  
  uploadIndividualFile(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      this.selectedFileName = file.name;
      // Process the selected file here
    }
  }

  removeFile(): void {
    this.selectedFileName = null;
    // Perform necessary cleanup here
  }
  
  onSubmit() {
    if (this.subBusinessPartnerForm.valid & this.contactForm.valid) {
      const formValues = this.partnerForm.value;
      const dataValues = Object.entries(formValues).map(([name, value]) => ({ name, value }));

      const contactsControl = this.contactForm.get('contacts');
      const contacts = contactsControl ? contactsControl.value.map((contact: any) => ({
        id: contact.id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        category: contact.category,
        functionality: contact.functionality
      })) : [];

      const data = {
      datavalues: dataValues,
      contactvalues: contacts,
      categoryId: this.data.businessCategoryId,
      businessPartnerId:this.data.id,
      };

      this.contactPartner.postPartner(data).subscribe(() => {
        this.notification.openSnackBar('Contact Updated Successfully', 1);
        this.dialogRef.close('done');
      });
    }
    else if (this.individualContactForm.value &&this.individualContactForm.valid){
      const contactData = this.individualContactForm.value;
      contactData.businessPartner = this.businessPartnerId;
          console.log(contactData)

      this.contactPartner.postContactPartner(contactData).subscribe(() => {
        this.notification.openSnackBar('Contact Updated Successfully', 1);
        this.dialogRef.close('done');
      });
    }
    ;
  }
}
