import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  fileUploadForm:any=FormGroup;

  constructor(private fb:FormBuilder,
              @Inject(MAT_DIALOG_DATA) public doc:any
            ) { }
  name:string|null=sessionStorage.getItem('name');
  ngOnInit(): void {
    this.fileUploadForm=this.fb.group({
      documentType:[],
      shareWith:[],
      permissions:this.fb.group({
        read:[],
        write:[],
        edit:[]
      }),
      requiredApproval:[],
      approvalCount:[],
      approval1:[],
      approval2:[],
      approval3:[]
    })
  }

}
