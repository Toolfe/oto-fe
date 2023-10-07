import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CommonMethods } from 'src/app/shared/functions/common-methods.service';
@Component({
  selector: 'app-doc-master-root',
  templateUrl: './doc-master-root.component.html',
  styleUrls: ['./doc-master-root.component.scss']
})
export class DocMasterRootComponent implements OnInit {

  selectedIndex: number = 0;

  category: boolean = false;
  type: boolean = false;
  userRoleAccess: any;
  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.selectedIndex = tabChangeEvent.index;
  }
  constructor(

  ) {
    this.userRoleAccess = CommonMethods.userContext();
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('role') == '1') {
      this.category = true;
      this.type = true;

    } else {
      if (sessionStorage.getItem('role') == '2') {
        let profiles: any = this.userRoleAccess.customRole;
        profiles = JSON.parse(profiles);
        profiles.forEach((profile: any): any => {
          profile = profile.documentMasterModule;
          if (profile.category.selection == true || profile.category.creation == true || profile.category.deletion == true ||
            profile.category.updation == true) {
            this.category = true;
            return this.category;
          }

        })

        if (sessionStorage.getItem('role') == '2') {
          let profiles: any = this.userRoleAccess.customRole;
          profiles = JSON.parse(profiles);
          profiles.forEach((profile: any): any => {
            profile = profile.documentMasterModule;
            if (profile.type.selection == true || profile.type.creation == true || profile.type.deletion == true ||
              profile.type.updation == true) {
              this.type = true;
              return this.type;
            }

          })
        }
      }
    }
  }
}
