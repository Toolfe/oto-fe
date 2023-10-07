import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocMasterService } from 'src/app/app-root/setup-service/doc-master-setup/doc-master.service';
import { EmpsetupService } from 'src/app/app-root/setup-service/emp-setup/empsetup.service';


@Component({
  selector: 'app-add-acces',
  templateUrl: './add-acces.component.html',
  styleUrls: ['./add-acces.component.scss']
})
export class AddAccesComponent implements OnInit {
  accesForm:any=FormGroup;
  employee:any;
  categoryData:any;
  typeData:any;
  userData:any;
  constructor(
    private fb:FormBuilder,
    private service:DocMasterService,
    private empservice:EmpsetupService
   
  ) { }

  ngOnInit(): void {
    this.typeData=this.service.type;
    this.categoryData=this.service.category;
    this.userData=this.service.user;
    this.empDetails()
    this.accesForm=this.fb.group({
      categoryCode:[],
      typeCode:[],
      folderCode:[],
      access:[],
      userType:[],
      inimation:[]
    })
  }

  empDetails(){
    let employee:any={}
    let employees:any[]=[];
    this.empservice.employeeData.forEach((data:any) => {
    employee.id=data.id;
    employees.push(employee);
    employee={};
    this.employee=employees  
    });
  
  }
}
