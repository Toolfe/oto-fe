import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { map, startWith, catchError, tap } from 'rxjs/operators';
import { FileRoot } from 'src/app/dashboard/document/models/file-model';

@Pipe({
  name: 'resWithLoading'
})
export class ResWithLoadingPipe implements PipeTransform {

  transform(val: any, args?: any): any {
    
    return isObservable(val)
      ? val.pipe(
        tap(() => {}),
        map(value => ({ loading: false, value })),
        tap(() => {}),
        startWith({ loading: true }),
        catchError(error => of({ loading: false, error }))
      )
      : val;
  }

}

export interface LoadingData{
loading:boolean;
value?:any[];
error?:any;
}