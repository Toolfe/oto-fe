import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-root',
  templateUrl: './app-root.component.html',
  styleUrls: ['./app-root.component.scss'],

})
export class AppRootComponent implements OnInit,OnDestroy{
  tempStep: string | null = sessionStorage.getItem('step');
  step: string = this.tempStep != null ? this.tempStep : '0';
  disable: boolean = true;


  constructor(private router: Router,
    private ngZone: NgZone) { }

    ngOnInit(): void {
        if(this.tempStep == null){
                this.setStep('0');
                this.router.navigate(['/setup/orgsetup']);
           //If an admin needs to complete the setup
        /*   switch (sessionStorage.getItem('currentIndex')) {
            case '0':
              this.router.navigateByUrl('/welcome/appsetup');
              break;
            case '1':
                this.setStep('0');
                this.router.navigate(['/setup/orgsetup']);
                break;
            case '2':
                this.setStep('0');
                this.router.navigate(['/setup/contact']);
                break;
            case '3':
                this.setStep('0');
                this.router.navigate(['/setup/task-master']);
                break;
            case '4':
                this.setStep('1');
                this.router.navigate(['/setup/empsetup']);
                break;
            case '5':
                this.setStep('1');
                this.router.navigate(['/setup/roles-profile']);
                break;
            case '6':
                this.setStep('1');
                this.router.navigate(['/setup/assign-escalate']);
                break;
            case '7':
                this.setStep('2');
                this.router.navigate(['/setup/businessPartners']);
                break;
            case '8':
                this.setStep('3');
                this.router.navigate(['/setup/project']);
                break;
            case '9':
                this.setStep('4');
                this.router.navigate(['/setup/doc-master']);
                break;
            default: this.setStep('0');
              break;
  
        } */
        }else{
          this.setStep(this.tempStep);  //If an admin is already completed the setup
        }
    }

  setStep(index: string) { //Set the step for expansion panel
    this.step = index;
    sessionStorage.setItem('step', this.step);
  }

  exitAdmin() {
    this.ngZone.run(() => this.router.navigateByUrl('/dashboard'))
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('step');
  }

}


