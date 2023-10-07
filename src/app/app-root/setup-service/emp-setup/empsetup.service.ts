  import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { retry, catchError, map, shareReplay, delay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/authentication/auth.service';
import { SetupRootService } from '../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class EmpsetupService {
employeesetup$=this.getEmployeeSetup();
  empDetails:any[]=[];
  employeeData:any[]=[];
  empid:string=''; 
  dataOfView: any;
  forEach: any;
  constructor(
    private http:HttpClient,
    private common:AuthService,
    private root:SetupRootService
  ) { }

  setupUrl='http://localhost :2034/employee/api/v1/setup/'

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization':'Bearer '+sessionStorage.getItem('token'),
      'Content-Type': 'application/json',
    })
  }

  empSetup(){
    let myData:any={};
    myData.id= sessionStorage.getItem('orgId');
    myData.createdBy=sessionStorage.getItem('id');
    myData.modifiedBy= sessionStorage.getItem('id');
    myData.active= true;
    myData.employees=this.employeeData;

    let requestData=JSON.stringify(myData); 
   return this.http.post<any>(this.root.getEmployeeUrl()+'setup/', requestData, this.root.getHeaders())
     .pipe(
       retry(1),
       catchError(this.common.errorHandl)
    );
    
 } 


 
 getEmpsetup(){
  return this.http.get<any>(this.setupUrl+sessionStorage.getItem('orgId'), this.httpOptions)
  .pipe(shareReplay());
}

getEmployeeSetup(...params:any):Observable<any>{
  
/*   let offset=params[0]?params[0]:1;
  let limit=params[1]?params[1]:50;
  let sort=params[2]?params[2]:'id';
  let order=params[3]?params[3]:2;//DESC */
  let url=this.root.stringifyUrl(this.root.getEmployeeUrl()+'setup/');
  
  
  return this.http.get<any>(url,this.root.httpOptions)
  .pipe(delay(300),
  map((employeesetup: any) => { 
    return employeesetup.content}),
  catchError((err)=>of('error')))

}

empResponse(){
  this.getEmpsetup().subscribe(data=>{
    
    this.employeeData=data.employees
  })
}
}