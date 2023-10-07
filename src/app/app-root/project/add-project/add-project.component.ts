import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { PartnerService } from '../../setup-service/business-partners/partner/partner.service';
import { ProjectService } from '../../setup-service/project-setup/project.service';
import { GroupService } from '../../setup-service/task-master-setup/group/group.service';
import { TypeService } from '../../setup-service/task-master-setup/type/type.service';
import { Project } from '../project.model';
import { CategoryService } from '../../setup-service/business-contact-setup/business-category/business-category.service';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {
  type$ = this.taskTypes.type$;
  taskGroup$ = this.group.group$
  searchPartner!: string;
  searchGroup!: string;
  projectForm: any = FormGroup;
  partners: any;
  taskType: any;
  update!: boolean;
  datavalues: any;
  finalArray: any[] = [];
  partnersId: any;
  category$ = this.category.category$;
  constructor(private fb: FormBuilder,
    private service: ProjectService,
    private notification: NotifierService,
    private taskTypes: TypeService,
    private group: GroupService,
    private category: CategoryService,
    private projects: ProjectService,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      projectName: [],
      projectCode: [],
      projectOrderNo: [],
      brandContacts: [],
      group: this.fb.group({
        id: []
      }),
      active: true,
      category: [],
    })
    if (this.data != null) {
      this.update = true;
      this.editData()
    }
  }
  editData() {
    this.projectForm.patchValue({
      projectCode: this.data.code,
      projectName: this.data.name,
      projectOrderNo: this.data.projectOrderNo,
      brandContacts: CommonMethods.getFormArray(this.data.businessCategory.map((id: any) => {
        return id;
      })),
      group: {
        id: this.data.groupId,
      }
    })
  }
  updateProject() {
    if (this.projectForm.valid == true) {
      let dataRow = this.projectForm.value;
      dataRow.brandContacts = dataRow.brandContacts.map((id: any) => {
        return id;
      });
      dataRow.id = this.data.id;
      this.projects.updateProject(dataRow).subscribe(res => {
        this.dialogRef.close("Done");
        this.notification.openSnackBar(' Updated Successfully', 1);
      })
      this.projectForm.reset();
    } else {
      this.notification.openSnackBar('Please fill all required fileds', 0)
    }
  }
  public addItem(): any {
    if (this.projectForm.valid == true) {

      let dataRow = this.projectForm.value;

      if (dataRow.brandContacts.length > 0) {
        dataRow.brandContacts = dataRow.brandContacts.map((id: any) => {
          return id;
        });
      }
      dataRow.active = true;
      this.service.postProject(dataRow).subscribe((res: any) => {
        this.dialogRef.close('done');
        this.notification.openSnackBar(' Added Successfully', 1);
        this.projectForm.reset();
      })

    }
    else {
      this.notification.openSnackBar('Please fill all required fields to continue', 0)
    }
  }



  getCategory(category: any) {
    this.searchPartner = category.value;
  }
  getGroup(group: any) {
    this.searchGroup = group.value;
  }
}