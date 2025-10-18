import { Component, inject } from '@angular/core';
import { Seo } from '../../services/seo';
import { HomeBadges } from "./home-badges";
import { HomeFeatures } from './home-features';
import { HomeHero } from "./home-hero";
import { HomeSolutions } from "./home-solutions";

@Component({
  selector: 'app-home',
  imports: [HomeHero, HomeBadges, HomeFeatures, HomeSolutions],
  template: `
    <app-home-hero />
    <app-home-badges class="px-6 md:px-10" />
    <app-home-features />
    <app-home-solutions />
  `,
  host: {
    class: 'flex flex-col gap-4 md:gap-32 container mx-auto'
  }
})
export class Home {
  private seo = inject(Seo);

  ngOnInit() {
    this.seo.set({
      title: 'اپلیکیشن چت خودتان را داشته باشید',
      description: 'با استفاده از پلتفرم ما، به راحتی اپلیکیشن چت خود را بسازید و مدیریت کنید. امکانات پیشرفته و رابط کاربری ساده برای تجربه بهتر کاربران شما.',
    })
  }
}
