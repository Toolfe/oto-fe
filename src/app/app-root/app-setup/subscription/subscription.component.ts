import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { NotifierService } from 'src/app/notification/service/notifier.service';
import { AppSetupService } from '../../setup-service/app-setup/app-setup.service';
import { AppSetupRootComponent } from '../app-setup-root/app-setup-root.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {
  @Input() parent: any = FormGroup;
  submitted: boolean = false;

  Period = [
    { value: '1', viewValue: 'Monthly' },
    { value: '2', viewValue: 'Yearly' },
  ]

  constructor(
    private root: AppSetupRootComponent,
    private service: AppSetupService,
    private router: Router,
    private notification: NotifierService) {

  }

  ngOnInit(): void {

  }

  onPrevious() {
    this.root.previousStep();
  }

  onSubmit() {
    let logDetails:any={};
    logDetails.primaryEmail=sessionStorage.getItem('email');
    logDetails.password=sessionStorage.getItem('password');

    if (this.root.appSetupForm.valid == true) {
      let submitData = this.root.appSetupForm.value;
      submitData.appSetup.planDetails.plan.id = parseInt(submitData.appSetup.planDetails.plan.id);
      submitData.appSetup.currencyCode = this.root.appSetupForm.value.appSetup.currency.currencyCode;
      submitData.appSetup.currencyName = this.root.appSetupForm.value.appSetup.currency.currencyName;
      this.service.appsetupData=submitData.appSetup;
      sessionStorage.setItem('role','admin')
      this.router.navigate(['/welcome/appsetup/setup-welcome']);
     
    }
    else {
      this.notification.openSnackBar('Please fill all the required fields!', 2);
    }
    this.submitted = false;
  
  }

}