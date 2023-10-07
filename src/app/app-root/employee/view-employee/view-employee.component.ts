import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FetchCommon } from '../../setup-service/common-function/fetch-common';
import { EmpsetupService } from '../../setup-service/emp-setup/empsetup.service';
import { OrgSetupService } from '../../setup-service/org-setup/org-setup.service';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { ViewMoreComponent } from '../view-more/view-more.component';
import * as XLSX from 'xlsx';
import { utils } from 'xlsx';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LocationService } from '../../setup-service/org-setup/location/location.service';
import { DivisionService } from '../../setup-service/org-setup/division/division.service';
import { DeptService } from '../../setup-service/org-setup/dept/dept.service';
import { SubDeptService } from '../../setup-service/org-setup/sub-dept/sub-dept.service';
import { UnitService } from '../../setup-service/org-setup/unit/unit.service';
import { DesignationService } from '../../setup-service/org-setup/designation/designation.service';
import { EmpGroupService } from '../../setup-service/org-setup/emp-group/emp-group.service';
import { EmpCategoryService } from '../../setup-service/org-setup/emp-category/emp-category.service';
import { EmpTypeService } from '../../setup-service/org-setup/emp-type/emp-type.service';
import { WorkingGroupService } from '../../setup-service/org-setup/working-group/working-group.service';
import { SkillSetService } from '../../setup-service/org-setup/skill-set/skill-set.service';
import { IndustrySkillsService } from '../../setup-service/org-setup/industry-skills/industry-skills.service';
import { CompanyService } from '../../setup-service/org-setup/company/company.service';
import { WorkProcessService } from '../../setup-service/org-setup/work-process/work-process.service';
import { LanguagesService } from '../../setup-service/org-setup/languages/languages.service';
import { ResourceService } from '../../setup-service/org-setup/resource/resource.service';
import { EmployeeService } from '../../setup-service/emp-setup/employee/employee.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { Employee } from '../employee.model';
import { Observable, of } from 'rxjs';
import { delay, map, catchError } from 'rxjs/operators';
import { RolesService } from '../../setup-service/role-setup/roles/roles.service';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
})
export class ViewEmployeeComponent implements OnInit{
  employee$=this.getEmployee();
  i:number=-1;
  searchText:any;
  orderHeader:any;
  isDescOrder: boolean=true;
$basic:any;
$location:any;
$division:any;
$department:any;
$subDepartment:any;
$unit:any;
$role:any;
convertedJson!:string

deleteBtn!:boolean;
isEmpty!:boolean;
totalRows = 0;
pageSize = 30;
currentPage = 0;
pageSizeOptions: number[] = [3, 5, 10, 30, 50, 100];
pageDetails!: PageEvent;

creation!: boolean;
selection!:boolean;
updation!: boolean;
deletion!: boolean;

displayedColumns: string[] = ['code','name','email','department','designation','action'];
dataSource!: MatTableDataSource<Employee>;
infoData: any; 

@ViewChild(MatPaginator)
paginator!: MatPaginator;
@ViewChild(MatSort)
sort!: MatSort;

  constructor(
    private dialog:MatDialog,
              private employee: EmployeeService,
              private empsetup:EmpsetupService,
              private service:EmployeeService,
              private location:LocationService,
              private division:DivisionService,
              private unit:UnitService,
              private dept:DeptService,
              private subDept:SubDeptService,
              private designation:DesignationService,
              private roleService:RolesService,
              private empGroup:EmpGroupService,
              private category:EmpCategoryService,
              private type:EmpTypeService,
              private workingGroup:WorkingGroupService,
              private skill:SkillSetService,
              private industrySkill:IndustrySkillsService,
              private company:CompanyService,
              private workProcess:WorkProcessService,
              private language:LanguagesService,
              private resource:ResourceService,
              private notification:NotifierService,
              private fetch:FetchCommon              ) {
                this.dataSource = new MatTableDataSource();

                }

                sortData(data: any) {
                  data.sort = this.sort;
                }
            

                isEnable(permision:any){
                  return  CommonMethods.userRole('employeeModule','employeeDetails',permision );
                 }
increase(){
  this.i=this.i+1;
}
  ngOnInit(){ 
    if(sessionStorage.getItem('role')=='admin'){
    this.deleteBtn=false;
    }
    this.getEmployee();
    this.getLocation();
    this.getDivision();
    this.getDept();
    this.getSubDept();
    this.getUnit();
    this.getDesignation();
    this.getRoles();
    this.getEmpGroup();
    this.getCategory();
    this.getType();
    this.getWorkingGroup();
    this.getSkillSet();
    this.getIndustrySkills();
    this.getCompany();
    this.getWorkProcess();
    this.getLanguage();
    this.getResource();
  }

