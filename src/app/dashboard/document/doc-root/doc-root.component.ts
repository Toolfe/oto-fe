import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/authentication/auth.service';
import { MobileQueryService } from 'src/app/services/mobile-query/mobile-query.service';
import { CreateDocComponent } from '../create-doc/create-doc.component';
import { AddFolderComponent } from '../folder/add-folder/add-folder.component';
import { FolderComponent } from '../folder/folder.component';

@Component({
  selector: 'app-doc-root',
  templateUrl: './doc-root.component.html',
  styleUrls: ['./doc-root.component.scss','./../../task/task-root/task-root.component.scss'],
  providers:[MobileQueryService, FolderComponent]

})
export class DocRootComponent{
  userName:string | null=sessionStorage.getItem('name');
  id:string | null=sessionStorage.getItem('id');

  mobileQuery:MediaQueryList
  constructor(private mobileSerice:MobileQueryService,
              private dialog:MatDialog,
              private auth:AuthService){
    this.mobileQuery=this.mobileSerice.mobileQuery;
  }

  addNew(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data="reload";
    let createDoc= this.dialog.open(AddFolderComponent, dialogConfig);
  }


  uploadFile(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data="reload";
    let createDoc= this.dialog.open(CreateDocComponent, dialogConfig);
    
}

logOut(){
  // let data:any={}
  // data.activeStatus=false
  //   this.auth.logout(data).subscribe(res=>{
  //     if(res){
        this.auth.clearSession()
    //   }
    // }) 
    
}


}
