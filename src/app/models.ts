import { InjectionToken, Type } from '@angular/core';

export const COMPONENTS: InjectionToken<Type<Icomponent>[]> =
  new InjectionToken('COMPONENTS');

export interface IAd {
  component: Type<Icomponent>;
  data: any;
}

export interface Icomponent {
  data: any;
  type: string;
  teste: () => void;
}
