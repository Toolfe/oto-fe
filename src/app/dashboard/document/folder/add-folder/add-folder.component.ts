import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Folder } from '../../models/folder-modle';
import { FolderService } from '../../service/folder-service/folder.service';
import { FolderComponent } from '../folder.component';
import { NotifierService } from 'src/app/notification/service/notifier.service';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss'],
  providers:[FolderComponent]

})
export class AddFolderComponent implements OnInit {
  folderForm:any=FormGroup;
  request:String='Create';
  constructor(
    private fb:FormBuilder,
    private service:FolderService,
    private notification: NotifierService,
    public dialogRef: MatDialogRef<AddFolderComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  @Output() newFolder= new EventEmitter<Folder>();
  ngOnInit(): void {    
    this.folderForm=this.fb.group({
      folderName:[],
      parentId: 1
    })
    if(this.data!='reload' && this.data!='none'){
      this.request="Rename";
      this.folderForm.patchValue({
        folderName:this.data.folderName
      })
     }
  }
  

  addItem(){
    if(this.folderForm.valid==true){
      let folder:any={};
      folder=this.folderForm.value;
      folder.parentId=Number(sessionStorage.getItem('selectedFolder'));
      // folder.createdBy=sessionStorage.getItem('id');
      // folder.modifiedBy=sessionStorage.getItem('id');
      // folder.active=true;
      // folder.folderAccessManagement={
      //     sharedWithMe: true,
      //     saved: false,
      //     trash: false,
      //     createdBy:{id:sessionStorage.getItem("id")},
      //     modifiedBy:{id:sessionStorage.getItem("id")}
      //     }
      
      this.service.createFolder(folder).subscribe((data:any)=>{
        this.dialogRef.close(data);
       /*  this.newFolder.emit(data);
        this.router.navigateByUrl('document/all-files') */
      
       if(this.data=='reload'){
        window.location.reload();
       }    
      })
    }
   

  
  }


  renameFolder(){
    this.service.patchFolder(this.data.id, this.folderForm.value).subscribe(res=>{
      console.log('Folder updated');
      console.log(res);  
      this.dialogRef.close("Done");
    })
  }



}
