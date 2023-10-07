import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-type1',
  templateUrl: './add-type1.component.html',
  styleUrls: ['./add-type1.component.scss']
})
export class AddType1Component implements OnInit {

update:any
  recordingForm:any;
  constructor(
    private fb: FormBuilder,
  ) {}
 

  ngOnInit(): void {
    this.recordingForm = this.fb.group({
      category: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

}
