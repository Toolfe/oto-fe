import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: '[loading]'
})
export class SkeletonLoadingDirective {

  @HostBinding('class')
  elementClass = 'skeleton-box';
  constructor() { }

}
