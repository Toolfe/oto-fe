import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, catchError, shareReplay, map } from 'rxjs/operators';
import { SetupRootService } from '../setup-root/setup-root.service';

@Injectable({
  providedIn: 'root'
})
export class AssignSetupService {

  constructor( private http:HttpClient,
    private root:SetupRootService) { }


assignSetup():Observable<any>{
  let myData:any={};
  myData.id= sessionStorage.getItem('orgId');
  myData.createdBy=sessionStorage.getItem('id');
  myData.modifiedBy=sessionStorage.getItem('id');
  myData.active= true;
  return this.http.post<any>(this.root.getAssignUrl()+'setup/', JSON.stringify(myData),this.root.getHeaders())
    .pipe(catchError(this.root.errorHandl));
}


}

