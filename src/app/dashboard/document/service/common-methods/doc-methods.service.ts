import { Injectable, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { CreateDocComponent } from '../../create-doc/create-doc.component';
import { AddFolderComponent } from '../../folder/add-folder/add-folder.component';
import { FileModel } from '../../models/file-model';
import { ViewDoc } from '../../models/view-doc';
import { DocumentService } from '../document-service/document.service';

@Injectable({
  providedIn: 'root'
})
export class DocMethodsService implements ViewDoc{

  constructor(private dialog:MatDialog,
              private docService:DocumentService) { }

  selectedDoc:any;
  selectedFolders:any[]=[];
  isFolder!:boolean;


  onContextMenu(event: MouseEvent,doc:any) {
    throw new Error('Method not implemented.');
  }

  openFolder(folder: any) {
    this.selectedFolders.push(folder);
  }
  getFileName(name: string): string {
    return name.split('.')[0];
  }
  getTooltipText(doc: FileModel): string{
    return `Name: ${doc.fileName}\nCreated by: ${doc.fileName}`;
  }
  getType(type: string): String {
    let fileType=type.split('.')[1];
   let fType=fileType.slice(0,2);
    return fType;
  }
  addNew() {
    this.dialog.open(AddFolderComponent)
  }
  uploadFile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(CreateDocComponent, dialogConfig);
  }
  downloadFile(file:FileModel) {
    this.docService.downloadDoc(file);
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
}
