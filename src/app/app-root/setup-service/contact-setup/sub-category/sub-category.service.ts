import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {
  subcategory$=this.getSubCategory().pipe(
    map(subcategory=>{
      return subcategory.data})
  );
  constructor(
    private http: HttpClient,
    private root: SetupRootService
  ) { }

  //post
  postSubCategory(data: any): Observable<any> {
    
    
    return this.http.post<any>(this.root.getContactUrl() + 'sub-category/', JSON.stringify(data), this.root.getHeaders())
      .pipe(
        catchError(this.root.errorHandl),
        map((res: any) => {
          return res;
        }));
  }


  //get
  // getSubCategory(...params: any): Observable<any> {
  //   let offset = params[0] ? params[0] : 0;
  //   let limit = params[1] ? params[1] : 500000000;
  //   let sort = params[2] ? params[2] : 'id';
  //   let order = params[3] ? params[3] : 2;//DESC
  //   let url = this.root.stringifyUrl(this.root.getContactUrl()+ 'sub-category/', offset, limit, sort, order);
  //   return this.http.get<any>(url, this.root.getHeaders());
    
  // }
  getSubCategory(): Observable<any> {
    return this.http.get('http://localhost:3006/api/masters?code=cm002',this.root.getHeadersnode());
  }
  //put
  updateSubCategory(data: any): Observable<any> {
    data.setup = { id: sessionStorage.getItem('orgId') };

    return this.http.put<any>(this.root.getContactUrl() + 'sub-category/', JSON.stringify(data), this.root.getHeaders())
      .pipe(
        catchError(this.root.errorHandl),
        map((res: any) => {
          return res;
        }));
  }


  //delete
  deleteSubCategory(data: any): Observable<any> {
    return this.http.delete<any>(this.root.getContactUrl() + 'sub-category/' + data.id, this.root.getHeaders())
      .pipe(
        catchError(this.root.errorHandl),
        map((res: any) => {
          return res;
        }));
  }
}
