import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, shareReplay } from 'rxjs/operators';
import { Employee } from 'src/app/app-root/employee/employee.model';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employee$ = this.getEmployee().pipe(
    map(employee => { return employee.data })
  );
  resEmp: any[] = [];
  employees$ = this.http.get<any>(this.root.getEmployeeUrl() + 'employeeapi/employee', this.root.getHeadersnode())
    .pipe(map(emp => { return emp.data }), catchError(this.root.errorHandl));

  constructor(
    private http: HttpClient,
    private root: SetupRootService,
  ) { }

  //post
  postEmployee(data: any): Observable<any> {

    return this.http.post<any>(this.root.getEmployeeUrl() + 'employeeapi/employee', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(
        catchError(this.root.errorHandl),
        map((res: any) => {
          return res;
        }));
  }


  //get
  // getEmployee(...params:any):Observable<any>{

  //   let offset=params[0]?params[0]:1;
  //   let limit=params[1]?params[1]:null;
  //   let sort=params[2]?params[2]:'id';
  //   let order=params[3]?params[3]:2;//DESC
  //   let url=this.root.stringifyUrl(this.root.getEmployeeUrl()+'employee/');


  //   return this.http.get<any>(url,this.root.getHeaders());

  // }

  // getEmployee(): Observable<any> {
  //   return this.http.get("../../../../../assets/data/dashboard-employeestatus.json");
  // }
  getEmployee(): Observable<any> {
    return this.http.get(this.root.getEmployeeUrl() + 'employeeapi/employee', this.root.getHeadersnode());
  }
  viewEmployee(id:number): Observable<any> {
    return this.http.get(this.root.getEmployeeUrl() + 'employeeapi/employee/' + id, this.root.getHeadersnode());
  }
  //get
  getEmpURL(...params: any): string {

    let offset = params[0] ? params[0] : 1;
    let limit = params[1] ? params[1] : 500000000;
    let sort = params[2] ? params[2] : 'id';
    let order = params[3] ? params[3] : 2;//DESC
    let url = this.root.stringifyUrl(this.root.getEmployeeUrl() + 'employee/', offset, limit, sort, order);
    return url;
  }


  //put
  updateEmployee(data: any): Observable<any> {
    data.setup = { id: sessionStorage.getItem('orgId') };

    return this.http.put<any>(this.root.getEmployeeUrl() + 'employee/', JSON.stringify(data), this.root.getHeaders())
      .pipe(map((res: any) => {
        return res;
      }));
  }


  //delete
  deleteEmployee(data: any): Observable<any> {
    return this.http.delete<any>(this.root.getEmployeeUrl() + 'employeeapi/employee/' + data.id, this.root.getHeadersnode())
      .pipe(map((res: any) => {

        return res;
      }));
  }


}

