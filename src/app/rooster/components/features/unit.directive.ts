import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[unitInjectPlace]',
})
export class UnitDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
