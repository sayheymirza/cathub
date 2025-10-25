import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-application-categories',
  imports: [RouterLink],
  template: `
    <div class="grid grid-cols-6 gap-4 w-full">
      <div></div>
      @for (item of categories; track $index) {
        <a routerLink="{{item.link}}" class="flex flex-col items-center gap-1 overflow-hidden rounded-2xl relative h-96 p-8 cursor-pointer group">
          <div class="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-black/0"></div>

            <img src="{{item.background}}" alt="پس زمینه ساخت اپلیکیشن مناسب {{item.title}}" class="absolute inset-0 w-full h-full object-center object-cover -z-1 transition-all group-hover:scale-110" />

            <span class="text-white/70 w-full z-1">ساخت اپلیکیشن مناسب</span>
            <strong class="text-white w-full text-lg z-1">{{item.title}}</strong>

            <img src="{{item.demo}}" alt="ساخت اپلیکیشن مناسب {{item.title}}" class="absolute w-56 -bottom-4/6 object-bottom object-contain scale-85 transition-all group-hover:mb-5 group-hover:scale-90"/>

            <div class="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-black/0"></div>
        </a>
      }
    </div>

    <a routerLink="/order" class="btn btn-primary rounded-full">
      ثبت درخواست
    </a>
  `,
  host: {
    class: 'flex flex-col items-center justify-center gap-4'
  }
})
export class SectionApplicationCategories {
  public categories: ICategory[] = [
    {
      background: 'https://framerusercontent.com/images/4qnokRsn8IcYg2taGZVhF5IV3M.png',
      demo: '/images/demo/demo-1.png',
      title: 'شبکه اجتماعی',
      link: '/service/social',
    },
    {
      background: 'https://framerusercontent.com/images/blADvRdZ1gZF0BA9XQSJHl2arXs.png',
      demo: '/images/demo/demo-1.png',
      title: 'سازمانی',
      link: '/service/organization',
    },
    {
      background: 'https://framerusercontent.com/images/H1i4F1XuMup4KQkd7oB9vf7KzV4.png',
      demo: '/images/demo/demo-1.png',
      title: 'پشتیبانی آنلاین',
      link: '/service/support',
    },
    {
      background: 'https://framerusercontent.com/images/Yql7MjrSu556cy9OZy8jKCkCsO8.png',
      demo: '/images/demo/demo-1.png',
      title: 'بازی و سرگرمی',
      link: '/service/gaming',
    },
  ];
}

interface ICategory {
  background: string
  demo: string
  title: string
  link: string
}
