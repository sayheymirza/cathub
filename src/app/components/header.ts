import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, RouterLink],
  template: `
    <header>
      <nav class="bg-black text-white h-10">
        <div class="flex flex-nowrap items-center gap-4 container mx-auto h-full">
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

      <nav class="flex flex-nowrap items-center h-24 container mx-auto">
        <a routerLink="/" class="flex flex-nowrap items-center gap-4">
          <img ngSrc="/images/logo.png" alt="Cathub Logo" width="56" height="56" />
          <strong class="text-xl">کت هاب</strong>
        </a>

        <div class="flex-1"></div>

        <div class="dropdown dropdown-hover">
          <div tabindex="0" role="button" class="btn btn-ghost m-1">
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
          <div tabindex="0" role="button" class="btn btn-ghost m-1">
            <span>امور مشتریان</span>
            <i class="material-icons-round">arrow_drop_down</i>
          </div>
          <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li><a>فرم ثبت سفارش سرویس</a></li>
          </ul>
        </div>

        <a routerLink="" class="btn btn-ghost m-1">
          <span>وبلاگ</span>
        </a>

        <div class="flex-1"></div>

        <a class="btn btn-outline border-primary text-primary">
          مشاوره رایگان
        </a>

        <div class="mx-1"></div>

        <a class="btn btn-primary">
          پورتال مشتریان
        </a>
      </nav>
    </header>
  `,
})
export class Header {

}
