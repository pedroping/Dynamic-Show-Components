import { Component, Input } from '@angular/core';
import { Icomponent } from './models';

@Component({
  template: `
    <div class="hero-profile">
      <h3>Featured Hero Profile</h3>
      <h4>{{data.name}}</h4>

      <p>{{data.bio}}</p>

      <strong>Hire this hero today!</strong>
    </div>
  `,
})
export class HeroProfileComponent implements Icomponent {
  data: any;
  type = "HeroProfile"

  teste() {
    alert('Teste');
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
