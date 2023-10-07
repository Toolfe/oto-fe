import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { AppSetupService } from '../../setup-service/app-setup/app-setup.service';

@Component({
  selector: 'app-setup-welcome',
  templateUrl: './setup-welcome.component.html',
  styleUrls: ['./setup-welcome.component.scss']
})
export class SetupWelcomeComponent implements OnInit {



  load!: boolean;
  load1!: boolean;
  error!:boolean;
  message:string="Please wait... while we are initializing your account!"
  successMsg:string="Your Account was Created Successfully"
  constructor(private router :Router,
              private service:AppSetupService) { }

  ngOnInit(): void {
    this.load1=true
    
    this.service.basicSetup(this.service.appsetupData).subscribe(res => {
      sessionStorage.setItem('token',res.toString());
      let token=res.toString();
      let decodedToken:any = jwtDecode(token);
    sessionStorage.setItem('email',decodedToken.sub);
    sessionStorage.setItem('orgId',decodedToken.orgId);
    this.load1=false;
    this.load=true;
    
    }, 
    err=>{
      this.error=true;
      this.load=false;
      this.load1=false;
      this.message="Something went wrong..Please try again later!"
    });
  }

  onnext(){
    this.router.navigate(['/setup']);
    setTimeout(() => {
      window.location.reload();
    }, 300);
  }
  

}