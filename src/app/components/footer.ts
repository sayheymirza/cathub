import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage],
  template: `
    <footer class="flex flex-col gap-20 container mx-auto p-4">
      <div class="grid grid-cols-6 gap-4">
        <div class="flex flex-col gap-4 col-span-2">
          <img ngSrc="/images/logo.png" alt="Cathub Logo" width="56" height="56" />
          <strong class="text-4xl mt-6">کت هاب</strong>
          <p class="text-neutral-600">اپلیکیشن چت خودتان را داشته باشید</p>
        </div>

        <div class="flex flex-col gap-2">
          <strong class="mb-4">خدمات ما</strong>

          <a class="hover:underline">چت اختصاصی</a>
          <a class="hover:underline">سرور اختصاصی</a>
          <a class="hover:underline">سرویس های ابری</a>
        </div>

        <div class="flex flex-col gap-2">
          <strong class="mb-4">ارتباط با مشتریان</strong>

          <a class="hover:underline">مشاوره رایگان</a>
          <a class="hover:underline">پورتال مشتریان</a>
          <a class="hover:underline">فرم ثبت سفارش سرویس</a>
        </div>

        <div class="flex flex-col gap-2">
          <strong class="mb-4">لینک های مفید</strong>

          <a class="hover:underline">وبلاگ</a>
          <a class="hover:underline">درباره ما</a>
          <a class="hover:underline">تماس با ما</a>
        </div>

        <div class="flex flex-col gap-2">
          <strong class="mb-4">تماس با ما</strong>

          <a class="flex flex-nowrap items-center gap-2 group">
            <i class="material-icons-round scale-90 text-primary">phone</i>
            <span class="group-hover:underline">۰۲۸۳۳۲۹۱۱۲۲</span>
          </a>

          <a class="flex flex-nowrap items-center gap-2 group">
            <i class="material-icons-round scale-90 text-primary">email</i>
            <span class="group-hover:underline">contact@cathub.ir</span>
          </a>

          <a class="flex flex-nowrap items-center gap-2 group">
            <i class="material-icons-round scale-90 text-primary">location_on</i>
            <span>پارک علم و فناوری قزوین، طبقه ۱، واحد ۳ غربی</span>
          </a>
        </div>
      </div>

      <!-- copyright -->
      <div class="flex flex-wrap justify-between gap-2 text-sm text-neutral-700">
        <p>&copy; تمامی حقوق برای کت هاب محفوظ است.</p>
        <p>2025 - 1404</p>
      </div>
    </footer>
  `,
})
export class Footer {

}
