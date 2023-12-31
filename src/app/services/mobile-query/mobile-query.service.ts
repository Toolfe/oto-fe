import { Injectable, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class MobileQueryService implements OnDestroy{
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  
  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher){            
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    
ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
}
}
