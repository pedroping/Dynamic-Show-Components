import { Component } from '@angular/core';
import { HeroProfileComponent } from './hero-profile.component';
import { HeroJobAdComponent } from './hero-job-ad.component';
import { IAd } from './models';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-ad-banner [newAds]="newAds()"></app-ad-banner>
    </div>
  `,
})
export class AppComponent {

  constructor() {}
 
  newAds(): IAd[] {
    return [
      {
        component: HeroProfileComponent,
        data: { name: 'Bombasto', bio: 'Brave as they come' },
      },
      {
        component: HeroProfileComponent,
        data: { name: 'Dr. IQ', bio: 'Smart as they come' },
      },
      {
        component: HeroJobAdComponent,
        data: {
          headline: 'Hiring for several positions',
          body: 'Submit your resume today!',
        },
      },
      {
        component: HeroJobAdComponent,
        data: { headline: 'Openings in all departments', body: 'Apply today' },
      },
    ];
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
