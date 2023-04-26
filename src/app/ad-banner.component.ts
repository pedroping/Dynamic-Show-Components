import {
  AfterViewInit,
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
import { Subject, takeUntil, timer } from 'rxjs';

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
export class AdBannerComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() newAds!: IAd[];

  currentAdIndex = -1;
  directiveComp: any;

  @ViewChildren('AdTemplate', { read: ViewContainerRef }) AdTemplates!: any;
  @ViewChild(AdDirective) adHost!: AdDirective;

  dynamicComponentsArray: {
    [key: number]: ComponentRef<HeroProfileComponent | HeroJobAdComponent>;
  } = [];

  destroy$ = new Subject<boolean>();

  private clearTimer: VoidFunction | undefined;

  constructor() {}
  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getAds();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  loadComponent() {
    if (!this.AdTemplates || !this.adHost) return;

    console.log(this.currentAdIndex);
    const Templates = this.AdTemplates?.toArray();
    this.currentAdIndex = (this.currentAdIndex + 1) % this.newAds.length;
    const adItem = this.newAds[this.currentAdIndex];

    this.directiveComp = this.adHost.createComponent(adItem);
    this.directiveComp.instance.type == 'HeroJobAd'
      ? {
          headline: 'Data Alterada com Teste!',
          body: 'Data Alterada com Teste!',
        }
      : {
          name: 'Data Alterada com Teste!',
          bio: 'Data Alterada com Teste!',
        };

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
        this.adHost.changeData();
        this.directiveComp.changeDetectorRef.detectChanges();
        componentRef.changeDetectorRef.detectChanges();
      }
    }
  }

  getAds() {
    timer(0, 5000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.loadComponent();
      });
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
