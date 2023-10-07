import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as saveAs from 'file-saver';
import { Observable } from 'rxjs/internal/Observable';

import {  catchError, map, } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  selectedFile:any=File;
  messageData: any[]=[];
  attachements: any;
  files:File[]=[];
  constructor(private http: HttpClient,
    private common: AuthService, 
  
   ) { }


  public  getHeaders() {
    return{
        headers: new HttpHeaders({
          'Authorization':'Bearer '+sessionStorage.getItem('token'),
        })
        
    }
  }

  public getChatUrl(): String {
    let url: String = 'http://localhost:2056/org/api/v1/';
    return url;
  }

  public  downloadHeader() {
    return {
      headers: new HttpHeaders({
        'Authorization':'Bearer '+sessionStorage.getItem('token'),
      }),
      responseType: 'blob' as 'json'
    }
  }






  chatPost(data:any,file?:any):Observable<any> {
    let formData = new FormData();
    if(file!=null){
      formData.append('attachment', file);
    }
    formData.append('message', JSON.stringify(data));
  /*   formData.forEach((value,key) => {
    });
     */
    return this.http.post<any>(this.getChatUrl()+'attachment/', formData,  this.getHeaders())
      .pipe(
        catchError(this.common.errorHandl)
      );
  }

 

  getChat(data:any):Observable<any>{
    let id=sessionStorage.getItem('taskId');
    return this.http.get<any>(this.getChatUrl()+'message/'+id,this.getHeaders())
      .pipe(map((res: any) => {
        return res;
      }));
  }

  downloadDoc(file:any){ 
    this.http.get<any>(this.getChatUrl()+'download/',this.downloadHeader())
    .subscribe((blob:any) => saveAs(blob, file.fileName))
    
 }


 getChatEmp(data:any):Observable<any>{  
  let id=sessionStorage.getItem('id');
  return this.http.get<any>(this.getChatUrl()+'emp/'+id,this.getHeaders())
    .pipe(map((res: any) => {
      return res;
    }));
}


}
