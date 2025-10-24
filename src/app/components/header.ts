import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, HostListener, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, RouterLink],
  template: `
    <header class="h-24 md:h-34">
      <nav class="bg-black text-white h-10 hidden md:block">
        <div class="flex flex-nowrap items-center gap-4 container mx-auto px-4 h-full">
          <p class="text-sm">جهت خرید و ثبت سرویس با شماره‌های درج شده تماس حاصل فرمایید.</p>
          <div class="flex-1"></div>
          
          <a class="flex flex-nowrap items-center gap-2">
            <span class="text-sm">۰۲۸-۳۳۲۹۱۱۲۲</span>
            <i class="material-icons-round scale-90">phone</i>
          </a>

          <a class="flex flex-nowrap items-center gap-2">
            <span class="text-sm">contact@cathub.ir</span>
            <i class="material-icons-round scale-90">email</i>
          </a>
        </div>
      </nav>

      <nav #navbar class="bg-white/40 backdrop-blur transition-all h-24 border-b border-transparent">
        <div class="flex flex-nowrap items-center h-full px-4 container mx-auto">
          <div class="md:hidden">
            <button class="btn btn-square btn-ghost">
              <i class="material-icons-round">menu</i>
            </button>
          </div>

          <a routerLink="/" class="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 mx-auto md:mx-0 md:w-36">
            <img ngSrc="/images/logo.png" alt="Cathub Logo" width="56" height="56" class="w-[32px] h-[32px] md:w-[56px] md:h-[56px] transition-all" />
            <strong class="text-base sm:text-lg md:text-xl hidden md:block">کت هاب</strong>
          </a>

          <div class="hidden md:flex flex-nowrap items-center mx-auto">
            <div class="dropdown dropdown-hover">
              <div tabindex="0" role="button" class="btn btn-ghost mb-1">
                <span>خدمات</span>
                <i class="material-icons-round">arrow_drop_down</i>
              </div>
              <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li><a routerLink="/service/chat">ساخت اپلیکیشن چت</a></li>
                <li><a routerLink="/service/social-media">ساخت شبکه اجتماعی</a></li>
                <li><a routerLink="/service/organization">چت سازمانی</a></li>
                <li><a routerLink="/service/gaming">چت بازی و سرگرمی</a></li>
                <li><a routerLink="/service/support">چت پشتیبانی</a></li>
                <li><a routerLink="/service/server">سرور اختصاصی</a></li>
              </ul>
            </div>

            <div class="dropdown dropdown-hover">
              <div tabindex="0" role="button" class="btn btn-ghost mb-1">
                <span>امور مشتریان</span>
                <i class="material-icons-round">arrow_drop_down</i>
              </div>
              <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li><a routerLink="/order">فرم ثبت سفارش سرویس</a></li>
              </ul>
            </div>

            <a routerLink="" class="btn btn-ghost m-1">
              <span>وبلاگ</span>
            </a>
          </div>

          <a routerLink="/consultation" class="btn btn-outline border-primary rounded-full text-primary hidden md:flex">
            درخواست مشاوره
          </a>

          <div class="mx-1"></div>

          <a routerLink="/login" class="btn btn-primary rounded-full">
            پورتال مشتریان
          </a>

        </div>
      </nav>
    </header>
  `,
  host: {
    class: 'block sticky top-0 md:-top-10 z-50'
  },
})
export class Header {
  private navbar = viewChild<ElementRef<HTMLDivElement>>('navbar');

  // listen to window and when sticked to top, change some classes for navbar
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const target = event.target as Document;
    const scrollTop = target.scrollingElement?.scrollTop || 0;
    const element = this.navbar()!.nativeElement as HTMLDivElement;

    if (scrollTop >= 40) {
      element.classList.remove('h-24', 'border-transparent');
      element.classList.add(...'border-base-content/10 h-16'.split(' '));
      element.querySelector('img')?.classList.add('!w-[32px]', '!h-[32px]');
    } else {
      element.classList.add('h-24', 'border-transparent');
      element.classList.remove(...'border-base-content/10 h-16'.split(' '));
      element.querySelector('img')?.classList.remove('!w-[32px]', '!h-[32px]');
    }
  }
}
