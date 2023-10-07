import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'characterLimit'
})
export class CharacterLimitPipe implements PipeTransform {
 
  transform(value: string, limit?: number) {
    if(!value)
    return null;
    let actualLimit = (limit)? limit:500;
    return value.substring(0,actualLimit);
  }

}
