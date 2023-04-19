import { Component, OnInit } from '@angular/core';
import { AdItem } from './ad-item';
import { HeroProfileComponent } from './hero-profile.component';
import { HeroJobAdComponent } from './hero-job-ad.component';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-ad-banner [ads]="ads"></app-ad-banner>
    </div>
  `
})
export class AppComponent implements OnInit {
  ads: AdItem[] = [];

  constructor() {}

  ngOnInit() {
    this.ads = this.getAds();
  }
  getAds() {
    return [
      new AdItem(
        HeroProfileComponent,
        { name: 'Bombasto', bio: 'Brave as they come' }
      ),
      new AdItem(
        HeroProfileComponent,
        { name: 'Dr. IQ', bio: 'Smart as they come' }
      ),
      new AdItem(
        HeroJobAdComponent,
        { headline: 'Hiring for several positions', body: 'Submit your resume today!' }
      ),
      new AdItem(
        HeroJobAdComponent,
        { headline: 'Openings in all departments', body: 'Apply today' }
      )
    ];
  }
}



/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/