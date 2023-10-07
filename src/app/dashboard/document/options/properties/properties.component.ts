import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {
  sharedUserName:any={};
  sharedBy!:boolean;
  constructor(public dialogRef: MatDialogRef<PropertiesComponent>,
              @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {  
   if(sessionStorage.getItem('id')!=this.data.folderAccessManagement?.createdBy.id ||
      this.data.fileAccessManagement?.createdBy.id  ){
      this.sharedBy=true;
   }

    if(sessionStorage.getItem('id')==this.data.fileAccessManagement?.createdBy.id){
    this.sharedBy=false;
   } 
   this.getSharedBy();
  }
  
 getFoldername(){
  let folderName=this.data.folderName;
  return folderName;
 }
 getFilename(){
  let fileName=this.data.fileName;
  return fileName;
 }
 
 getFolderCreated(){
  let createdOn = this.data.createdOn;
  return createdOn;
 }
 
getFolderModified(){
  let modifiedOn = this.data.modifiedOn;
  return modifiedOn;
}
getFileCreated(){
  let created = this.data.created;
  return created;
 }
 
getFileModified(){
  let modified = this.data.modified;
  return modified;
}
  getFilesize(size:number){
    let fileSize=size/1024/1024;
    return fileSize.toFixed(2)+' MB';
  }

  getSharedBy(){
    this.sharedUserName.name=this.data.folderAccessManagement?.createdBy.fname  +' '+  this.data.folderAccessManagement?.createdBy.lname;
    this.sharedUserName.name1=this.data.fileAccessManagement?.createdBy.fname  +' '+  this.data.fileAccessManagement?.createdBy.lname;
    console.log(this.sharedUserName,'sharedBy');
    return this.sharedUserName ;
  }



}
