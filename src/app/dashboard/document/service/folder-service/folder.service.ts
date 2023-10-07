import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, shareReplay, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/authentication/auth.service';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { URLService } from 'src/app/shared/Url/url';
import { Folder } from '../../models/folder-modle';

@Injectable({
  providedIn: 'root'
})
export class FolderService {

  f1: any;
  data: any = [] = []
  selectedFolders: any = [];
  folderFile$: any = this.http.get<any>(URLService.getFileURL() + 'folder/api/v1/get/' + sessionStorage.getItem("selectedFolder"), URLService.headerOptions())



  constructor(private http: HttpClient,
    private auth: AuthService,
  ) { }



  mergeFileFolder(id: any) {
    return CommonMethods.mergeObs(this.getAllFolder(id), this.getFolderFiles(id))
  }
  
  // mergeSharedFileFolder(id: any) {
  //   return CommonMethods.mergeObs(this.getAllFolder(id), this.getSharedFolderFiles(id))
  // }
  mergeSharedFileFolder(id: any) {
    return CommonMethods.mergeObs(this.getAllFolder(id), this.getFolderFiles(id))
  }
  mergeSharedFolders() {
    // const data$=CommonMethods.mergeObs(this.getSharedFolder(), this.getWorkGroupSharedFolder());
    // return CommonMethods.mergeObs(data$,this.getReportGroupSharedFolder());
    return this.getSharedFolder();

  }

  getSharedFolder() {
    return this.http.get<any>(URLService.getFileURL() + 'sharedapi/shared_folder', URLService.headerOptions())
      .pipe(
        map((type: any) => {
          return type.data;
        }));
  }

  getlogsFiles() {
    return this.http.get<any>(URLService.getFileURL() + 'fileapi/logs', URLService.headerOptions())
      .pipe(
        map((type: any) => {
          return type.data;
        }));
  }
  getWorkGroupSharedFolder() {
    return this.http.get<any>(URLService.getFileURL() + 'folder/api/v1/getFolderWorkGroupShare', URLService.headerOptions());
  }

  getReportGroupSharedFolder() {
    return this.http.get<any>(URLService.getFileURL() + 'folder/api/v1/getFolderReportingGroupShare', URLService.headerOptions());
  }

  createFolder(folder: any): Observable<any> {
    return this.http.post<any>(URLService.getFileURL() + 'folderapi/folder', JSON.stringify(folder), URLService.getHeadersnode())
      .pipe(catchError(this.auth.errorHandl));
  }

  patchFolder(id: number, folder: any) {
    return this.http.patch<any>(URLService.getFileURL() + 'folder/api/v1/selectUpdateFol/' + id, JSON.stringify(folder), URLService.headerOptions())
      .pipe(catchError(this.auth.errorHandl));
  }

  // updateFolderAccess(access:any){
  //   return this.http.put<any>(URLService.getFileURL()+'folderaccess/api/v1/updateFolderAccess',JSON.stringify(access),URLService.headerOptions())
  //   .pipe(catchError(this.auth.errorHandl));
  // }

  updateFolderAccess(access: any) {
    return this.http.post<any>(URLService.getFileURL() + 'sharedapi/shared_folder', JSON.stringify(access), URLService.headerOptions())
      .pipe(catchError(this.auth.errorHandl));
  }

  
  getShareDetails(folderId: any) {
    return this.http.get<any>(URLService.getFileURL() + 'sharedapi/shared_details/'+ folderId, URLService.headerOptions())
      .pipe(catchError(this.auth.errorHandl));
  }

  createSubFolder(subFolder: any): Observable<any> {
    return this.http.post<any>(URLService.getFileURL() + 'subfolder/api/v1/createSubFolder', JSON.stringify(subFolder), URLService.headerOptions())
      .pipe(catchError(this.auth.errorHandl));
  }

  getAllFolder(id: any) {
    return this.http.get<any>(URLService.getFileURL() + 'folderapi/folder/' + id,
      URLService.getHeadersnode()).pipe(
        map((type: any) => {
          return type.data;
        }));;
  }

  getFolderFiles(id: any) {
    let data: any[] = [];
    return this.http.get<any>(URLService.getFileURL() + 'fileapi/file/' + id, URLService.getHeadersnode()).pipe(
      map((type: any) => {
        return type.data;
      }));;

  }
  getSharedFolderFiles(id: any) {
    let data: any[] = [];
    return this.http.get<any>(URLService.getFileURL() + 'file/api/v1/getAllFolderShare/' + id, URLService.headerOptions())

  }

  updateTrashFile(data: any) {
    return this.http.put<any>(URLService.getFileURL() + 'file/api/v1/fileUploadwithAccess', JSON.stringify(data), URLService.headerOptions())
      .pipe(catchError(this.auth.errorHandl));
  }

  deleteFolder(id: any) {
    return this.http.delete<Folder[]>(URLService.getFileURL() + 'folderapi/folder/' + id, URLService.getHeadersnode())
      .pipe(catchError(this.auth.errorHandl));
  }

  trashFolder(id: any) {
    return this.http.delete<Folder[]>(URLService.getFileURL() + 'trashapi/folder_trash/' + id, URLService.getHeadersnode())
      .pipe(catchError(this.auth.errorHandl));
  }

}