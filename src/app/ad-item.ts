import { Type } from '@angular/core';
import { HeroJobAdComponent } from './hero-job-ad.component';
import { HeroProfileComponent } from './hero-profile.component';
export class AdItem {
  constructor(public component: Type<HeroProfileComponent | HeroJobAdComponent>, public data: any) {}
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/