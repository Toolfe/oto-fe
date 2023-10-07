import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class SetScaleRangeService {
  minimumRange$=this.getScaleRange().pipe(
    map((range=> {return range.data})));

  
  
  resScale:any[]=[];

  constructor( private http:HttpClient,
    private root:SetupRootService,) 
    {

     }

     //post
postScaleRange(data:any):Observable<any>{
    return this.http.post<any>(this.root.getTaskUrl()+'tasksetrangeapi/tasksetrange/', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl)
      );
  }


//get
// getScaleRange(...params:any):Observable<any>{
  

//   return this.http.get<any>(this.root.getTaskUrl()+'range/get/'+sessionStorage.getItem('orgId'),this.root.getHeaders())
//     .pipe(map((res: any) => {
//       shareReplay();
//       return res;  
//     }));
// }

getScaleRange(): Observable<any> {
  return this.http.get(this.root.getTaskUrl()+'tasksetrangeapi/tasksetrange/',this.root.getHeadersnode());
}

//put
updateScaleRange(data:any):Observable<any>{
  data.setup={ id: sessionStorage.getItem('orgId') };  
  return this.http.post<any>(this.root.getTaskUrl()+'tasksetrangeapi/tasksetrange/', JSON.stringify(data),this.root.getHeadersnode())
    .pipe(map((res: any) => {
      return res;
    }));
}

  //delete
  deleteScaleRange(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getTaskUrl()+'tasksetrangeapi/tasksetrange/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }

}
