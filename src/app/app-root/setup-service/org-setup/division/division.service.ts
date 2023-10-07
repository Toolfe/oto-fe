import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class DivisionService {

  resDivision: any[] = [];
  resDivisionId: any = {};
  division$ = this.getDivision().pipe(
    map(division => { return division.data })
  );

  constructor(
    private http: HttpClient,
    private root: SetupRootService,
  ) { }

  //post
  postDivision(data: any): Observable<any> {

    return this.http.post<any>(this.root.getOrgUrl() + 'divisionapi/division', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(
        catchError(this.root.errorHandl),
        map((res: any) => {
          return res;
        }));
  }

  getDivision(): Observable<any> {
    return this.http.get(this.root.getOrgUrl() + 'divisionapi/division', this.root.getHeadersnode());
  }

  //put
  updateDivision(data: any): Observable<any> {
    data.setup = { id: sessionStorage.getItem('orgId') };


    return this.http.put<any>(this.root.getOrgUrl() + 'division/', JSON.stringify(data), this.root.getHeaders())
      .pipe(map((res: any) => {
        return res;
      }));
  }


  //delete
  deleteDivision(data: any): Observable<any> {
    return this.http.delete<any>(this.root.getOrgUrl() + 'divisionapi/division/' + data.id, this.root.getHeadersnode())
      .pipe(map((res: any) => {

        return res;
      }));
  }


}

