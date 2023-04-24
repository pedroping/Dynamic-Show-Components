import {
  Component,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import { AdDirective } from './generate.directive';
import { HeroJobAdComponent } from './hero-job-ad.component';
import { HeroProfileComponent } from './hero-profile.component';
import { IAd } from './models';

@Component({
  selector: 'app-ad-banner',
  template: `
    <div class="ad-banner-example">
      <div #AdTemplate class="banner"></div>
      <div #AdTemplate class="banner"></div>
      <div adHost class="banner" [ads]="newAds"></div>
    </div>

    <button (click)="Teste()">Teste</button>
  `,
})
export class AdBannerComponent implements OnInit, OnDestroy {
  @Input() newAds!: IAd[];

  currentAdIndex = -1;

  @ViewChildren('AdTemplate', { read: ViewContainerRef }) AdTemplates!: any;
  @ViewChild(AdDirective) adHost!: AdDirective;

  dynamicComponentsArray: {
    [key: number]: ComponentRef<HeroProfileComponent | HeroJobAdComponent>;
  } = [];

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
    this.currentAdIndex = (this.currentAdIndex + 1) % this.newAds.length;
    const adItem = this.newAds[this.currentAdIndex];

    if (this.adHost) {
      this.adHost.createComponent(adItem);
    }

    if (Templates) {
      this.dynamicComponentsArray = [];
      for (let index = 0; index < Templates?.length; index++) {
        const viewContainerRef = Templates[index]?.clear();
        const AdTemplate = Templates[index]?.createComponent(adItem.component);
        if (AdTemplate) {
          AdTemplate.instance.data = adItem.data;
          this.dynamicComponentsArray[index] = AdTemplate;
        }
      }
    }
  }

  Teste() {
    const Templates = this.AdTemplates?.toArray();

    if (Templates) {
      for (let index = 0; index < Templates?.length; index++) {
        const componentRef = this.dynamicComponentsArray[index];
        const component = componentRef as ComponentRef<
          HeroProfileComponent | HeroJobAdComponent
        >;

        component.instance.data =
          component.instance.type == 'HeroJobAd'
            ? {
                headline: 'Data Alterada com Teste!',
                body: 'Data Alterada com Teste!',
              }
            : {
                name: 'Data Alterada com Teste!',
                bio: 'Data Alterada com Teste!',
              };

        console.log(componentRef.instance, 'Type', typeof component);
      }
    }
  }

  getAds() {
    this.loadComponent();
    const interval = setInterval(() => {
      this.loadComponent();
    }, 5000);
    this.clearTimer = () => clearInterval(interval);
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
