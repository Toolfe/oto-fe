import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeptService } from 'src/app/app-root/setup-service/org-setup/dept/dept.service';

@Component({
  selector: 'app-emp-basic-info',
  templateUrl: './emp-basic-info.component.html',
  styleUrls: ['./emp-basic-info.component.scss']
})
export class EmpBasicInfoComponent implements OnInit {
  department$ = this.departmentService.department$;
  constructor(
    private departmentService: DeptService,

    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }
  
  ngOnInit(): void {
  }

}
