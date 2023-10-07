import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { concat, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { delay, catchError } from 'rxjs/operators';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { FileModel } from '../models/file-model';
import { ViewDoc } from '../models/view-doc';
import { PropertiesComponent } from '../options/properties/properties.component';
import { DocMethodsService } from '../service/common-methods/doc-methods.service';
import { DocumentService } from '../service/document-service/document.service';
import { FolderService } from '../service/folder-service/folder.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./../folder/folder.component.scss', './trash.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrashComponent implements ViewDoc {
  trashDocs$ = CommonMethods.mergeObs(this.service.trashDocs$, []).pipe(delay(300), catchError((err) => of('error')));
  // trashDocs$=CommonMethods.mergeObs(this.service.trashDocs$, this.service.trashSharingDocs$).pipe(delay(300),catchError((err)=>of('error')));
  loadArray: any[] = [1, 2, 3, 4, 5, 1, 1, 1, 1];
  @ViewChild(MatMenuTrigger)
  trashMenu!: MatMenuTrigger;
  selectedDoc: any;
  contextMenuPosition = { x: '0px', y: '0px' };
  constructor(private service: DocumentService,
    private common: DocMethodsService,
    private dialog: MatDialog) {
    sessionStorage.setItem('selectedFolder', '1');
  }

  isEnable(permision: any) {
    return CommonMethods.userRole('documentManagementModule', 'trash', permision);
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
  showProperty(doc: any) {
    this.dialog.open(PropertiesComponent, { data: doc });
  }
  onContextMenu(event: MouseEvent, doc: any) {
    this.selectedDoc = doc;
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    this.trashMenu.openMenu();
  }
  getTooltipText(doc: FileModel): string {
    return this.common.getTooltipText(doc);
  }
  getType(type: string) {
    let fileType = type.split('.')[1];
    let fType = fileType.slice(0, 2);
    return fType;
  }
  addNew() {
    throw new Error('Method not implemented.');
  }
  uploadFile() {
    throw new Error('Method not implemented.');
  }
  downloadFile(file: FileModel) {
    this.common.downloadFile(file);
  }

  deleteDoc(docId: string) {
    this.service.deleteDoc(docId);
  }

  restoreDoc(doc: any) {
    let trashFile: any = doc;
    // trashFile.trash=0;
    this.service.restoreDoc(trashFile).subscribe(res => {
      if (res.success == true) {
        console.log("this.service.trashDocs$;")
        this.service.trashDocs$.subscribe((res: any[]) => {
          // do something with updatedDocs
          // this.trashDocs$ = []
        });
      }

    })

  }

}
