import { Directive, Input, ViewContainerRef } from '@angular/core';
import { IAd } from './models';

@Directive({
  selector: '[adHost]',
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
  @Input() ads!: IAd[];

  createComponent(id: number) {
    this.viewContainerRef.clear();
    const adItem = this.ads[id];
    const componentRef = this.viewContainerRef.createComponent(
      adItem.component
    );
    componentRef.instance.data = adItem.data;
  }
}
