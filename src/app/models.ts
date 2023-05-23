import { Type } from '@angular/core';

export interface IAd {
  component: Type<Icomponent>;
  data: any;
}

export interface Icomponent {
  data: any;
  type: string;
  teste: () => void;
}
