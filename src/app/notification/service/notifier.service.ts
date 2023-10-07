import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snakbar:MatSnackBar) { }

  playAudio(){
    let audio = new Audio();
    audio.src = "./../../assets/music/music-1.wav";
    audio.load();
    audio.play();
  }


  shownNotification(displayMessage:string, 
                    buttonText:string,
                    messageType:'error'|'success'|'warn'|'primary',
                    duration:number,hp:'start' | 'center' | 'end' | 'left' | 'right',
                    vp:'top' | 'bottom'){
    // this.playAudio();
    this.snakbar.openFromComponent(NotificationComponent,{
      data:{
        message:displayMessage,
        buttonText:buttonText,
        type:messageType,
      },
       duration:duration,  
       horizontalPosition:hp,
       verticalPosition:vp,
       panelClass:messageType
    })
  }

  openSnackBar(msg:string,type:Number){  
    if(type==0){ 
    this.shownNotification(msg,'ok','error',4000,'end','bottom')
  } 
   else if(type==1){
    this.shownNotification(msg,'ok','success',4000,'end','bottom')
  }
  else if(type==2){
    this.shownNotification(msg,'ok','warn',4000,'end','bottom')
  }}
}
