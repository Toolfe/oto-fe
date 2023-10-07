import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class DocCategoryService {
  category$=this.getcategory().pipe(
    map(category=>{return category.data}),
  );

  resCategory:any[]=[];
  docCategory$= this.http.get<any>(this.root.getDocUrl()+'category/',this.root.getHeaders())
                      .pipe(map((category: any) => {return category.content}));
  
  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

   //post
postCategory(data:any):Observable<any>{
  
    return this.http.post<any>(this.root.getDocUrl()+'doccategoryapi/doccategory', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


//get
// getcategory(...params:any):Observable<any>{
  
//   let offset=params[0]?params[0]:1;
//   let limit=params[1]?params[1]:500000000;
//   let sort=params[2]?params[2]:'id';
//   let order=params[3]?params[3]:2;//DESC
//   let url=this.root.stringifyUrl(this.root.getDocUrl()+'category/',offset,limit,sort,order);
  
  
//   return this.http.get<any>(url,this.root.getHeaders());
  
// }

getcategory(): Observable<any> {
  return this.http.get(this.root.getDocUrl()+'doccategoryapi/doccategory',this.root.getHeadersnode());
}


  //delete
  deleteCategory(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getDocUrl()+'doccategoryapi/doccategory/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
       
        return res;
      }));
  }


}

