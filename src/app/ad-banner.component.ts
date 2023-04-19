import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { AdItem } from './ad-item';

@Component({
  selector: 'app-ad-banner',
  template: `
    <div class="ad-banner-example">
      <h3>Advertisements</h3>
      <ng-template #Teste></ng-template>
    </div>
  `
})
export class AdBannerComponent implements OnInit, OnDestroy {
  @Input() ads: AdItem[] = [];

  currentAdIndex = -1;

  @ViewChild('Teste', { read: ViewContainerRef }) Teste!: ViewContainerRef; 

  private clearTimer: VoidFunction | undefined;

  constructor(){

  }
  ngOnInit(): void {
    this.loadComponent();
    this.getAds();
  }

  ngOnDestroy() {
    this.clearTimer?.();
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];

    const viewContainerRef2 = this.Teste?.clear()

    const Teste = this.Teste?.createComponent(adItem.component)
    if(Teste)
      Teste.instance.data = adItem.data;
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