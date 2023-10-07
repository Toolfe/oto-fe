import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CompanyService } from 'src/app/app-root/setup-service/org-setup/company/company.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmpCompany } from '../emp-company-model';

@Component({
  selector: 'app-add-emp-company',
  templateUrl: './add-emp-company.component.html',
  styleUrls: ['./add-emp-company.component.scss']
})
export class AddEmpCompanyComponent implements OnInit {
companyForm:any=FormGroup;
update:boolean=false;
  constructor(private fb:FormBuilder,
              private notification:NotifierService,
              public dialogRef: MatDialogRef<any>, 
              private org:CompanyService,
              @Inject(MAT_DIALOG_DATA) public data:EmpCompany,
           
              ) { }
           empCompany:EmpCompany=new EmpCompany();

  ngOnInit(): void {
    this.companyForm=this.fb.group({
      name:[],
      description:[],
      setup:this.fb.group({
        id:sessionStorage.getItem('orgId')
      })
    })
    if(this.data!=null){
      this.update=true;
      this.editData()
    }
  }
  public addItem():any{
    if(this.companyForm.valid==true){
      this.org.getCompany().subscribe(res=>{
          let dataRow=this.companyForm.value;
          this.org.postCompany(dataRow).subscribe(res=>{
            this.dialogRef.close(res);
            this.notification.openSnackBar('Employee Company Added Successfully',1);
          })
          this.companyForm.reset();
      })
    }
    else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  
  }

  editData(){
    this.companyForm.patchValue({
      name: this.data.name,
      code: this.data.code,
      description: this.data.description
    })
  }

  
  updateCompany() {
    this.data.name = this.companyForm.value.name;
    this.data.description = this.companyForm.value.description; 
    this.org.postCompany(this.data).subscribe(res => {
      this.dialogRef.close();
      this.notification.openSnackBar('Employee Company Updated Successfully', 1);
    })
    this.companyForm.reset();
  }




  
}
