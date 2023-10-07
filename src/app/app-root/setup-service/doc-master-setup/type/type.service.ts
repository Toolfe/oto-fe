import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, filter, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class DocTypeService {
  resDocType: any[] = [];
  docType$ = this.getType().pipe(map(type => { return type.data }));
  constructor(
    private http: HttpClient,
    private root: SetupRootService,
  ) { }

  //post
  postType(data: any): Observable<any> {
    return this.http.post<any>(this.root.getDocUrl() + 'doctypeapi/doctype', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(
        catchError(this.root.errorHandl),
        map((res: any) => {
          return res;
        }));
  }

  getType(): Observable<any> {
    return this.http.get(this.root.getDocUrl() + 'doctypeapi/doctype', this.root.getHeadersnode());
  }
  //put
  updateType(data: any): Observable<any> {
    data.setup = { id: sessionStorage.getItem('orgId') };
    return this.http.put<any>(this.root.getDocUrl() + 'type/', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }


  //delete
  deleteType(data: any): Observable<any> {
    return this.http.delete<any>(this.root.getDocUrl() + 'doctypeapi/doctype/' + data.id, this.root.getHeadersnode())
      .pipe(map((res: any) => {

        return res;
      }));
  }


}

