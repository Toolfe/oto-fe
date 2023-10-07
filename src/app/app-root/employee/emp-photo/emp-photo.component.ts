import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Md5 } from 'ts-md5';
import { EmpsetupService } from '../../setup-service/emp-setup/empsetup.service';


@Component({
  selector: 'app-emp-photo',
  templateUrl: './emp-photo.component.html',
  styleUrls: ['./emp-photo.component.scss']
})
export class EmpPhotoComponent implements OnInit{
  @Input() parent:any=FormGroup
  imageSrc:any;
  empPhoto: any;
  empName:string='';

  @Output() imageAddress= new EventEmitter<string>();


  constructor(private httpClient: HttpClient,
              private service: EmpsetupService){
  }
  ngOnInit(){
  
  }
  public picked(event:any, field:any) { 
      this.empPhoto = event.target.files[0]; 
    
  
  
  let httpOptions = {
    headers: new HttpHeaders({
      'Authorization':'Bearer '+sessionStorage.getItem('token')
    })
  }
   const uploadImageData = new FormData();

    uploadImageData.append('empPhoto', this.empPhoto, Md5.hashStr(this.service.empid));
    
    
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post<any>('http://localhost :2034/employee/upload', uploadImageData, httpOptions)
      .subscribe((response) => {  

        if (response.status === true) {
          this.imageAddress.emit(response.path)
          //this.message = 'Image uploaded successfully';
        } else {
         // this.message = 'Image not uploaded successfully';
        }

      }

      );

  }


    //Gets called when the user clicks on retieve image button to get the image from back end

/*     getImage() {

    //Make a call to Sprinf Boot to get the Image Bytes.

    this.httpClient.get('http://localhost :8080/image/get/' + this.imageName)

      .subscribe(

        res => {

          this.photoPath = res.name;

          this.base64Data = this.retrieveResonse.picByte;

          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;

        }

      );

  } */

}


