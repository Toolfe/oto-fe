import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/app-root/setup-service/business-contact-setup/business-category/business-category.service';

import { DocCategoryService } from 'src/app/app-root/setup-service/doc-master-setup/category/category.service';
import { DocTypeService } from 'src/app/app-root/setup-service/doc-master-setup/type/type.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { CountryCodeService } from 'src/app/shared/country-code/country-code.service';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { DocTypeModel } from '../type-model';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./../../../contact/data-fields/data-fields.component.scss','./add-type.component.scss']
})
export class AddTypeComponent implements OnInit {

category$=this.docservice.category$;
//contactCategory$=this.contactService.category$;
formFields:any;
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
]
update!:boolean;
index!:number;
typeForm:any=FormGroup;
category:any;
  field: any;
  constructor(
    private fb:FormBuilder,
    private service:DocTypeService,
    private notification:NotifierService,
    private docservice:DocCategoryService,
    private contactService:CategoryService,
    private sharedRequest:CountryCodeService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: DocTypeModel
  ) { }

  ngOnInit(): void {
    this.getControlSet();
    this.typeForm=this.fb.group({
      code:[],
      name:[],
      customFields:this.fb.array([ ]),
      documentCategoryId:[],
      // contactCategory:[],
      size:[],
      validity:[],
    })
    if(this.data!=null){
      this.update=true;
      this.editData();
    }
  }

  getControlSet(){
    this.sharedRequest.getControlSet().subscribe(res=>{
      let obj:any;
      obj=JSON.parse(res.jsonData);
      this.formFields=obj;
    })
  }

  get fieldForms() { 
    return this.typeForm.get('customFields') as FormArray
  }

  addField(){
    this.fieldForms.push(this.myField()); 
  }

  addDefinedField(definedField:any){

    let fields:any[]=[];
    let flag:number;
    fields=this.typeForm.value.customFields;
    
    flag=fields.length;
    
    
    
      
     this.addField();
     ((this.typeForm.get('customFields') as FormArray).at(flag)).patchValue({
      
      id:definedField.id,
      name:definedField.name,
      type:definedField.type,
      description:definedField.description,
      reference:definedField.reference,
      required:definedField.required,
      maxLength:definedField.maxLength,
      minLength:definedField.minLength,
      })
      if(this.update!=true){
        ((this.typeForm.get('customFields') as FormArray).at(flag)).patchValue({
          id:null
          })
      }
    }

   myField() {
    return this.fb.group({
      id:[],
      name:[],
      type:[],
      description:[],
      reference:[],
      required: [],
      maxLength: 0,
      minLength: 0,
    })

  }

  showIcon(index$:any){
    return this.index=index$;
    }
    onDelete(index:number){
   this.fieldForms.removeAt(index);
    }

  addItem(){    
    if(this.typeForm.valid==true){
      let dataRow=this.typeForm.value;

      // dataRow.customFields=JSON.stringify(this.typeForm.value.customFields);

        this.service.postType(dataRow).subscribe((res:any)=>{
        this.dialogRef.close('done');
        this.notification.openSnackBar('Type Added Successfully',1);
      })
      
    }  else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  }

  editData(){
    this.typeForm.patchValue({
      code:this.data.code,
      name:this.data.name,
      documentCategoryId:this.data.documentCategoryId,
      // contactCategory:CommonMethods.getFormArray(this.data.contactCategory),
      size:this.data.size,
      validity:this.data.validity,
      customFields:JSON.parse(this.data.customFields).forEach((field:any)=>{
        this.addDefinedField(field);
        this.field=field;
      })
    });
  }

  updateType(){
    if(this.typeForm.valid==true){
      this.typeForm.value.id = this.data.id;
     this.data.code=this.typeForm.value.code;
      this.service.postType(this.typeForm.value).subscribe((res:any)=>{
        this.dialogRef.close('done');
        this.notification.openSnackBar('Type Updated Successfully',1);
      })
    }else{
      this.notification.shownNotification('Please fill all required fields to continue','ok','primary',5000,'end','bottom');
    }
  }


}
