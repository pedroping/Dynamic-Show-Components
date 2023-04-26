import {
  ComponentRef,
  Directive,
  Input,
  ViewContainerRef,
} from '@angular/core';
import { IAd } from './models';

@Directive({
  selector: '[adHost]',
})
export class AdDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
  componentRef!: ComponentRef<any>;
  @Input() ads!: IAd[];

  createComponent(adItem: IAd) {
    this.viewContainerRef.clear();
    this.componentRef = this.viewContainerRef.createComponent(adItem.component);
    this.componentRef.instance.data = adItem.data;
    return this.componentRef;
  }

  changeData() {
    this.componentRef.instance.data =
      this.componentRef.instance.type == 'HeroJobAd'
        ? {
            headline: 'Data Alterada com Teste!',
            body: 'Data Alterada com Teste!',
          }
        : {
            name: 'Data Alterada com Teste!',
            bio: 'Data Alterada com Teste!',
          };
  }
}
