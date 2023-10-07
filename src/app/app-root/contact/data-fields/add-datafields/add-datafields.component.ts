import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/app-root/setup-service/contact-setup/category/category.service';
import { ContactSetupService } from 'src/app/app-root/setup-service/contact-setup/contact-setup.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../dataField.model';
import { CountryCodeService } from 'src/app/shared/country-code/country-code.service';
@Component({
  selector: 'app-add-datafields',
  templateUrl: './add-datafields.component.html',
  styleUrls: ['./add-datafields.component.scss']
}) 
 export class AddDatafieldsComponent implements OnInit,AfterViewInit {
  dataFieldForm:any= FormGroup;
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
  {name:'Contact Category',value:'contact_category'},
  {name:'Contact Sub Category',value:'contact_sub_category'},
  {name:'Contact Type1 ',value:'contact_type1'},
  {name:'Contact Type2 ',value:'contact_type2'},
  {name:'Contact Functionality ',value:'contact_functionality'},
  {name:'Business Partner',value:'business_partners'},
  {name:'Project',value:'project'},


]
  fieldEmpty: Boolean=false;
  update:Boolean=false;
  formControls:any[]=[];

field:any
addDefineFileds:any;

  public dataForm: FormGroup = this.fb.group({});
  constructor(private fb:FormBuilder,
              private notification:NotifierService,
              public dialogRef: MatDialogRef<any>,  
              private contactCategory:CategoryService,
              private controlset:CountryCodeService,
              @Inject(MAT_DIALOG_DATA) public data:Category
              ){  }

  ngOnInit(): void {  
    this.contactFields();
    this.dataFieldForm = this.fb.group({
      
     name:[],
     description:[],
     setup:this.fb.group({
      id:sessionStorage.getItem("orgId")
    }),
      fields:this.fb.array([ ])
    })
  if(this.data){
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
    return this.dataFieldForm.get('fields') as FormArray
  }

  editData() {
    this.dataFieldForm.patchValue({
      name:this.data.name,
      description:this.data.description,
      fields:this.data.fields.forEach((field:any)=>{
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
      controlSets=JSON.parse(res.jsonData)
      this.formControls=controlSets; 
      this.nameField=this.formControls.find(x=>x.identifier==='name');  
    })
  }

  myField() {
    return this.fb.group({
      id:[],
      name:[''],
      type:'',
      reference:'',
      validators:this.fb.group({
          maxLength: [],
          minLength: [],
          required: []
      })
    })

  }




  addDefinedField(definedField:any){

  let fields:any[]=[];
  let flag:number;
  fields=this.dataFieldForm.value.fields;
  flag=fields.length;
   this.addField();

   ((this.dataFieldForm.get('fields') as FormArray).at(flag)).patchValue({
    name:definedField.name,
    id:definedField.id,
    type:definedField.type,
    reference:definedField.reference,
    required:definedField.required,
    minLength:definedField.minLength,
    maxLength:definedField.maxLength
    })
    if(this.update!=true){
      ((this.dataFieldForm.get('fields') as FormArray).at(flag)).patchValue({
        id:null
        })
    }
   
      return (c: AbstractControl): { [key: string]: boolean } | null => {
      
        
        let arr:any[]=this.dataFieldForm.get('fields').value;
        const names = arr.map((item:any)=> item.name.trim());
        let duplicateAr:any[]=names.filter(x=>definedField.value==x);
        
        if(duplicateAr.length>0){
         
          
          return {duplicateKey:true}
        }else{
          
          
          return {duplicateKey:false}
        } 
    }
    }
  

  showIcon(index$:any){
    return this.index=index$;
    }
    onDelete(index:number){
   this.fieldForms.removeAt(index);
    }

    updateItem() {
      this.data.name = this.dataFieldForm.value.name;
      this.data.description = this.dataFieldForm.value.description; 
      this.data.fields = this.dataFieldForm.value.fields;
      this.contactCategory.updateCategory(this.data).subscribe(res => {
        this.dialogRef.close();
        this.notification.openSnackBar('Updated Successfully', 1);
      })
      this.dataFieldForm.reset();
    }
  

  save(){   
    if (this.dataFieldForm.valid == true) {

      let dataRow= this.dataFieldForm.value;
      dataRow.setup.id = sessionStorage.getItem('orgId');
      dataRow.createdBy = sessionStorage.getItem('id');
      dataRow.modifiedBy = sessionStorage.getItem('id');
      dataRow.active=true;
      let valueArr = dataRow.fields.map(function(item: { name: any; }){ return item.name });
      let isDuplicate = valueArr.some(function(item: any, idx: any){ 
      return valueArr.indexOf(item) != idx 
        });

    if(isDuplicate==true){
      this.notification.openSnackBar('Please Remove Your Duplicate Entry', 2);

    }else{
      this.contactCategory.postCategory(dataRow).subscribe(data => {
        this.dataFieldForm.reset();
        this.dialogRef.close(data); 
        this.notification.openSnackBar('Category Added Successfully', 1);
      })
    }
    
   
      
    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue',0);
    }


  }
} 