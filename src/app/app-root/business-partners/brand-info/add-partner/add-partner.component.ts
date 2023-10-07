import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PartnerService } from 'src/app/app-root/setup-service/business-partners/partner/partner.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { BrandDetails } from '../../partner-model';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent implements OnInit {

  partnerForm:any=FormGroup;
  update:Boolean=false;
  constructor(private fb:FormBuilder,
              private service:PartnerService,
              private notification:NotifierService,
              public dialogRef: MatDialogRef<any>,  
              @Inject(MAT_DIALOG_DATA) public data:BrandDetails
              ) { }

  ngOnInit(): void {
    this.partnerForm=this.fb.group({
      name:[],
      code:[],
      description:[],
      createdBy:[],
      modifiedBy:[],
      createdOn:[],
      modifiedOn:[]
    })
    
    if(this.data.method=="update"){
      this.update=true;
        this.edit();
    }
    
  }


  edit(){
    this.partnerForm.patchValue({
      name:this.data.name,
      code:this.data.code,
      description:this.data.description,
    })
  }

  onSave(){
    if(this.partnerForm.valid){
      let data:any={};
      data=this.partnerForm.value;
      data.createdBy=sessionStorage.getItem("id");
      data.modifiedBy=sessionStorage.getItem("id"); 
      this.service.postPartnerBrand(data).subscribe(res=>{
        this.dialogRef.close(res);
        this.partnerForm.reset();
        this.notification.openSnackBar("Business partner added!", 1);
      })
    }else{
      this.notification.openSnackBar("Please fill all required fields!", 0);
    }
  }

  onUpdate(){
    this.data.code = this.partnerForm.value.code;
    this.data.name = this.partnerForm.value.name;
    this.data.description = this.partnerForm.value.description; 
    this.service.updatePartnerBrand(this.data).subscribe(res=>{
      this.dialogRef.close('done');
      this.notification.openSnackBar('Department Updated Successfully', 1);
    })
  }
}
