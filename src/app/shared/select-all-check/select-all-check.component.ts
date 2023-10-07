import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-select-all-check',
  templateUrl: './select-all-check.component.html',
  styleUrls: ['./select-all-check.component.scss']
})
export class SelectAllCheckComponent implements OnInit {
  @Input()
  model!: FormControl;
  @Input() values:any= [];
  @Input() text = 'Select All'; 

  isChecked(): boolean {
    return this.model.value && this.values.length
      && this.model.value.length === this.values.length;
  }

  isIndeterminate(): boolean {
    return this.model.value && this.values.length && this.model.value.length
      && this.model.value.length < this.values.length;
  }

  toggleSelection(change: MatCheckboxChange): void {
    if (change.checked) {
      this.model.setValue(this.values);
    } else {
      this.model.setValue([]);
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
