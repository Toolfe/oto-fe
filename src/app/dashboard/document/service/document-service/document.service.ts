import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, shareReplay, map } from 'rxjs/operators';
import { URLService } from 'src/app/shared/Url/url';
import { AuthService } from '../../../../services/auth/authentication/auth.service';
import { saveAs } from 'file-saver';
import { FileRoot } from '../../models/file-model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  recentFiles: any[] = [];

  constructor(private http: HttpClient,
    private auth: AuthService) { }

  allDocs$ = this.http.get<any>(URLService.getFileURL() + 'file/api/v1/getall', URLService.headerOptions())
    .pipe(shareReplay(), catchError(this.auth.errorHandl));

  sharedDocs$ = this.http.get<any>(URLService.getFileURL() + 'folder/api/v1/getAllFolderShared', URLService.headerOptions())
    .pipe(shareReplay(), catchError(this.auth.errorHandl));

  savedDocs$ = this.http.get<any>(URLService.getFileURL() + 'fileapi/saved', URLService.headerOptions())
    .pipe(
      map((type: any) => {
        return type.data;
      }));;

  approvalDocs$ = this.http.get<any>(URLService.getFileURL() + 'approvalapi/approval', URLService.getHeadersnode())
  .pipe(
    map((type: any) => {
      return type.data;
    }));;

  trashSharingDocs$: any = this.http.get<any>(URLService.getFileURL() + 'file/api/v1/getTrashUser', URLService.headerOptions())
    .pipe(catchError(this.auth.errorHandl));

  trashDocs$: any = this.http.get<any>(URLService.getFileURL() + 'trashapi/trash', URLService.getHeadersnode())
    .pipe(
      map((type: any) => {
        return type.data;
      }));;

  onUploadDoc(data: any, file: File, folder: any) {
    let formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('fileFolder', JSON.stringify(folder));
    formData.append('fileAccess', JSON.stringify(data));
    return this.http.post<any>(URLService.getFileURL() + 'fileapi/file', formData, URLService.uploadHeader())
      .pipe(catchError(this.auth.errorHandl));
  }

  downloadDoc(data: any) {
    return this.http.post<any>(URLService.getFileURL() + 'fileapi/download', JSON.stringify(data), URLService.downloadHeader());
  }
  updateDoc(data: any) {
    return this.http.post<any>(URLService.getFileURL() + 'fileapi/save', JSON.stringify(data), URLService.getHeadersnode())
      .pipe(catchError(this.auth.errorHandl));
  }
  restoreDoc(data: any) {
    return this.http.post<any>(URLService.getFileURL() + 'trashapi/restore', JSON.stringify(data), URLService.getHeadersnode())
      .pipe(catchError(this.auth.errorHandl));
  }

  trashDoc() {
    console.log("karthikeyan")
    return this.http.get<any>(URLService.getFileURL() + 'trashapi/trash', URLService.getHeadersnode())
    .pipe(
      map((type: any) => {
        console.log(type.data)
        return type.data;
      }));;
  }
  downloadDMS() {
    return this.http.get<any>(URLService.getFileURL() + 'fileapi/downloadOtoboxApp', URLService.downloadHeader());
  }

  

  approveDoc(doc: any) {
    let data = JSON.stringify(doc);
    return this.http.put<any>(URLService.getFileURL() + 'fileapproval/api/v1/fileapproval', data, URLService.headerOptions())
      .pipe(catchError(this.auth.errorHandl));
  }

  deleteDoc(id: any) {
    return this.http.delete<FileRoot[]>(URLService.getFileURL() + 'fileapi/file/' + id, URLService.getHeadersnode())
      .pipe(catchError(this.auth.errorHandl));
  }
  postTrash(doc: any) {
    return this.http.post<FileRoot[]>(URLService.getFileURL() + 'trashapi/trash' , JSON.stringify(doc), URLService.getHeadersnode())
      .pipe(catchError(this.auth.errorHandl));
  }
  getrecentFiles(file: any): void {
    let recentFiles: any[] = [];
    let recent: any = localStorage.getItem('recentFiles');
    recentFiles = JSON.parse(recent)
    recentFiles.unshift(file);

    localStorage.setItem('recentFiles', JSON.stringify(this.recentFiles));
  }

  getFolderFiles(id: string) {
    return this.http.get<any>(URLService.getFileURL() + 'document/api/v1/folder/' + id, URLService.headerOptions())
      .pipe(catchError(this.auth.errorHandl));
  }

}
