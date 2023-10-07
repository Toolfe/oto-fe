import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Tasks } from '../../task/create-task/task-model';
import { TaskService } from '../../task/service/task-service.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-emp-task-details',
  templateUrl: './emp-task-details.component.html',
  styleUrls: ['./emp-task-details.component.scss']
})
export class EmpTaskDetailsComponent {
  dataSource: any;
  columnsToDisplay = ['name', 'timeSpent'];
  isNoDataFound!: boolean;
  form: any = FormGroup;


  constructor(private service: TaskService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.dateForm();
    this.dataSource = new MatTableDataSource();
  }

  dateForm() {
    this.form = this.fb.group({
      date: this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    })
    this.submit();
  }
  submit() {
    let dataRow: any = {}
    dataRow.id = this.data;
    dataRow.date = this.form.value.date;


    this.service.employeeDashboardStatus(dataRow).subscribe(res => {

      if (res.data.length == 0) {
        this.isNoDataFound = true;
      } else {
        this.isNoDataFound = false
        this.dataSource = new MatTableDataSource(res.data);
      }
    })


  }





  getEmpTask(data: any) {
    console.log(data, 'datatata');


  }

}
