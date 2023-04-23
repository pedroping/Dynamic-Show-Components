import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { AdItem } from './ad-item';
import { AdDirective } from './generate.directive';

@Component({
  selector: 'app-ad-banner',
  template: `
    <div class="ad-banner-example">
      <div #AdTemplate class="banner"></div>
      <div #AdTemplate class="banner"></div>
      <div adHost class="banner" [ads]="ads"></div>
    </div>
  `,
})
export class AdBannerComponent implements OnInit, OnDestroy {
  @Input() ads: AdItem[] = [];

  currentAdIndex = -1;

  @ViewChild('AdTemplate', { read: ViewContainerRef })
  AdTemplate!: ViewContainerRef;

  @ViewChildren('AdTemplate', { read: ViewContainerRef }) AdTemplates!: any;

  @ViewChild(AdDirective) adHost! : AdDirective

  private clearTimer: VoidFunction | undefined;

  constructor() {}
  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    this.clearTimer?.();
  }

  loadComponent() {
    
    const Templates = this.AdTemplates?.toArray();
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];
    
    if(this.adHost){
      this.adHost.createComponent(this.currentAdIndex)
    }
    
    if (Templates) {
      for (let index = 0; index < Templates?.length; index++) {
        const viewContainerRef = Templates[index]?.clear();
        const AdTemplate = Templates[index]?.createComponent(adItem.component);
        if (AdTemplate) AdTemplate.instance.data = adItem.data;
      }
    }

    // Templates?.toArray().foreach((template: any) => {
    //   const viewContainerRef = template?.clear()
    //   const AdTemplate = template?.createComponent(adItem.component)
    //   if(AdTemplate) AdTemplate.instance.data = adItem.data;
    // })

    // const viewContainerRef = this.AdTemplate?.clear()

    // const AdTemplate = this.AdTemplate?.createComponent(adItem.component)
    // if(AdTemplate) AdTemplate.instance.data = adItem.data;
  }

  getAds() {
    const interval = setInterval(() => {
      this.loadComponent();
    }, 1000);
    this.clearTimer = () => clearInterval(interval);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
