import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/app-root/setup-service/emp-setup/employee/employee.service';
import { TaskService } from '../../task/service/task-service.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-emp-history',
  templateUrl: './emp-history.component.html',
  styleUrls: ['./emp-history.component.scss']
})

export class EmpHistoryComponent implements OnInit {
  selectedFish: FormControl = new FormControl('');
  $employee = this.service.getMasterData('em000');
  reportexcel: any = {};
  headers: any = []; // Replace this with the actual headers you want to set
  dataToExport: any = []; // Replace this with the actual data you want to export
  isButtonDisabled: boolean = true;
  selectedEmpvalue: any;
  selectedDateRange: any;
  selectedEmp!: string;
  searchCreatedBy: any;
  empId: any;
  dataSource: any;

  @ViewChild(MatMenuTrigger)
  ddTrigger!: MatMenuTrigger;

  @ViewChild(MatMenuTrigger)
  type!: MatMenuTrigger;
  columnsToDisplay = ['name', 'start time', 'stop time', 'timeSpent', 'date', 'assignee', 'creator'];
  columnsToDisplaySummary = ['name', 'timeSpent', 'date', 'assignee', 'creator'];

  constructor(
    private service: TaskService,
    private enpservice: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.dataSource = new MatTableDataSource();
    this.onChipClicked('summary');
  }

  onSearchEmp(emp: any) {
    // this.selectedEmp = this.selectedEmpvalue;
    // this.selectedEmpvalue = undefined;
    this.reportexcel.creatorId = emp.id;
    // console.log(this.empId,'empid');
    this.ddTrigger.closeMenu();

  }

  onSubmit() {
    console.log(this.reportexcel);
    this.service.getEmpDetails(this.reportexcel).subscribe(res => {
      console.log(res, 'empdetails');
      this.dataSource = new MatTableDataSource(res);
      this.dataToExport = [];
      if (res.length > 0) {
        this.isButtonDisabled = false;
        this.dataToExport = res;
      }
    })
  }



  onRefresh() {
    this.reportexcel = {};
    this.onChipClicked('summary');

  }

  onExportExcel() {
    let nowDate = new Date();
    let date = nowDate.getDate() + '/' + (nowDate.getMonth() + 1) + '/' + nowDate.getFullYear();
    if (this.reportexcel.type == 'detail') {
      const title = 'Detail';
      const filename = title + '_' + date + '.xlsx';
      const fieldheader = ['subtaskTitle', 'comment', 'startDate', 'endDate', 'timeSpent', 'createdAt', 'assignee', 'creator'];
      const header = ['Task Name', 'Comments', 'Start Date', 'End Date', 'Time Spent (Mins)', 'Date', 'Assignee', 'Creator',];
      this.service.generateExcel(this.dataToExport, filename, fieldheader, header, 'sample');
    } else if (this.reportexcel.type == 'summary') {
      const title = 'Summary';
      const filename = title + '_' + date + '.xlsx';
      const fieldheader = ['subtaskTitle', 'timeSpent', 'createdAt', 'assignee', 'creator'];
      const header = ['Task Name', 'Time Spent (Mins)', 'Date', 'Assignee', 'Creator',];
      this.service.generateExcel(this.dataToExport, filename, fieldheader, header, 'sample');
    }
  }



  onChipClicked(value: string) {
    this.dataSource = [];
    this.dataToExport = [];
    this.isButtonDisabled = true;
    this.reportexcel.type = value;
  }

  getEmp(emp: any) {
    this.searchCreatedBy = emp.value;
  }

  cancelClick(ev: MouseEvent) {
    ev.stopPropagation();
  }

  onCancel() {
    this.ddTrigger.closeMenu();
  }

  convertTimestampToDateTime(timestamp: number): Date {
    return new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
  }

  ngOnInit(): void {

  }





}
