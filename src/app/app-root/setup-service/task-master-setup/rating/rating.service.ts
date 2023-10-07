import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  rating$=this.getRating().pipe(
    map((rating=> {return rating.data})));

  resRating:any[]=[];

  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

   //post
postRating(data:any):Observable<any>{
    return this.http.post<any>(this.root.getTaskUrl()+'taskratingapi/taskrating/',JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


//get
// getRating(...params:any):Observable<any>{
  
//   let offset=params[0]?params[0]:1;
//   let limit=params[1]?params[1]:50;
//   let sort=params[2]?params[2]:'id';
//   let order=params[3]?params[3]:2;//DESC
//   let url=this.root.stringifyUrl(this.root.getTaskUrl()+'rating/',offset,limit,sort,order);
//   return this.http.get<any>(url,this.root.getHeaders());
  
  
// }
getRating(): Observable<any> {
  return this.http.get(this.root.getTaskUrl()+'taskratingapi/taskrating/',this.root.getHeadersnode());
}

//post
updateRating(data:any):Observable<any>{
  data.setup={ id: sessionStorage.getItem('orgId') };  
  return this.http.post<any>(this.root.getTaskUrl()+'taskratingapi/taskrating/', JSON.stringify(data),this.root.getHeadersnode())
    .pipe(map((res: any) => {
      return res;
    }));
}

  //delete
  deleteRating(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getTaskUrl()+'taskratingapi/taskrating/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }

}