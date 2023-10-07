import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class ContactCategoryService {
  
  partner$=this.getCategory().pipe(
    map(partner=>{
      return partner.data})
  );

  resCategory:any[]=[];
  constructor(private http:HttpClient,
              private root:SetupRootService) { }


contactCategory$=this.http.get<any>(this.root.getContactUrl()+'contactcategoryapi/masters/cm006',this.root.getHeadersnode())
                          .pipe(map((category: any) => {return category.content}));

contactFunctionality$=this.http.get<any>(this.root.getContactUrl()+'contactcategoryapi/masters/cm007',this.root.getHeadersnode())
                          .pipe(map(functionality =>{
                            return functionality.data})
                            );

//post
postCategory(data:any):Observable<any>{
    return this.http.post<any>(this.root.getContactUrl()+'contactcategoryapi/masters/cm006', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


//get
// getCategory(...params:any):Observable<any>{
  
//   let offset=params[0]?params[0]:1;
//   let limit=params[1]?params[1]:500000000;
//   let sort=params[2]?params[2]:'id';
//   let order=params[3]?params[3]:2;//DESC
//   let url=this.root.stringifyUrl(this.root.getContactUrl()+'contactcategory/',offset,limit,sort,order);

  
//   return this.http.get<any>(url,this.root.getHeaders());
// }


getCategory(): Observable<any> {
  return this.http.get(this.root.getContactUrl()+'contactcategoryapi/masters/cm006',this.root.getHeadersnode());
}


//put
updateCategory(data:any):Observable<any>{
  data.setup={ id: sessionStorage.getItem('orgId') };  
  

  return this.http.post<any>(this.root.getContactUrl()+'contactcategoryapi/masters/cm006', JSON.stringify(data),this.root.getHeadersnode())
    .pipe(map((res: any) => {
      return res;
    }));
}


  //delete
  deleteCategory(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getContactUrl()+'contactcategoryapi/masters/cm006/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }
}
