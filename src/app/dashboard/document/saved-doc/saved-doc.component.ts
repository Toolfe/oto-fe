import { Component, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { of } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { FileModel } from '../models/file-model';
import { ViewDoc } from '../models/view-doc';
import { DocMethodsService } from '../service/common-methods/doc-methods.service';
import { DocumentService } from '../service/document-service/document.service';

@Component({
  selector: 'app-saved-doc',
  templateUrl: './saved-doc.component.html',
  styleUrls: ['./saved-doc.component.scss','./../folder/folder.component.scss']
})
export class SavedDocComponent implements ViewDoc {

  savedDocs$=this.service.savedDocs$.pipe(delay(300),catchError((err)=>of('error')));
  loadArray:any[]=[1,1,1,1,1,1,1,1,1,1]
  @ViewChild(MatMenuTrigger)
  contextMenu!: MatMenuTrigger;
  isFolder:boolean = false;
  isEmpty!:boolean;
  selectedDoc=this.common.selectedDoc;
  contextMenuPosition = { x: '0px', y: '0px' };
  constructor(private service:DocumentService,
              private common:DocMethodsService) {
                sessionStorage.setItem('selectedFolder','1');
              }

              isEnable(permision:any){
                return  CommonMethods.userRole('documentManagementModule','saved',permision );
               }


  getFileName(name: string): string {
    return this.common.getFileName(name);
  }


  openFolder(doc: any) {
    throw new Error('Method not implemented.');
  }
  shareFile(id: String) {
    throw new Error('Method not implemented.');
  }
  renameFile(id: String) {
    throw new Error('Method not implemented.');
  }
  saveFile(id: String) {
    throw new Error('Method not implemented.');
  }
  showProperty(id: String) {
    throw new Error('Method not implemented.');
  }
  onContextMenu(event: MouseEvent, doc: any) {
    throw new Error('Method not implemented.');
  }
  getTooltipText(doc: FileModel): string {
    return this.common.getTooltipText(doc);
  }
  getType(type:string){
    let fileType=type.split('.')[1];
    let fType=fileType.slice(0,2);
     return fType;
   }
  addNew() {
    throw new Error('Method not implemented.');
  }
  uploadFile() {
    throw new Error('Method not implemented.');
  }
  downloadFile(file:FileModel) {
    this.common.downloadFile(file);
  }

  deleteDoc(docId:string){
    this.service.deleteDoc(docId);
  }

}
