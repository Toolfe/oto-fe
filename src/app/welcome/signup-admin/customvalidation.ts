import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'; // Step-1

// Logical Implemenatation

// Existing Logic - javascript validation code 

//CustomValidators.passwordStrength

export class CustomValidators {
  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }
  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== confirmPassword) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
    }
  }

  static passwordStrength(control: AbstractControl) {



    if (CustomValidators.isEmptyValue(control.value)) {

      return null;

    }



    return control.value.match(/^(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#\$%\^&\*]{8,}$/) ? null : { 'weakPassword': true };

  }



  static MatchPassword(AC: AbstractControl):any {

    let password = AC.get('password')!.value;

    if(AC.get('confirmPassword')!.touched || AC.get('confirmPassword')!.dirty) {

        let verifyPassword = AC.get('confirmPassword')!.value;



        if(password != verifyPassword) {

            AC.get('confirmPassword')!.setErrors( {MatchPassword: true} )

        } else {

            return null

        }

    }

}



  static isEmptyValue(value: any) {

    return value === null || typeof value === 'string' && value.length === 0;

  }




  static ValidatePhone(control: AbstractControl): {[key: string]: any} | null  {

    if ( control.value.length > 8) {
    var val=this.phone(control);
    if(val!=null)
      return { 'phoneNumberInvalid': true };

    }

    return null;

  }
    static phone(control: AbstractControl):{[key:string]:any} | null {
        var phoneno ='(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})';
        
        if(control.value.match(phoneno)) {
          return { 'phoneNumberInvalid': true };
        }
        else { 
          return null;
        }
    }
  

}


//Validators.compose([Validators.required,Validators.pattern('(([+][(]?[0-9]{1,3}[)]?)|([(]?[0-9]{4}[)]?))\s*[)]?[-\s\.]?[(]?[0-9]{1,3}[)]?([-\s\.]?[0-9]{3})([-\s\.]?[0-9]{3,4})')])
//EMAIL_REGEX = "^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$";

// phone: ['', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],