  fileUpload(event:any){
    const selectedFile= event.target.files[0];
    const fileReader=new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event)=>{
      let binaryData =event.target?.result;
      let workBook=XLSX.read(binaryData,{type:'binary'}); 
      let basic=utils.sheet_to_json(workBook.Sheets['basic'])
      let grouping=utils.sheet_to_json(workBook.Sheets['grouping'])
      let specific=utils.sheet_to_json(workBook.Sheets['specific'])
      let skills=utils.sheet_to_json(workBook.Sheets['skills'])
      let hierachy=utils.sheet_to_json(workBook.Sheets['hierachy'])
     
      if(grouping.length==specific.length && specific.length==skills.length && skills.length==hierachy.length){
          basic.forEach((data:any,index:number)=>{ 
          data.grouping=grouping[index]
          data.specific=specific[index]
          data.skills=skills[index]
          data.hierachy=hierachy[index]
          this.empsetup.employeeData.unshift(data)
        })
      }else{
        this.notification.shownNotification(" 17049 Inconsistent data",'ok',"error",99999,'end','bottom')
       } 
        basic=basic.concat(this.empsetup.employeeData)
    }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
    
  updateEmp(){
    this.fetch.getName(this.$basic,this.$location, 'locationCode', 'locationName');
    this.fetch.getName(this.$basic,this.$division, 'divisionCode', 'divisionName');
    this.fetch.getName(this.$basic,this.$unit, 'unitCode', 'unitName');
    this.fetch.getName(this.$basic,this.$department, 'departmentCode', 'departmentName');
    this.fetch.getName(this.$basic,this.$subDepartment, 'subDepartmentCode', 'subDepartmentName');
    this.fetch.getName(this.$basic,this.$role, 'customRole', 'customRole');
    
  } 



  getEmployee(data?: PageEvent) {
     return this.service.getEmployee().pipe(
      delay(300),
      map(employee => {
       this.dataSource = new MatTableDataSource(employee.data);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort = this.sort;  
      this.dataSource.data = employee.data;
       return true;
     }), 
       catchError(()=>of('error')))
  }
  
  deleteItem(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    let confirmDelete = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    confirmDelete.afterClosed().subscribe(result => {
      if (result == 'true') {
        this.service.deleteEmployee(data).subscribe(() => {
          this. employee$=this.getEmployee();
          this.notification.openSnackBar('Employee Deleted Successfully', 1);
        })
      } else return;
    })
  }
  
  edit(data: any) {
    let update=this.dialog.open(AddEmployeeComponent, { data: data });
    update.afterClosed().subscribe(res=>{
      if(res){
        this.employee$=this.getEmployee();
      }
    })
  }

  pageChanged(event: PageEvent) {
    this.pageDetails = event;
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.getEmployee(event);
  }

   getLocation(){
    this.location.getLocation().subscribe(()=>{
      
    })
  }
  getDivision(){
    this.division.getDivision().subscribe(()=>{
     
    }) 
  }
  getUnit(){
    this.unit.getUnit().subscribe(()=>{
      
    })
  }
  getDept(){
    this.dept.getDepartment().subscribe(()=>{
    
    })
  }
  getSubDept(){
    this.subDept.getSubDepartment().subscribe(()=>{
      
    })
  }

  getDesignation(){
    this.designation.getDesignation().subscribe(()=>{
      
    })
  }

  getRoles(){
    this.roleService.getRoles().subscribe(()=>{

    })
  }  

  getEmpGroup(){
    this.empGroup.getEmpGroup().subscribe(()=>{
      
      
    })
  }
  getCategory(){
    this.category.getEmpCategory().subscribe(()=>{
     
    })
  }
  getType(){
    this.type.getEmpType().subscribe(()=>{
      
    })
  }
  getWorkingGroup(){
    this.workingGroup.getWorkingGroup().subscribe(()=>{
     
    })
  }

  getSkillSet(){
    this.skill.getSkillSet().subscribe(()=>{
    
    })
  }
  getIndustrySkills(){
    this.industrySkill.getSpecificSkill().subscribe(()=>{
      
    })
  }

  getCompany(){
    this.company.getCompany().subscribe(()=>{
      
    })
  }
  getWorkProcess(){
    this.workProcess.getWorkProcess().subscribe(()=>{
     
    })
  }

  getLanguage(){
    this.language.getLanguage().subscribe(()=>{
     
    })
  }

  getResource(){
    this.resource.getResource().subscribe(()=>{
     
    })
  }
 
  onNext(){
  
  }
  onPrevious(){ 
  }

  viewMore(data: any) {
    this.getbasicinfo(data).subscribe(() => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = this.infoData;
      dialogConfig.width = '60%';
      dialogConfig.height = '78%';
      dialogConfig.panelClass = 'custom-dialog-container';
      const dialogRef = this.dialog.open(ViewMoreComponent, dialogConfig);
      dialogRef.afterClosed();
    });
  }
  
  getbasicinfo(data: any): Observable<void> {
    return this.employee.viewEmployee(data.id).pipe(
      map((res) => {
        this.infoData = res.data;
      })
    );
  }

addNew(){
  const dialogConfig = new MatDialogConfig();  
  dialogConfig.disableClose = true;  
  dialogConfig.autoFocus = true;    
  let employee=this.dialog.open(AddEmployeeComponent, dialogConfig);
  employee.afterClosed().subscribe(result => {
    if (result) {
      this. employee$=this.getEmployee();
    } else return;
  });
}
}