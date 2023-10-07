import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  unit$ = this.getUnit().pipe(
    map((unit => { return unit.data })));

  resUnit: any[] = [];
  resUnitId: any = {};
  constructor(
    private http: HttpClient,
    private root: SetupRootService) { }

  //post
  postUnit(data: any): Observable<any> {
    return this.http.post<any>(this.root.getOrgUrl() + 'unitapi/unit', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(
        catchError(this.root.errorHandl),
        map((res: any) => {
          return res;
        }));
  }


  getUnit(): Observable<any> {
    return this.http.get(this.root.getOrgUrl() + 'unitapi/unit', this.root.getHeadersnode());
  }

  //delete
  deleteUnit(data: any): Observable<any> {
    return this.http.delete<any>(this.root.getOrgUrl() + 'unitapi/unit/' + data.id, this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }


}

