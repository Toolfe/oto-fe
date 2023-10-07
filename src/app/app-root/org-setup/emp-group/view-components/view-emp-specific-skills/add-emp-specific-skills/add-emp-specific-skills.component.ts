import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IndustrySkillsService } from 'src/app/app-root/setup-service/org-setup/industry-skills/industry-skills.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpecificSkills } from '../specific-skills.model';

@Component({
  selector: 'app-add-emp-specific-skills',
  templateUrl: './add-emp-specific-skills.component.html',
  styleUrls: ['./add-emp-specific-skills.component.scss']
})
export class AddEmpSpecificSkillsComponent implements OnInit {
  specificSkillsForm:any=FormGroup
  update!:boolean;
  constructor(private fb:FormBuilder,
    private notification:NotifierService,
    public dialogRef: MatDialogRef<any>, 
    private org:IndustrySkillsService,
    @Inject(MAT_DIALOG_DATA) public data:SpecificSkills,) { }

  ngOnInit(): void {
    this.specificSkillsForm=this.fb.group({
      name:[],
      description:[],
      setup:this.fb.group({
        id:sessionStorage.getItem('orgId'),
      })
    })
    if(this.data!=null){
      this.update=true;
      this.editData()
    }
  }
  public addItem(){
    if(this.specificSkillsForm.valid==true){
      this.org.getSpecificSkill().subscribe(res=>{
          let dataRow=this.specificSkillsForm.value;
          this.org.postSpecificSkill(dataRow).subscribe(res=>{
            this.dialogRef.close(res);
            this.notification.openSnackBar('Employee Industry Specific Skills Added Successfully',1);
          })
          this.specificSkillsForm.reset();
        
      })
    }
    else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  
  }

  editData(){
    this.specificSkillsForm.patchValue({
      name: this.data.name,
      code: this.data.code,
      description: this.data.description
    })
  }

  
  updateSkills() {
    this.data.name = this.specificSkillsForm.value.name;
    this.data.description = this.specificSkillsForm.value.description; 
    this.org.postSpecificSkill(this.data).subscribe(res => {
      this.dialogRef.close('done');
      this.notification.openSnackBar('Employee Industry Specific Skills Updated Successfully', 1);
    })
    this.specificSkillsForm.reset();
  }
  }