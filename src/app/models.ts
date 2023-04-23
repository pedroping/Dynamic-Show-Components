import { HeroJobAdComponent } from './hero-job-ad.component';
import { HeroProfileComponent } from './hero-profile.component';

export interface IAd {
  component: typeof HeroProfileComponent | typeof HeroJobAdComponent;
  data: any;
}
