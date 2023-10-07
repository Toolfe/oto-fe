import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { AuthService } from 'src/app/services/auth/authentication/auth.service';

import { SignupAdminComponent } from '../signup-admin.component';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent implements AfterViewInit, OnInit {
  otp: any;
  reSend: boolean = false;
  btn: boolean = true;
  showVerify: boolean = false;
  interval: any;
  timeLeft: number = 90;
  emailOtp$: any;

  type!: string;
  reqData: any;

  constructor(
    private service:AuthService ,
    private notification: NotifierService,
    private adminReg: SignupAdminComponent,
    @Inject(MAT_DIALOG_DATA) public contact: any,
    public dialogRef: MatDialogRef<VerificationComponent>
  ) {
    this.type = contact.type;
    this.reqData = contact.data;
  }
  ngOnInit(): void {}
  
  ngAfterViewInit(): void {
    this.startTimer();
  }

  /**
   * @description: This  is used to show OTP field
   */
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  config: any = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '50px',
      height: '50px',
    },
  };

  /**
   * @description: This function will get the OTP value while typing and decide whether to show the verify button or not
  */
  otpChange(otp: any) {
    if (otp.length == 6) {
      this.showVerify = true;
    } else {
      this.showVerify = false;
    }
    this.otp = otp;
    return this.otp;
  }

  setVal(val: any) {
    this.ngOtpInput.setValue(val);
  }

  /**This function starts the timer function */
  sendOtp(contact: string) {
    this.startTimer();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 0;
        this.reSend = true;
      }
    }, 1000);
  }

  showOtp() {
    this.startTimer();
    this.adminReg.sendOtp(this.type);
  }

/**This method works when resend button triggers */
  resendOtp(reqData: any) {
    this.reSend = false;
    this.timeLeft = 90;
    this.showOtp();
  }

  /**This method works when Submit button triggers */
  onSubmit(contact: string, otp: string) {
    var data: any = {
      contact: contact,
      otp: otp,
    };
    this.service.verify(data).subscribe(
      (res) => {
        if (res.status) {
          this.notification.openSnackBar(this.type + ' Verified!', 1);
          if (this.type == 'Email') {
            this.dialogRef.close(1);  // Returns Email verified to signup component
          } else if (this.type == 'Phone number') {
            this.dialogRef.close(2);  // Returns Phone verified to signup component
          }
        }
      },
      (error) => {
          this.notification.openSnackBar(
            'Something Went Wrong',
            0
          );
        
      }
    );
  }
}
