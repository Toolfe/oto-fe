import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DocMasterService } from 'src/app/app-root/setup-service/doc-master-setup/doc-master.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userType:any[]=['Creator','Modifier','Viewer','Delete']
  userForm:any=FormGroup;
  constructor(
    private fb:FormBuilder,
    private service:DocMasterService,

  ) { }

  ngOnInit(): void {
    this.userForm=this.fb.group({
      userType:[]
    })
  }
  addItem(){
    if(this.userForm.valid==true){
      let dataRow=this.userForm.value;
      dataRow.active=true;
      dataRow.createdBy=sessionStorage.getItem('id');
      dataRow.modifiedBy=sessionStorage.getItem('id');
      this.service.user.unshift(dataRow);
      this.userForm.reset()
    }
  }
}
