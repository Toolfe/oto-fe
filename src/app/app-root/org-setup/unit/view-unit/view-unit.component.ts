import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DivisionService } from 'src/app/app-root/setup-service/org-setup/division/division.service';
import { LocationService } from 'src/app/app-root/setup-service/org-setup/location/location.service';
import { UnitService } from 'src/app/app-root/setup-service/org-setup/unit/unit.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Unit } from './unit-model';



@Component({
  selector: 'app-view-unit',
  templateUrl: './view-unit.component.html',
  styleUrls: ['./view-unit.component.scss']
})
export class ViewUnitComponent implements OnInit{

  division$=this.division.division$;
  location$=this.location.location$;

  searchDivision!:string;
  searchLocation!:string;
  
  tempDiv:any={}; 
  tempLoc:any={}; 
  unitForm:any=FormGroup;
  searchdiv:any;
  divsionctrl = new FormControl();
  update:boolean=false;

 
  constructor(private fb:FormBuilder,
              private notification: NotifierService,
              private division:DivisionService,
              private location:LocationService,
              public dialogRef: MatDialogRef<any>, 
              private org:UnitService,
              @Inject(MAT_DIALOG_DATA) public data:Unit) { }


  ngOnInit(){
    
    this.unitForm=this.fb.group({
      code:[],
      name:[],
      description:[],
      locationId:[],
      divisionId:[]
    });
     if(this.data!=null){
       this.update=true;
      this.editData()
    } 

  }

  getId(data:any, ref:string){
    if(ref==='div'){
      this.tempDiv['id']=data.id;
    }else{
      this.tempLoc['id']=data.id;
    }
  }
  editData(){
    this.tempDiv=this.data.divisionId;
    this.tempLoc=this.data.locationId;
    this.unitForm.patchValue({
      locationId:this.data.locationId,
      divisionId:this.data.divisionId,
      code: this.data.code,
      name: this.data.name,
      description: this.data.description
    })
  }

  
  updateUnit() {
    this.data.divisionId = this.unitForm.value.divisionId;
    this.data.locationId = this.unitForm.value.locationId;
    this.data.name = this.unitForm.value.name;
    this.data.code = this.unitForm.value.code;
    this.data.description = this.unitForm.value.description; 
    this.org.postUnit(this.data).subscribe(res => {
      this.dialogRef.close('data');
      this.notification.openSnackBar('Unit Updated Successfully', 1);
    })
    this.unitForm.reset();
  }

  public addItem(): any {
    if (this.unitForm.valid == true) {
      var dataRow: any = this.unitForm.value;
      this.org.postUnit(dataRow).subscribe(data => {
        this.dialogRef.close(data);
        this.notification.openSnackBar('Unit Added Successfully', 1);
      })
      this.unitForm.reset();
     
    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue',0);
    }
  }
  getDivision(division:any){
    this.searchDivision=division.value;
    }
    getLocation(location:any){
      this.searchLocation=location.value;
    }
}
