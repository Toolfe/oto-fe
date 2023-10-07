import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DeptService } from 'src/app/app-root/setup-service/org-setup/dept/dept.service';
import { TypeService } from 'src/app/app-root/setup-service/task-master-setup/type/type.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { Type } from '../type.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { SetScaleRangeService } from 'src/app/app-root/setup-service/task-master-setup/scale/set-scale-range.service';
import { ExpectationService } from 'src/app/app-root/setup-service/task-master-setup/expectation/expectation.service';
import { CountryCodeService } from 'src/app/shared/country-code/country-code.service';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./../../../../app-root/doc-master-setup/type/add-type/add-type.component.scss','./add-type.component.scss'],
})
export class AddTypeComponent implements OnInit {
  dept$ = this.dept.department$;
  scalerange$ = this.scaleRange.minimumRange$;
  expectation$ = this.expectation.expectation$.pipe(shareReplay());
  minDate= new Date();


  update: boolean = false;
  checked = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  dayList: string[] = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  dateList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  recurrence: any[] = [
    {id:1, name: 'Daily', value: 'daily' },
    {id:2, name: 'Weekly', value: 'weekly' },
    {id:3, name: 'Monthly', value: 'monthly' },
    { id:4,name: 'Yearly', value: 'yearly' },
    {id:5, name: 'No Fixed Time', value: 'noFixed' }
  ];
  repeatMonth: any[] = [{month:'January',date:1},{month:'February',date:2},
  {month:'March',date:3},{month:'Apirl',date:4},  {month:'May',date:5},
  {month:'June',date:6},  {month:'July',date:7},{month:'August',date:8},
  {month:'September',date:9},{month:'October',date:10},{month:'November',date:11},
  {month:'December',date:12},]
  repeatYear: number[] = [1, 2, 3, 4, 5]
  repeatWeek: number[] = [1, 2, 3, 4];
  repeatMonths: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,]
  repeateDay: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  weeks: any[] = ['First', 'Second', 'Third', 'Fourth']


  selectedExpectations: any[] = [];

  typeForm: any = FormGroup;

  searchDept!: string;
  searchExpectation!: string;
  neverEnds: any;
  endDate:any;
  endAfter:any;
  index!:number;
  field: any;
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
  {name:'Contact Category',value:'contact_category'},
  {name:'Contact Sub Category',value:'contact_sub_category'},
  {name:'Contact Type1 ',value:'contact_type1'},
  {name:'Contact Type2 ',value:'contact_type2'},
  {name:'Contact Functionality ',value:'contact_functionality'},
  {name:'Business Partner',value:'partner'},
  {name:'Project',value:'project'},
  {name:'Order',value:'order'},
 
]


  constructor(private fb: FormBuilder,
    private notification: NotifierService,
    private tasksetup: TypeService,
    public dialogRef: MatDialogRef<any>,
    private dept: DeptService,
    private scaleRange: SetScaleRangeService,
    private sharedRequest:CountryCodeService,
    private expectation: ExpectationService,
    @Inject(MAT_DIALOG_DATA) public data: Type) {
 
  }

  ngOnInit(): void {
  
    this.getControlSet();
    this.typeForm = this.fb.group({
      code: [],
      name: [],
      department: this.fb.group({
        id:[]
      }),
      expectations: [],
      scaleValue: [],
      customFields:this.fb.array([ ]),
      recurrence: this.fb.group({
        type: [],
        repeatEvery: [],
        occurOnDays: [],
        repeatEveryWeek: [],
        repeatEveryMonth: [],
        repeatEveryYear: [],
        dateByte:[],
        saveTime:[],
        day: [],
        months:[],
        endDate: [],
        neverEnds: [],
        endsOn:[]
      }),
      setup: this.fb.group({
        id: sessionStorage.getItem('orgId')
      })
    });
    if (this.data != null) {
     this.minDate=new Date("2015-03-25");
      this.update = true;
      this.editData()
    }else{
      let toSelect = this.recurrence.find(c => c.id == 5);
  
    let data:any=toSelect.name;
    this.typeForm.get('recurrence').get('type').setValue(toSelect.value);
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
      name:definedField.fieldName,
      id:definedField.fieldId,
      type:definedField.fieldType,
      ref:definedField.fieldReference,
      maxLength:definedField.fieldMaxLength,
      minLength:definedField.fieldMinLength,
      required:definedField.fieldRequired === 1 ? true : false,
      enterBy:definedField.enterByType
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
      name:'',
      type:'',
      ref:'',
      maxLength: [],
      minLength: [],
      required: [],
      enterBy:[],
    
    })

  }

  showIcon(index$:any){
    return this.index=index$;
    }
    onDelete(index:number){
   this.fieldForms.removeAt(index);
    }

  editData() {

    const expectationIds = this.data.taskExpectation.map((id: any) => {
      return id.expectationId;
    });
    this.typeForm.get('expectations').patchValue(expectationIds);

    this.typeForm.patchValue({
      name: this.data.name,
      code: this.data.code,
      department: {id: this.data.departmentId},
      scaleValue: this.data.scaleValue,
     // recurrence: this.data.recurrence,

      customFields:this.data.taskTypeFields.forEach((field:any)=>{
        this.addDefinedField(field);
        this.field=field;
      }),
    })
  // this.neverEnds=this.data.recurrence.neverEnds;
 
  
  }
  


  updateType() {
    
    if(this.typeForm.valid==true){
      let dataRow=this.data;
    //  let id = this.data.recurrence.id;
      dataRow.id = this.data.id;
      dataRow.name = this.typeForm.value.name
      dataRow.code =this.typeForm.value.code;
      dataRow.department = this.typeForm.value.department;
      dataRow.expectations = this.typeForm.value.expectations;
      this.data.customFields=this.typeForm.value.customFields.map((field: any) => {
      if (
        field.type === 'select' ||field.type === 'email' ||field.type === 'tel' ||field.type === 'date' ||field.type === 'textarea' ||field.type === 'radio' ||field.type ===  'file') {
        return {
          ...field,
          maxLength: null
        };
      }
      if (field.type === 'text' ||field.type === 'number' ||field.type === 'email' ||field.type === 'tel' ||field.type === 'date' ||field.type === 'textarea' ||field.type === 'radio'||field.type ===  'file') {
        return {
          ...field,
          ref: null
        };
      }
      return field;
    });
 
     dataRow.scaleValue = this.typeForm.value.scaleValue;
     // dataRow.recurrence = this.typeForm.value.recurrence
     // dataRow.recurrence.neverEnds = this.neverEnds;
      dataRow.createdBy = this.data.createdBy;
      dataRow.modifiedBy = this.data.modifiedBy;
      dataRow.active = this.data.active;
     // this.data.recurrence.id = id

      this.tasksetup.updateType(dataRow).subscribe(() => {
        this.dialogRef.close('done');
        this.notification.openSnackBar(' Updated Successfully', 1);
        
      })
      
    this.typeForm.reset();
  }else{
    this.notification.openSnackBar('Please fill all required fileds',0)
    
  }

  }



  addItem(){    
    if(this.typeForm.valid==true){
      let dataRow: any = this.typeForm.value;
      dataRow.active = true;
      dataRow.customFields=this.typeForm.value.customFields;
      let recurrence = dataRow.recurrence;
      dataRow.recurrence.type=this.typeForm.value.recurrence.type;
      if (recurrence.type == 'daily') {
        dataRow.recurrence.repeatEvery = this.typeForm.value.recurrence.repeatEvery;
        dataRow.recurrence.occurOnDays = null;
        dataRow.recurrence.week = null;
        dataRow.recurrence.day = null;
        dataRow.recurrence.dateByte = null;
        dataRow.recurrence.endDate = this.typeForm.value.recurrence.endDate;
        dataRow.recurrence.neverEnds = this.neverEnds;
      }
      if (recurrence.type == 'weekly') {
        dataRow.recurrence.repeatEveryWeek = this.typeForm.value.recurrence.repeatEveryWeek;
        dataRow.recurrence.occurOnDays = this.typeForm.value.recurrence.occurOnDays;
        dataRow.recurrence.day = this.typeForm.value.recurrence.day;
        dataRow.recurrence.dateByte = null;
        dataRow.recurrence.endDate = this.typeForm.value.recurrence.endDate;
        dataRow.recurrence.neverEnds = this.neverEnds;
      }
      if (recurrence.type == 'monthly') {
        dataRow.recurrence.repeatEveryMonth = this.typeForm.value.recurrence.repeatEveryMonth;
        dataRow.recurrence.repeatEveryWeek = this.typeForm.value.recurrence.repeatEveryWeek;
        dataRow.recurrence.occurOnDays = this.typeForm.value.recurrence.occurOnDays;
        dataRow.recurrence.months = this.typeForm.value.recurrence.months;
        dataRow.recurrence.day = null;
        dataRow.recurrence.dateByte = this.typeForm.value.recurrence.dateByte;
        dataRow.recurrence.endDate = this.typeForm.value.recurrence.endDate;
        dataRow.recurrence.neverEnds = this.neverEnds;
      }
      if (recurrence.type == 'yearly') {
        dataRow.recurrence.repeatEveryYear = this.typeForm.value.recurrence.repeatEveryYear;
        dataRow.recurrence.repeatEveryMonth = this.typeForm.value.recurrence.repeatEveryMonth;
        dataRow.recurrence.repeatEveryWeek = this.typeForm.value.recurrence.repeatEveryWeek;
        dataRow.recurrence.occurOnDays = this.typeForm.value.recurrence.occurOnDays;
        dataRow.recurrence.months = this.typeForm.value.recurrence.months;
        dataRow.recurrence.day = null;
        dataRow.recurrence.dateByte = this.typeForm.value.recurrence.dateByte;
        dataRow.recurrence.endDate = this.typeForm.value.recurrence.endDate;
        dataRow.recurrence.neverEnds = this.neverEnds;
      }
      if (recurrence.type == 'noFixed') {
        dataRow.recurrence={};
      }

     
      if(dataRow.expectations==null){
        dataRow.expectations=[];
    
      }else{
        //dataRow.expectations=CommonMethods.returnId(dataRow.expectations);
        dataRow.expectations=dataRow.expectations;
      }
      dataRow.active=true;
      let customField:any;
      customField=dataRow.customFields
    
      let valueArr = customField.map(function(item: { name: any; }){ return item.name });
      let isDuplicate = valueArr.some(function(item: any, idx: any){ 
      return valueArr.indexOf(item) != idx;
      
  });

  if(customField.length==0){
    this.tasksetup.postType(dataRow).subscribe(res=>{
      this.dialogRef.close('done');
      this.notification.openSnackBar('Type Added Successfully',1);
    },error=>{
      if(error){
        this.notification.openSnackBar(error,0)
      }
    })
  }else{
    if(isDuplicate==true){
      this.notification.openSnackBar('Please Remove Your Duplicate Entry', 2);
    }
    else{
    
      
      this.tasksetup.postType(dataRow).subscribe(res=>{
        this.dialogRef.close('done');
        this.notification.openSnackBar('Type Added Successfully',1);
      },error=>{
        if(error){
          this.notification.openSnackBar(error,0)
        }
      })
    }
  }
    }  else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  }

  getNeverEnds(never: any) {
 
    
    if(never.value==="1"){
      this.neverEnds=false;
      
    }
    else if(never.value==="2"){
      this.neverEnds=false;;
      this.typeForm.get('recurrence.endDate').value=null;
  
    }else{
      this.neverEnds=true;
  
    }
 
   
  }
  getDept(dept: any) {
    this.searchDept = dept.value;
  }
  getExpectation(expectation: any) {
    this.searchExpectation = expectation.value;
  }
  getV(data:any){
    
   
  }
  
}
