import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SetupRootService } from '../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class DocMasterService {
category:any[]=[];
type:any[]=[];
folder:any[]=[];
user:any[]=[];
access:any[]=[];
constructor(
  private http:HttpClient,
  private root:SetupRootService,
) { }

  postDocSetup():Observable<any> {
    let docData={
      id:sessionStorage.getItem('orgId'),
     createdBy:sessionStorage.getItem('id'),
     modifiedBy:sessionStorage.getItem('id'),
     active:true
    } 
    return this.http.post<any>( this.root.getDocUrl() + 'setup/',JSON.stringify(docData),this.root.getHeaders())
      .pipe(catchError(this.root.errorHandl));
  }
}
