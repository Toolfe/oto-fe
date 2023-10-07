import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
import { FileModel } from '../models/file-model';
import { ViewDoc } from '../models/view-doc';
import { DocMethodsService } from '../service/common-methods/doc-methods.service';
import { DocumentService } from '../service/document-service/document.service';

@Component({
  selector: 'app-approval-doc',
  templateUrl: './approval-doc.component.html',
  styleUrls: ['./../folder/folder.component.scss','./approval-doc.component.scss']
})
export class ApprovalDocComponent implements ViewDoc {
  loader:any[]=[1,2,3,4,5]
  // approvalDocs$=this.service.approvalDocs$.pipe(delay(300),
  //               map(doc=>{
  //                 return doc.filter((doc:any)=>{return this.docApproval(doc)})
  //               }),catchError((err)=>of('error')));
  approvalDocs$=this.service.approvalDocs$;              
  @ViewChild(MatMenuTrigger)
  contextMenu!: MatMenuTrigger;
  isFolder:boolean = false;
  isEmpty!:boolean;
  isLoading!:boolean;
  searchText!:string;
  selectedDoc=this.common.selectedDoc;
  
  contextMenuPosition = { x: '0px', y: '0px' };
  //docs$= from(this.service.allDocs$).pipe(delay(800));
  docs$=this.service.allDocs$;
  constructor(private service:DocumentService,
              private common:DocMethodsService,
              private snackBar: MatSnackBar) {}
  
              docs:any={};


              isEnable(permision:any){
                return  CommonMethods.userRole('documentManagementModule','approval',permision );
               }

  getFileName(name: string): string {
    return this.common.getFileName(name);
  }

  getDocs(data:any){

  }
  logData(data:any){
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


  docApproval(doc:any):any{
    let required:Boolean;
    let approval=doc.fileAccessManagement.fileApproval
    if(CommonMethods.userId==approval.approvalFrom1.id){
      required=true;
  } else if(CommonMethods.userId==approval.approvalFrom2.id){
    if(approval.approval1Status==null || approval.approval1Status=='denied'){
      required= false;
    }else{
      required= true;
    }

  }else if(CommonMethods.userId==approval.approvalFrom3.id){
    if((approval.approval1Status==null ||approval.approval1Status== 'denied') || (approval.approval2Status==null ||approval.approval2Status=='denied')){
      required= false;
    }else{
      required= true;
    }
  }else{
    required= false;
  }
  
 return required;
}

getStatus(doc:any){
  let status:any;
  let approval=doc.fileAccessManagement.fileApproval
  if(CommonMethods.userId==approval.approvalFrom1.id){
    if(approval.approval1Status==='approved' || 'denied'){
      status=approval.approval1Status;
     }else{
      status='Pending';
     }
} else if(CommonMethods.userId==approval.approvalFrom2.id){
  if(approval.approval2Status=='approved' || 'denied'){
   status=approval.approval2Status;
  }else{
   status='Pending';
  }

}else if(CommonMethods.userId==approval.approvalFrom3.id){
  if(approval.approval3Status=='approved' || 'denied'){
    status=approval.approval3Status;
   }else{
    status='Pending';
   }
}

return status;
}

onApprove(doc:any, status:string){
  let approval=doc.fileAccessManagement.fileApproval

    if(CommonMethods.userId==approval.approvalFrom1.id){
      approval.approval1Status='approved';
        if(status=='approved'){
          approval.approval1Status='approved';
        }else{
          approval.approval1Status='denied';
        }
  } else if(CommonMethods.userId==approval.approvalFrom2.id){
    if(status=='approved'){
      approval.approval2Status='approved';
    }else{
      approval.approval2Status='denied';
    }
  
  }else if(CommonMethods.userId==approval.approvalFrom3.id){
    if(status=='approved'){
      approval.approval3Status='approved';
    }else{
      approval.approval3Status='denied';
    }
  }

  this.service.approveDoc(approval).subscribe(data=>{
    this.snackBar.open('Document has been Approved!', 'Okay', {
      duration: 1000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: "success-dialog"
  });
  });
}

getUser(approvalData:any){
  let status:Boolean=false;
 if(approvalData.approval1Status || approvalData.approval2Status || approvalData.approval3Status=='approved'|| 'denied'){
   status=true;
 }
 return status;
 }
}

