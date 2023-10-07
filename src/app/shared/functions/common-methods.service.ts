import { Injectable } from '@angular/core';
import { merge, from } from 'rxjs';
import { reduce } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class CommonMethods {

  public static get userId() {
    return sessionStorage.getItem("id");
  }

  /**
   * @parm normal array ==> [1,2]
   * @return Form field value ==> [{id:1},{id:2}]
   *  To use in Form submit
   */
  public static returnId(formFieldValue: any) {


    if (formFieldValue.length > 0) {
      return formFieldValue.map((id: any) => {
        return { id: id };         //[{id:1},{id:2}]
      });
    } else return [];
  }


  /**
   * @parm Form field value ==> [{id:1},{id:2}]
   * @return normal array ==> [1,2]
   * To use in patch value
   */
  public static getFormArray(array: any) {
    let arr: any[] = [];
    if (array.length > 0) {
      array.map((category: any) => { arr.push(category.id) });
    } return arr;
  }

  /**Merge observables*/
  public static mergeObs(a$: any, b$: any) {
    let data = merge(a$, b$).pipe(reduce((a, b: any) => a.concat(b)));
    return from(data);
  }


  public static userRole(module: any, screen: any, permission: any): any {
    if (sessionStorage.getItem('role') == '1') {
      return false;
    } else {
      let profiles: any = this.userContext().customRole;
      profiles = JSON.parse(profiles);
      let flag: boolean = true;
      profiles.forEach((profile: any): any => {
        profile = profile[module];
        if (profile[screen][permission] == true) {
          flag = false;
          return flag;
        }
      })
      return flag;
    }
  }
  public static userContext(): any {
    const token: any = sessionStorage.getItem('roleToken');
    const decoded = jwt_decode(token);
    return decoded;
  }
}
