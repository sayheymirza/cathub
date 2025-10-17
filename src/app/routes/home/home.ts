import { Component, inject } from '@angular/core';
import { Seo } from '../../services/seo';
import { HomeBadges } from "./home-badges";
import { HomeFeatures } from './home-features';
import { HomeHero } from "./home-hero";

@Component({
  selector: 'app-home',
  imports: [HomeHero, HomeBadges, HomeFeatures],
  template: `
    <app-home-hero />
    <app-home-badges class="px-6 md:px-10" />
    <app-home-features />
  `,
  host: {
    class: 'flex flex-col gap-4 md:gap-10 container mx-auto p-4'
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
