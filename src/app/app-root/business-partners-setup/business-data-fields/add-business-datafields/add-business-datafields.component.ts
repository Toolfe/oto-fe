import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/app-root/setup-service/business-contact-setup/business-category/business-category.service';
import { ContactSetupService } from 'src/app/app-root/setup-service/business-contact-setup/business-contact-setup.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CountryCodeService } from 'src/app/shared/country-code/country-code.service';
import { BusinessCategory } from '../businessdataField.model';
@Component({
  selector: 'app-add-business-datafields',
  templateUrl: './add-business-datafields.component.html',
  styleUrls: ['./add-business-datafields.component.scss']
}) 
 export class AddBusinessDatafieldsComponent implements OnInit,AfterViewInit {
  businessDataFieldForm:any= FormGroup;
  nameField:any={};
  index!:number;
  categories:any;
  category:any;
  required:boolean=true;
  $fields:any=[
 
  {name:'Company',value:'company'},
  {name:'Department',value:'department'},
  {name:'Designation',value:'designation'},
  {name:'Division',value:'division'}, 
  {name:'Employee',value:'employee'},
  {name:'Industry',value:'industry'},
  {name:'Languages',value:'language'},
  {name:'Location',value:'location'},
  {name:'Qualification',value:'qualification'},
  {name:'Resource',value:'resource'},
  {name:'Sub Department',value:'sub_department'},
  {name:'Unit',value:'unit'},
  {name:'UOM',value:'uom'},
  {name:'Working Group',value:'working_group'},
  {name:'Business Partner Category',value:'business_partner_category'},
  {name:'Business Partner Sub Category',value:'business_partner_sub_category'},
  {name:'Business Partner Type1 ',value:'business_partner_type1'},
  {name:'Business Partner Type2 ',value:'business_partner_type2'},
  {name:'Business Partner Functionality ',value:'business_partner_functionality'},

  {name:'Contact Category',value:'contact_category'},
  {name:'Contact functionality',value:'contact_functionality'},

  {name:'Project',value:'project'},
]
  fieldEmpty: Boolean=false;
  update:Boolean=false;
  formControls:any[]=[];

field:any
businessPartnerCategoryFields: any
addDefineFileds:any;

  public dataForm: FormGroup = this.fb.group({});
  constructor(private fb:FormBuilder,
              private notification:NotifierService,
              private service: CategoryService,
              public dialogRef: MatDialogRef<any>,  
              private contactCategory:CategoryService,
              private controlset:CountryCodeService,
              @Inject(MAT_DIALOG_DATA) public data:BusinessCategory
              ){  }

  ngOnInit(): void {  
    this.contactFields();
    this.businessDataFieldForm = this.fb.group({
      
     name:[],
     description:[],
      fields:this.fb.array([ ])
    })
  if(this.data != null){
      this.update = true;
      this.editData();
    }
  }
  
  ngAfterViewInit(): void {
 if(this.data==null){  
 setTimeout(()=>{
  this.addDefinedField(this.nameField);
 },300);
 
 }
 
  }
  get fieldForms() { 
    return this.businessDataFieldForm.get('fields') as FormArray
  }


  editData() {
    this.businessDataFieldForm.patchValue({
      name:this.data.name,
      description:this.data.description,
      fields:this.data.businessPartnerCategoryFields.slice().reverse().forEach((field:any)=>{
        this.addDefinedField(field);
        this.field=field;
      })
    });
 
  }

  addField(){
     this.fieldForms.push(this.myField());
     
   }

   contactFields(){
    this.controlset.getControlSet().subscribe(res=>{
      let controlSets:any;
      controlSets=JSON.parse(res.jsonData);
      this.formControls=controlSets; 
      this.nameField=this.formControls.find((x: any)=>x.identifier==='name');  
    });
  }

  myField() {
    return this.fb.group({
      id:[],
      name:[''],
      type:'',
      reference:[],
      maxLength: [],
      required: [],
    });

  }
  
  addDefinedField(definedField: any) {
    const fields = this.businessDataFieldForm.get('fields') as FormArray;
    this.addField();
  
    const flag = fields.length - 1;
    const fieldForm = fields.at(flag) as FormGroup;
    fieldForm.patchValue({
      name: definedField.fieldName,
      id: definedField.id,
      type: definedField.fieldType,
      reference: definedField.fieldReference,
      maxLength:definedField.fieldMaxLength,
      required:definedField.fieldRequired === 1 ? true : false,

    }); 
  
    if (!this.update) {
      fieldForm.patchValue({
        id: null
      });
    }
  
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      const arr: any[] = this.businessDataFieldForm.get('fields').value;
      const names = arr.map((item: any) => item.name.trim());
      const duplicateAr: any[] = names.filter((x: string) => definedField.fieldName == x);
  
      if (duplicateAr.length > 0) {
        return { duplicateKey: true };
      } else {
        return { duplicateKey: false };
      }
    };
  }
  
  showIcon(index$:any){
    return this.index=index$;
    }
    onDelete(index:number){
   this.fieldForms.removeAt(index);
    }

    updateItem() {
      this.data.name = this.businessDataFieldForm.value.name;
      this.data.description = this.businessDataFieldForm.value.description;
      this.data.fields = this.businessDataFieldForm.value.fields.map((field: any) => {
        if (
          field.type === 'select' ||field.type === 'email' ||field.type === 'tel' ||field.type === 'date' ||field.type === 'textarea' ||field.type === 'radio') {
          return {
            ...field,
            maxLength: null
          };
        }
        if (field.type === 'text' ||field.type === 'number' ||field.type === 'email' ||field.type === 'tel' ||field.type === 'date' ||field.type === 'textarea' ||field.type === 'radio') {
          return {
            ...field,
            reference: null
          };
        }
        return field;
      });
      this.contactCategory.updateCategory(this.data).subscribe(res => {
        this.dialogRef.close('done');
    
        this.notification.openSnackBar('Business Partner Category Updated Successfully', 1);
      });
    
      this.businessDataFieldForm.reset();
}
    
  
  save(){   
    if (this.businessDataFieldForm.valid == true) {
      let dataRow= this.businessDataFieldForm.value;
      dataRow.active=true;
      let valueArr = dataRow.fields.map(function(item: { name: any; }){ return item.name });
      let isDuplicate = valueArr.some(function(item: any, idx: any){ 
      return valueArr.indexOf(item) != idx 
      });

    if(isDuplicate==true){
      this.notification.openSnackBar('Please Remove Your Duplicate Entry', 2);

    }else{
      this.contactCategory.postCategory(dataRow).subscribe(data => {
        this.businessDataFieldForm.reset();
        this.dialogRef.close(data); 
        this.notification.openSnackBar('Business Partner Category Added Successfully', 1);
        
      })
    }  
    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue',0);
    }


  }
} 