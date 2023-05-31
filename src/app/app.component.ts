import { Component, Inject, Type } from '@angular/core';
import { HeroProfileComponent } from './hero-profile.component';
import { HeroJobAdComponent } from './hero-job-ad.component';
import { COMPONENTS, IAd, Icomponent } from './models';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <app-ad-banner [newAds]="newAds()"></app-ad-banner>
    </div>
  `,
})
export class AppComponent {
  constructor(@Inject(COMPONENTS) private components: Type<Icomponent>[]) {}

  newAds(): IAd[] {
    return [
      {
        component: this.components[0],
        data: { name: 'Bombasto', bio: 'Brave as they come' },
      },
      {
        component: this.components[0],
        data: { name: 'Dr. IQ', bio: 'Smart as they come' },
      },
      {
        component: this.components[1],
        data: {
          headline: 'Hiring for several positions',
          body: 'Submit your resume today!',
        },
      },
      {
        component: this.components[1],
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
