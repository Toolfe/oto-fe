import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SkillSetService } from 'src/app/app-root/setup-service/org-setup/skill-set/skill-set.service';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Skills } from '../skills.model';

@Component({
  selector: 'app-add-emp-skills',
  templateUrl: './add-emp-skills.component.html',
  styleUrls: ['./add-emp-skills.component.scss']
})
export class AddEmpSkillsComponent implements OnInit {
  skillsForm:any=FormGroup;
  update:boolean=false;
  constructor(private fb:FormBuilder,
    private notification:NotifierService,
    public dialogRef: MatDialogRef<any>,  
    private org:SkillSetService,
    @Inject(MAT_DIALOG_DATA) public data:Skills,) { }

  ngOnInit(): void {
    this.skillsForm=this.fb.group({
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
    if(this.skillsForm.valid==true){
      this.org.getSkillSet().subscribe(res=>{


          let dataRow=this.skillsForm.value;
          this.org.postSkillSet(dataRow).subscribe(res=>{
            this.dialogRef.close(res);
            this.notification.openSnackBar('Employee Skill Set Added Successfully',1);
          })
          this.skillsForm.reset();
      })
    }
    else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  
  }

  editData(){
    this.skillsForm.patchValue({
      name: this.data.name,
      code: this.data.code,
      description: this.data.description
    })
  }

  
  updateSkills() {
    this.data.name = this.skillsForm.value.name;
    this.data.description = this.skillsForm.value.description; 
    this.org.postSkillSet(this.data).subscribe(res => {
      this.dialogRef.close('done');
      this.notification.openSnackBar('Employee Skill set Updated Successfully', 1);
    })
    this.skillsForm.reset();
  }
  }