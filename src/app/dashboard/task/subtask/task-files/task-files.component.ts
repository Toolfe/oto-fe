import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import * as saveAs from 'file-saver';
import { DocumentService } from 'src/app/dashboard/document/service/document-service/document.service';
import { TaskService } from '../../service/task-service.service';

@Component({
  selector: 'app-task-files',
  templateUrl: './task-files.component.html',
  styleUrls: ['./task-files.component.scss']
})
export class TaskFilesComponent implements OnInit, OnDestroy {

  tempName!:String;
  fileForm: any = FormGroup;
  presentFiles:any=[];
  constructor(private fb:FormBuilder,
              private _bottomSheetRef: MatBottomSheetRef<TaskFilesComponent>,
              private docService:DocumentService,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
              private service:TaskService) {}


  openLink(event: MouseEvent): void {
    event.preventDefault();
  }

  ngOnInit(): void {
    console.log(this.data);
    this.fileForm=this.fb.group({});
    for (let i = 0; i < this.data.fileFields.length; i++) {
      this.fileForm.addControl(this.data.fileFields[i].name, new FormControl(''));
       }   

      this.presentFiles=this.data.value.map((obj:any)=>{
       return obj.fileKey;
      })

      console.log(this.presentFiles,"********");
      
  }


  selectedFile!:File;
  obj:any={};
  onSelectFile(event:any, name:any) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files[0]);
      this.selectedFile = event.target.files[0];
      this.obj[name]=event.target.files[0];
    }
  }

  onFileUpload(fieldName:any){
    this.tempName=fieldName;
    let file=this.obj[fieldName];
    let obj:any={};
    obj.taskId=this.data.id;
    this.service.postTaskFile(file,obj).subscribe(res=>{
      console.log(res);
      this.service.postFileDetails(res, this.data.id,fieldName).subscribe(fRes=>{
        console.log("file updated!"); 
        console.log(fRes);
        this.data.value.push(fRes);
        this.presentFiles.push(fRes.fileKey);
        
      })
    })
  }

  tempObj:any={};
  isFilePresent(name:String){ 
   let status=this.presentFiles.includes(name);
   return status;
  }

  isUploading(name:String){
      return name==this.tempName;
  }

  getFileDetail(fieldName:String,key:any, type:number):String|any{
    let fileObj=this.data.value.find((x:any)=>x.fileKey==fieldName);
    if(type==0){
      return fileObj[key];
    }else{
      return fileObj;
    }
  }

  onFileDownload(fieldName:String){
    let file:any=this.getFileDetail(fieldName, "fileId",1); 
      this.docService.downloadDoc(file.fileId)
      .subscribe(data => saveAs(data, file.fileName));
  }

  ngOnDestroy(): void {
    this._bottomSheetRef.dismiss(this.data.value);  
  }
}



