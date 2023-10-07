import {  Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { NotifierService } from 'src/app/notification/service/notifier.service';
import { CurrenyService } from 'src/app/app-root/setup-service/org-setup/currency/curreny.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Currency } from '../currency.model';

@Component({
  selector: 'app-view-currency',
  templateUrl: './view-currency.component.html',
  styleUrls: ['./view-currency.component.scss']
})
export class ViewCurrencyComponent implements OnInit {
  allCurrencies$=this.service.allCurrencies$;
  myControl = new FormControl();
  currencyForm:any=FormGroup;
  currencyCode:any[]=[];
  searchCurrency:any;
 setupCurrency:any;
 update!:boolean;
  constructor(private service:CurrenyService,
              private fb:FormBuilder,
             public dialogRef: MatDialogRef<any>,
             @Inject(MAT_DIALOG_DATA) public data:Currency,  
              private notification:NotifierService,
              ) { }

  ngOnInit(): void {
    this.currencyForm=this.fb.group({
      currency:[],
    });
    if(this.data!=null){
      this.update=true;
      this.editData();

    }
     }

     editData(){
      this.currencyForm.patchValue({
        
        modifiedBy: this.data.modifiedBy,
        modifiedOn: Math.floor(Date.now() / 1000)
      })
    }
  
    
    updateCurrency() {
      
      this.data.currencyName = this.currencyForm.value.currency.currencyName;
      this.data.currencyCode = this.currencyForm.value.currency.currencyCode;
      this.data.currencyValue = this.currencyForm.value.currency.currencyValue; 
      this.service.updateCurrency(this.data).subscribe(res => {
        this.dialogRef.close(res);
        this.notification.openSnackBar(' Updated Successfully', 1);
      })
      this.currencyForm.reset();
    }
 


   public addItem(){
    if(this.currencyForm.valid==true){
      let org:any={}
      org.id=sessionStorage.getItem('orgId');
      let dataRow=this.currencyForm.value.currency;
      dataRow.setup=org
      dataRow.createdBy=sessionStorage.getItem('id');
      dataRow.modifiedBy=sessionStorage.getItem('id');
      dataRow.active=true;
      this.service.postCurrency(dataRow).subscribe(()=>{
        this.dialogRef.close("Done");
      this.notification.openSnackBar('Added Successfully', 1);
        this.currencyForm.reset();
      })
    }
    else{
      this.notification.shownNotification('Please fill all required fields to continue','ok','primary',5000,'end','bottom')
    }
  
  } 
  }
