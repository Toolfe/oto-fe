import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/authentication/auth.service';
import { MobileQueryService } from 'src/app/services/mobile-query/mobile-query.service';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-dashboard-root',
  templateUrl: './dashboard-root.component.html',
  styleUrls: ['./dashboard-root.component.scss'],
  providers:[MobileQueryService]
})
export class DashboardRootComponent implements OnInit {
    mobileQuery:MediaQueryList  

  Admin:boolean=false;
  isAdmin:string|null=sessionStorage.getItem('role')
  userName:string | null=sessionStorage.getItem('name');
  id:string | null=sessionStorage.getItem('id');
  
  constructor(private http:AuthService,
             private dialog:MatDialog,
              private mobileSerice:MobileQueryService){
                this.mobileQuery=this.mobileSerice.mobileQuery          
                sessionStorage.setItem('selectedFolder','1');
              }
ngOnInit(){

  if(sessionStorage.getItem('role')=='1'){
    this.Admin=true;
  }
 
}

openChat(){
  const dialogConfig=new MatDialogConfig();
  dialogConfig.disableClose=true;
  this.dialog.open(ChatComponent,{
    panelClass:'confirm-dialog-container',
    width: '30%',
    height:'85vh',
   position:{
     right:'2%'
   },
  })

}

  logOut(){
    const employeeId = sessionStorage.getItem('empId');
    const orgId  =  sessionStorage.getItem('orgId');
    this.authenticateStatus(employeeId, orgId);
    this.http.clearSession()
  }
  authenticateStatus(employeeId: any, orgId :any ) {
    const activeStatus = 0;
     this.http.authenticateStatus(employeeId , orgId , activeStatus).subscribe(res => {
    });
  }
}
