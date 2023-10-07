import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import * as saveAs from 'file-saver';
import { of, Subscription } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { ConfirmDeleteComponent } from 'src/app/shared/confirm-delete/confirm-delete.component';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { CreateDocComponent } from '../create-doc/create-doc.component';
import { ViewDoc } from '../models/view-doc';
import { PropertiesComponent } from '../options/properties/properties.component';
import { ShareComponent } from '../options/share/share.component';
import { DocumentService } from '../service/document-service/document.service';
import { FolderService } from '../service/folder-service/folder.service';

import { map, scan, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],

})
export class LogsComponent implements ViewDoc, OnDestroy {
  loader: any[] = [];
  error: any;
  allDocs$=this.folderService.getlogsFiles();
  // allDocs$ = this.folderService.mergeFileFolder(sessionStorage.getItem("selectedFolder")).pipe(delay(300), catchError((err) => of('error')));
  isFolder: boolean = false;
  isFile: boolean = false;
  subFolder!: Subscription;
  subFolderFiles!: Subscription;


  @ViewChild(MatMenuTrigger)
  fileMenu!: MatMenuTrigger;

  @ViewChild(MatMenuTrigger)
  create!: MatMenuTrigger;

  root: boolean = true;

  selectedFolders: any[] = [];
  currentFolder: any;
  selectedDoc: any;
  selecte: any;
  isEmpty!: boolean;
  contextMenuPosition = { x: '0px', y: '0px' };
  loadArray: any[] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

  constructor(private dialog: MatDialog,
    private service: DocumentService,
    private folderService: FolderService,
    private notification: NotifierService
  ) {
    let folders: any = sessionStorage.getItem('folders');
    if (sessionStorage.getItem('selectedFolder') != '1') {
      this.selectedFolders = JSON.parse(folders);
    }
  }
  addNew() {
    throw new Error('Method not implemented.');
  }

  isEnable(permision: any) {
    return CommonMethods.userRole('documentManagementModule', 'allFiles', permision);
  }

  loadFolderFiles() {
    this.allDocs$ = this.folderService.mergeFileFolder(sessionStorage.getItem("selectedFolder"));
  }

  onContextMenu(event: MouseEvent, doc: any, type: string) {
    if (doc != '') {
      this.selectedDoc = doc;
    }

    if (type === 'folder') {
      this.isFolder = true;
      this.isFile = false;
    } else if (type === 'doc') {
      this.isFile = true;
      this.isFolder = false;
    }
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.create.openMenu();
  }

  openFolder(folder: any) {

    this.currentFolder = folder;
    sessionStorage.setItem('selectedFolder', folder.id);
    this.selectedFolders.push(folder);
    sessionStorage.setItem('folders', JSON.stringify(this.selectedFolders));

    this.allDocs$ = this.folderService.mergeFileFolder(sessionStorage.getItem('selectedFolder')).pipe(delay(300), catchError((err) => of('error')));
  }

  getlistFolder(id: any) {
    if (id != sessionStorage.getItem('selectedFolder')) {
      this.selectedFolders = this.selectedFolders.filter((folder: any) => folder.id <= id);
      sessionStorage.setItem('selectedFolder', id);
      this.allDocs$ = this.folderService.mergeFileFolder(id).pipe(delay(300), catchError((err) => of('error')));
    }

  }


  getTooltipText(doc: any) {
    return `Name: ${doc.fileName}\nCreated by: ${doc.fileAccessManagement.createdBy.fname + ' ' + doc.fileAccessManagement.createdBy.lname}`;
  }


  getFileName(name: string) {
    return name.split('.')[0];
  }

  getType(type: string) {
    return type.split('.')[1].slice(0, 2);
  }




  uploadFile() {
    let data = this.dialog.open(CreateDocComponent, { data: 'none' })
    data.afterClosed().subscribe(result => {
      if (result) {
        // this.allDocs$=merge(this.allDocs$,of(result));
        this.allDocs$ = this.folderService.mergeFileFolder(sessionStorage.getItem('selectedFolder'));
      }
    })
  }




  downloadFile(file: any) {
    this.service.downloadDoc(file).subscribe(data => saveAs(data, file.fileName));
  }



  getFileNameWithoutExtension(filename: string): string {
    if (filename) {
      const fileName = filename.split('.');
      return fileName[1];
    }
    return '';
  }
  deleteDoc(doc: any) {
    console.log(doc);

    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let del = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    del.afterClosed().subscribe((data: any) => {
      if (data == 'true') {
        this.service.postTrash(doc).subscribe((data: any) => {
          this.loadFolderFiles();
          this.notification.openSnackBar('Moved to trash', 2);
        });
      }
    });
  }
  deleteFolder(doc: any) {
    console.log(doc);

    let dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    let del = this.dialog.open(ConfirmDeleteComponent, dialogConfig);
    del.afterClosed().subscribe((data: any) => {
      if (data == 'true') {
        this.folderService.trashFolder(doc.id).subscribe((data: any) => {
          this.loadFolderFiles();
          this.notification.openSnackBar('Moved to trash', 2);
        });
      }
    });
  }

  shareFile(doc: any) {
    let fileShare = this.dialog.open(ShareComponent, { data: doc });
  }
  renameFile(id: String) {
    throw new Error('Method not implemented.');
  }
  saveFile(file: any) {

    // let selectedFile:any=file.fileAccessManagement;  
    // if(selectedFile.createdBy.id==sessionStorage.getItem('id')){
    //   selectedFile.saved=!selectedFile.saved;
    // }else{

    // }
    if (file.isSave == 0)
      file.saveStatus = 1;
    else
      file.saveStatus = 0;
    this.service.updateDoc(file).subscribe((res: any) => {
      if (res.success == true) {
        this.allDocs$ = this.allDocs$.pipe(
          map(docs => docs.map((doc: any) => doc.id === file.id ? { ...doc, isSave: file.saveStatus } : doc)),
          // scan((acc, val) => val),
          // distinctUntilChanged()
        );
      }
    });
  }

  getSharedDetails(folder: any): String {
    let shraedWith: String = "Not Shared"
    if (folder.folderAccessManagement.shareWithUser.length > 0) {
      shraedWith = 'Users';
    } else if (folder.folderAccessManagement.shareWithUserWorkGroup.length > 0) {
      shraedWith = 'Working Group';
    } else if (folder.folderAccessManagement.shareWithUserReportingGroup.length > 0) {
      shraedWith = 'Reporting Group';
    }
    return shraedWith;
  }
  showProperty(doc: any) {
    console.log(doc);
    this.dialog.open(PropertiesComponent, { data: doc });
  }

  ngOnDestroy(): void {
    //sessionStorage.setItem('selectedFolder','1');
    sessionStorage.setItem('folders', JSON.stringify([]));
  }


}


