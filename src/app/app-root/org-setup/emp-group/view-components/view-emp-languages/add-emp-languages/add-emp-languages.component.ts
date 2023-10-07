import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { LanguagesService } from 'src/app/app-root/setup-service/org-setup/languages/languages.service';
import { Language } from '../language.model';


@Component({
  selector: 'app-add-emp-languages',
  templateUrl: './add-emp-languages.component.html',
  styleUrls: ['./add-emp-languages.component.scss']
})
export class AddEmpLanguagesComponent implements OnInit {
languageForm:any=FormGroup
update:boolean=false;
searchCurrency:any;
myControl = new FormControl();
options: string[] =[
  "Mandarin Chinese",
  "Spanish",
  "English",
  "Hindi/Urdu",
  "Arabic",
  "Bengali",
  "Portuguese",
  "Russian",
  "Japanese",
  "German",
  "Javanese",
  "Punjabi",
  "Wu",
  "French",
  "Telugu",
  "Vietnamese",
  "Marathi",
  "Korean",
  "Tamil",
  "Italian",
  "Turkish",
  "Cantonese/Yue"
];
  filteredOptions: Observable<string[]> | undefined;

  constructor(private fb:FormBuilder,
    private notification:NotifierService,
    public dialogRef: MatDialogRef<any>, 
    private org:LanguagesService,
    @Inject(MAT_DIALOG_DATA) public data:Language,) { }

  ngOnInit(): void {
    this.languageForm=this.fb.group({
      name:this.myControl,
      description:[],
      setup:this.fb.group({
        id:sessionStorage.getItem('orgId'),
      })
    })
    if(this.data!=null){
      this.update=true;
      this.editData()
    }
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
  }
  public addItem(){
    if(this.languageForm.valid==true){
      this.org.getLanguage().subscribe(res=>{
          let dataRow=this.languageForm.value;
          this.org.postLanguage(dataRow).subscribe(res=>{
            this.dialogRef.close(res);
            this.notification.openSnackBar('Employee Language Added Successfully',1);
          })
          this.languageForm.reset();
      })

    }

    else{
      this.notification.openSnackBar('Please fill all required fields to continue',0)
    }
  
  }

  editData(){
    this.languageForm.patchValue({
      name: this.data.name,
      code: this.data.code,
      description: this.data.description
    })
  }

  
  updateLanguage() {
    this.data.name = this.languageForm.value.name;
    this.data.description = this.languageForm.value.description; 
    this.org.postLanguage(this.data).subscribe(res => {
      this.dialogRef.close('done');
      this.notification.openSnackBar('Employee Language Updated Successfully', 1);
    })
    this.languageForm.reset();
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
