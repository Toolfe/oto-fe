import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth/authentication/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from '../../notification/service/notifier.service';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./../login.component.scss']
})
export class ResetComponent implements OnInit {
  hide: boolean = true;
  invalidLogin = false
  loading: boolean = false;
  loginForm = this.fb.group({
    userName: ['', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }],
    newPassword: ['', [Validators.required, Validators.minLength(8),
    ]],
    confrimPassword: ['', [Validators.required, Validators.minLength(8),
    ]]
  });
  constructor(private fb: FormBuilder,
    private http: AuthService,
    private router: Router,
    private notification: NotifierService
  ) { }

  ngOnInit(): void {
  }
  get email() {
    return this.loginForm.controls['userName'];
  }
  get newPassword() {
    return this.loginForm.controls['newPassword'];
  }
  get confrimPassword() {
    return this.loginForm.controls['confrimPassword'];
  }



  logSubmit() {

    if (this.loginForm.valid == true) {
      this.loading = true;
      if (this.loginForm.value.newPassword == this.loginForm.value.confrimPassword) {
        let email = this.loginForm.value.userName;
        (this.http.resetPassword(this.loginForm.value).subscribe(
          res => {
            if(res.success === true){
            this.notification.openSnackBar('Password reset Successfully',1);
            this.router.navigate(['/login']);
            } else {
              this.notification.openSnackBar("Something went wrong, Please try again later", 0)
            }
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
      } else {
        this.notification.openSnackBar('New password and confirm password mismatch', 0);
      }
    }
    else {
      this.notification.openSnackBar('Invalid Username or Password!', 0);
    }
  }
}
