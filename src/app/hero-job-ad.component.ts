import { Component, Input } from '@angular/core';
import { Icomponent } from './models';

@Component({
  template: `
    <div class="job-ad">
      <h4>{{data.headline}}</h4>
      {{data.body}}
    </div>
  `,
})
export class HeroJobAdComponent implements Icomponent {
  data: any;
  type = 'HeroJobAd';

  teste() {
    alert('Teste');
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
