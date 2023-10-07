import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';
import { id } from '@swimlane/ngx-charts';

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
    private root: SetupRootService,
  ) { }

  //post
  postSubCategory(data: any): Observable<any> {
    
    
    return this.http.post<any>(this.root.getContactUrl() + 'contactcategorysubapi/subcategory', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(
        catchError(this.root.errorHandl),
        map((res: any) => {
          return res;
        }));
  }
  //Get
  getSubCategory(): Observable<any> {
    return this.http.get(this.root.getContactUrl()+'contactcategorysubapi/subcategory',this.root.getHeadersnode());
  }

  getSubCategoryList(id:number): Observable<any> {
    return this.http.get(this.root.getContactUrl()+'contactcategorysubapi/subcategory/' +id,this.root.getHeadersnode()).pipe(
        map((response: any) => response.data)
      );
  }
  //put
  updateSubCategory(data: any): Observable<any> {
    data.setup = { id: sessionStorage.getItem('orgId') };

    return this.http.post<any>(this.root.getContactUrl() + 'contactcategorysubapi/subcategory', JSON.stringify(data), this.root.getHeadersnode())
      .pipe(
        catchError(this.root.errorHandl),
        map((res: any) => {
          return res;
        }));
  }


  //delete
  deleteSubCategory(data: any): Observable<any> {
    return this.http.delete<any>(this.root.getContactUrl() + 'contactcategorysubapi/subcategory/' + data.id, this.root.getHeadersnode())
      .pipe(
        catchError(this.root.errorHandl),
        map((res: any) => {
          return res;
        }));
  }
}
