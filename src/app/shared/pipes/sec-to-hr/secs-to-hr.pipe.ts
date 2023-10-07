import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secsToMinutes'
})
export class SecsToHrPipe implements PipeTransform {

  transform(value: number): string {
    let timeSpent:string;
    let time=value/1000
    if(!time){
      timeSpent=0+" Secs";
    }
    else if(time<60){
      timeSpent = time + " Secs";
    }else if(time>60 && time<3600){
      timeSpent=Math.floor(time/60) + " Mins";
    }else{
      //timeSpent=parseFloat((value/3600).toString()).toFixed(2) + " Hrs";
      timeSpent=Math.floor(time/60) + " Mins";
    }

    return timeSpent;
  }
}
