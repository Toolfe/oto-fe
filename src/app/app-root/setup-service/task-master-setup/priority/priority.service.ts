import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { SetupRootService } from '../../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  resPriority:any[]=[]
  // priority$=this.getPriority().pipe(
  //   map((priority=> {return priority.content})));

  taskPriority$=this.getTaskPriority().pipe(
    map((priority=> {return priority.data})));

  constructor(
    private http:HttpClient,
    private root:SetupRootService,
  ) { }

   //post
postPriority(data:any):Observable<any>{
    return this.http.post<any>(this.root.getTaskUrl()+'taskpriorityapi/taskpriority/', JSON.stringify(data),this.root.getHeadersnode())
       .pipe(
        catchError(this.root.errorHandl),
         map((res: any) => {
        return res;   
      }));
  }


//get
// getPriority(...params:any):Observable<any>{
  
//   let offset=params[0]?params[0]:1;
//   let limit=params[1]?params[1]:50;
//   let sort=params[2]?params[2]:'id';
//   let order=params[3]?params[3]:2;//DESC
//   let url=this.root.stringifyUrl(this.root.getTaskUrl()+'priority/',offset,limit,sort,order);
//   return this.http.get<any>(url,this.root.getHeaders())
//     .pipe(map((res: any) => {
//       shareReplay();
//       return res;  
//     }));
// }
getTaskPriority(): Observable<any> {
  return this.http.get(this.root.getTaskUrl()+'taskpriorityapi/taskpriority/',this.root.getHeadersnode());
}

// getTaskPriority(){
//   return this.getPriority().pipe(
//     map(res=>{
//         let data=res.content[0];
//         console.log(res);
        
//         let arr:any=[];
//          for (let index = 1; index <=5; index++) {
//           let key="priority"+index;
//           let obj:any={};
//           obj[key]=data[key];
//           arr.push(obj)
//          }
//         return arr;
//     })
//   )
// }




//put
updatePriority(data:any):Observable<any>{
  data.setup={ id: sessionStorage.getItem('orgId') };  
  return this.http.post<any>(this.root.getTaskUrl()+'taskpriorityapi/taskpriority/', JSON.stringify(data),this.root.getHeadersnode())
    .pipe(map((res: any) => {
      return res;
    }));
}


  //delete
  deletePriority(data:any):Observable<any>{
    return this.http.delete<any>(this.root.getTaskUrl()+'taskpriorityapi/taskpriority/'+data.id,this.root.getHeadersnode())
      .pipe(map((res: any) => {
        return res;
      }));
  }

  getPriority(): Observable<any> {
    return this.http.get("../../../../../assets/data/priority-listing.json")
  }

}

