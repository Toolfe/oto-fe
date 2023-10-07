import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth/authentication/auth.service';
import { MobileQueryService } from 'src/app/services/mobile-query/mobile-query.service';

@Component({
  selector: 'app-task-root',
  templateUrl: './task-root.component.html',
  styleUrls: ['./task-root.component.scss'],

  providers: [MobileQueryService],


})
export class TaskRootComponent implements OnInit {

  hide!: boolean;
  mobileQuery: MediaQueryList
  Admin: boolean = false;
  isAdmin: string | null = sessionStorage.getItem('role')
  userName: string | null = sessionStorage.getItem('name');
  id: string | null = sessionStorage.getItem('id');




  constructor(private mobileSerice: MobileQueryService,
    private auth: AuthService,
    private dialog: MatDialog,) {
    this.mobileQuery = this.mobileSerice.mobileQuery
  }

  ngOnInit(): void {
    this.hide = true;
    if (sessionStorage.getItem('role') == 'admin') {
      this.Admin = true;
    }

  }

  closeNavbar(nav: any) {
    if (nav._opened == true) {
      nav.close();
    }

  }

  logOut() {
    // let data:any={}
    // data.activeStatus=false
    //   this.auth.logout(data).subscribe(res=>{
    //     if(res){
    this.auth.clearSession()
    //   }
    // }) 

  }



}
