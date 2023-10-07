import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RoleSetupService } from '../../setup-service/role-setup/role-setup.service';
import { AddDefineComponent } from './add-define/add-define.component';

@Component({
  selector: 'app-define',
  templateUrl: './define.component.html',
  styleUrls: ['./define.component.scss']
})
export class DefineComponent implements OnInit {
$define:any;

  constructor(private service:RoleSetupService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.$define=this.service.defineData;
  }
  addNew(){ 
    const dialogConfig = new MatDialogConfig();  
    dialogConfig.disableClose = true;  
    dialogConfig.autoFocus = true;   
  this.dialog.open(AddDefineComponent,dialogConfig);
}
removeItem(element: any){
  this.service.defineData.forEach((value: any,index: any)=>{
    if(value == element)
    this.service.defineData.splice(index,1);
  })
  }

}
