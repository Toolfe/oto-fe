import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class IndustrySkillsService {

  specificskill$ = this.getSpecificSkill().pipe(
    map(specificskill => { return specificskill.data })
  );
  resSpecificSkill: any[] = [];
  constructor(
    private http: HttpClient,
    private root: SetupRootService,
  ) { }

  //post
  postSpecificSkill(data: any): Observable<any> {

    return this.http.post<any>(this.root.getOrgUrl() + 'employeesetupapi/employeemasters/em005', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(
        catchError(this.root.errorHandl),
        map((res: any) => {
          return res;
        }));
  }


  getSpecificSkill(): Observable<any> {
    return this.http.get(this.root.getOrgUrl() + 'employeesetupapi/employeemasters/em005', this.root.getHeadersnode());
  }


  //delete
  deleteSpecificSkill(data: any): Observable<any> {
    return this.http.delete<any>(this.root.getOrgUrl() + 'employeesetupapi/employeemasters/em005/' + data.id, this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }


}

