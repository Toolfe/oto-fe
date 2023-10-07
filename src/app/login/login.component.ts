import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotifierService } from '../notification/service/notifier.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth/authentication/auth.service';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  invalidLogin = false
  loading: boolean = false;
  loginForm = this.fb.group({
    userName: ['', {
      validators: [Validators.required],
      updateOn: 'blur'
    }],
    password: ['', [Validators.required, Validators.minLength(8),
    ]]
  });




  constructor(private fb: FormBuilder,
    private http: AuthService,
    private router: Router,
    public dialog: MatDialog,

    private notification: NotifierService) {

  }

  ngOnInit() {
    if (sessionStorage.getItem('token')) {
      this.router.navigate(['/home'])
    }
  }

  fetchSystemStatus() {
    throw new Error('Method not implemented.');
  }



  get email() {
    return this.loginForm.controls['userName'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }

  logSubmit() {

    if (this.loginForm.valid == true) {
      this.loading = true;
      let email = this.loginForm.value.userName;
      (this.http.authenticate(this.loginForm.value).subscribe(
        data => {

          // if (email == data.userContext.userName) {
            sessionStorage.setItem('email', data.userContext.userName);
            sessionStorage.setItem('token', data.token);
            sessionStorage.setItem('roleToken', data.roleToken);
            sessionStorage.setItem('id', data.userContext.loginId);
            sessionStorage.setItem('role', data.userContext.roleTypeId);
            sessionStorage.setItem('name', data.userContext.name);
            sessionStorage.setItem('empId', data.userContext.employeeId);
            sessionStorage.setItem('orgId', data.userContext.orgId);
            this.router.navigate(['/home']);
          // } else {
          //   this.notification.openSnackBar("Invaild username please try again", 0)
          // }
        },
        error => {
          this.loading = false;
          this.invalidLogin = true
          if (error.status == 401) {
            this.notification.openSnackBar("Invaild Username or Password", 0)
          } else if (error.status == 0) {
            this.notification.openSnackBar("Something went wrong, Please try again later", 0)
          }
          else {
            this.notification.openSnackBar(error, 0)
          }
        }
      ));
    }
    else {
      this.notification.openSnackBar('Invalid Username or Password!', 0);
    }

  }
 
  }


 




 