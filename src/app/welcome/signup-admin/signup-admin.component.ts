import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/notification/service/notifier.service';

import { CustomValidators } from './customvalidation';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OTPRequest } from 'src/app/models/adminRegister';
import { VerificationComponent } from './verification/verification.component';
import { CountryCodeService } from 'src/app/shared/country-code/country-code.service';
import { AuthService } from 'src/app/services/auth/authentication/auth.service';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.scss'],
})
export class SignupAdminComponent implements OnInit {
  emailVerified: boolean = false;
  phoneVerified: boolean = false;
  adminForm: any = FormGroup;
  hide = true;
  mobile: string = 'Contact num';
  contactType!: string;
  submitted: boolean = false;

  email!: string;
  fname!: string;
  lname!: string;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private ngZone: NgZone,
    private router: Router,
    private notification: NotifierService,
    private dialog: MatDialog,
    private countryService: CountryCodeService
    
  ) {}





  ngOnInit(): void {
    this.adminReg();
    
   }



  adminReg() {
    this.adminForm = this.fb.group(
      {
        fname: ['', [Validators.required, Validators.pattern('^[a-zA-Z \-\']+')]],
        lname: ['', [Validators.required]],
        primaryEmail: ['', [Validators.required, Validators.email]],
        password: [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ],
        confirmPassword: ['', Validators.required],
        currentIndex: '0',
        enabled: true,
      },
      { validator: CustomValidators.MatchPassword }
    );
  }

  openEmail(reqData: any) {    
    if (this.adminForm.get('primaryEmail').valid == true) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { type: 'Email', data: reqData };
      let emailDialog = this.dialog.open(VerificationComponent, dialogConfig);
      emailDialog.afterClosed().subscribe((res) => {
        if(res==1){
          this.emailVerified = true;
        }
      });
    } else {
      this.notification.openSnackBar('Please Enter Valid Email',0);
    }
  }

  openMobile(reqData: any) {
    if (this.countryService.phoneNumber != undefined) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = { type: 'Phone number', data: reqData };
      let mobileDialog = this.dialog.open(VerificationComponent, dialogConfig);
      mobileDialog.afterClosed().subscribe((res) => {
       if(res==2){
        this.phoneVerified = true;
       }
      });
    } else {
      this.notification.openSnackBar('Please Enter Valid Phone number',0);
    }
  }

  sendOtp(type: string) {
    var data: OTPRequest = {
      fname: this.adminForm.value.fname,
      lname: this.adminForm.value.lname,
      contact: '',
    };
    if (type == 'email') {
      data.contact = this.adminForm.value.primaryEmail;
      this.otpReq(data);
      this.openEmail(data);
    } else if (type == 'phone') {
      data.contact = this.countryService.phoneNumber;
      this.otpReq(data);
      this.openMobile(data);
    } else {
      this.notification.openSnackBar('Invalid Contact Type', 0);
    }
  }

  otpReq(data: OTPRequest) {
    this.service.sendOtp(data).subscribe((res:any) => {

      if (this.service.errorMessage != '') {
        this.notification.openSnackBar(this.service.errorMessage, 0);
      }

      if (res.status) {
      } else {
        this.notification.openSnackBar('Something Went wrong! \n Please try after some times!', 0);
      }
    },
    (err) => {
      this.dialog.closeAll();
      this.notification.openSnackBar('Something Went wrong! \n Please try after some times!', 0);
    });
  }



  onSubmit() {
    this.submitted = true;
    if (
      this.adminForm.valid == true &&
      this.countryService.phoneNumber != undefined
    ) {
      let submitData = this.adminForm.value;
      submitData.primaryPhone = this.countryService.phoneNumber;
      submitData.role = 'admin';
      sessionStorage.setItem('email',this.adminForm.value.primaryEmail);
      sessionStorage.setItem('password',this.adminForm.value.password);
     
      this.service.register(submitData).subscribe((res:any) => {
        sessionStorage.setItem('name', res.name);
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem("id",res.id);
        if (this.service.errorMessage != '') {
          this.notification.openSnackBar(this.service.errorMessage, 0);
        }
        else {
          this.notification.openSnackBar('Admin Successfully Registered!', 1);
          this.ngZone.run(() => this.router.navigateByUrl('/welcome/appsetup'));
        }
      },
      (err:any) => {        
        this.notification.openSnackBar('Something Went wrong! \n Please try after some times!', 0);
      });
    } else {
      this.notification.openSnackBar('Please fill all required fields to continue', 0);
    }
    this.submitted = false;
  }
}


