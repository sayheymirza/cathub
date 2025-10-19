import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, RouterLink],
  template: `
    <header>
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

      <nav class="flex flex-nowrap items-center h-24 px-4 container mx-auto">
        <button class="btn btn-square md:hidden ml-auto">
          <i class="material-icons-round">menu</i>
        </button>

        <a routerLink="/" class="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 mx-auto md:mx-0">
          <img ngSrc="/images/logo.png" alt="Cathub Logo" width="56" height="56" class="w-[32px] h-[32px] md:w-[56px] md:h-[56px]" />
          <strong class="text-lg md:text-xl">کت هاب</strong>
        </a>

        <div class="hidden md:flex flex-nowrap items-center mx-auto">
          <div class="dropdown dropdown-hover">
            <div tabindex="0" role="button" class="btn btn-ghost mb-1">
              <span>خدمات</span>
              <i class="material-icons-round">arrow_drop_down</i>
            </div>
            <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li><a>چت اختصاصی</a></li>
              <li><a>سرور اختصاصی</a></li>
              <li><a>سرویس های ابری</a></li>
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

      </nav>
    </header>
  `,
})
export class Header {

}
