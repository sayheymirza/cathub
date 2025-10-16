import { Component, inject } from '@angular/core';
import { HomeHero } from "../components/home-hero";
import { Seo } from '../services/seo';

@Component({
  selector: 'app-home',
  imports: [HomeHero],
  template: `
    <app-home-hero />
  `,
  host: {
    class: 'flex flex-col container mx-auto p-4'
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
