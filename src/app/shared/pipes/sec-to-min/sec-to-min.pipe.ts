import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secsToMin'
})
export class SecToMinPipe implements PipeTransform {

  transform(value: number): string {
    let timeSpent:string;
    if(!value){
      timeSpent=0+" Secs";
    }
    else if(value<60){
      timeSpent = value + " Secs";
    }else if(value>60 && value<3600){
      timeSpent=Math.floor(value/60) + " Mins";
    }else{
      //timeSpent=parseFloat((value/3600).toString()).toFixed(2) + " Hrs";
      timeSpent=Math.floor(value/60) + " Mins";
    }

    return timeSpent;
  }
}
