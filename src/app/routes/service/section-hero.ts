import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-section-hero',
  imports: [NgOptimizedImage],
  template: `
    <div class="flex flex-col items-end justify-center gap-2 md:py-20">
        <div class="flex flex-nowrap items-center gap-4 bg-base-100 border-b md:border border-base-300 md:border-base-200 p-4 md:rounded-lg w-full md:w-96 md:-rotate-6 md:shadow-xl md:scale-75 md:-ml-10 lg:ml-0 lg:scale-90 xl:scale-100">
          <img src="/images/icons/custom-design.png" alt="" width="48" height="48" class="object-center object-contain" />

          <div class="flex flex-col gap-1">
            <h2 class="font-bold">شخصی سازی کامل</h2>
            <p class="text-base-content/70 leading-7 text-sm">
              امکان شخصی سازی کامل ظاهر و امکانات شبکه اجتماعی با توجه به نیازها و سلیقه شما
            </p>
          </div>
        </div>

        <div class="flex flex-nowrap items-center gap-4 bg-base-100 border-b md:border border-base-300 md:border-base-200 p-4 md:rounded-lg w-full md:w-96 md:rotate-3 md:shadow-xl md:scale-75 md:-ml-10 lg:ml-0 lg:scale-90 xl:scale-100">
          <img src="/images/icons/verified-immediate.png" alt="" width="48" height="48" class="object-center object-contain" />

          <div class="flex flex-col gap-1">
            <h2 class="font-bold">تحویل و پشتیبانی فوری</h2>
            <p class="text-base-content/70 leading-7 text-sm">
              تحویل سریع پروژه و پشتیبانی 24 ساعته برای رفع مشکلات و به‌روزرسانی‌های آینده
            </p>
          </div>
        </div>

        <div class="flex flex-nowrap items-center gap-4 bg-base-100 border-b md:border border-base-300 md:border-base-200 p-4 md:rounded-lg w-full md:w-96 md:-rotate-1 md:shadow-xl md:scale-75 md:-ml-10 lg:ml-0 lg:scale-90 xl:scale-100">
          <img src="/images/icons/admin-panel.png" alt="" width="48" height="48" class="object-center object-contain" />

          <div class="flex flex-col gap-1">
            <h2 class="font-bold">پنل مدیریت قدرتمند</h2>
            <p class="text-base-content/70 leading-7 text-sm">
              پنل مدیریت پیشرفته برای کنترل کامل بر کاربران، محتوا و تنظیمات شبکه اجتماعی شما
            </p>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center justify-end text-center p-4 gap-4 relative row-start-1 md:col-start-2">
        <img ngSrc="/images/demo/demo-1.png" alt="First demo" width="300" height="420" class="object-contain object-center md:z-20" />

        <div class="absolute bottom-10 right-0 md:-right-10 grid grid-cols-2 grid-rows-3 z-10">
          <img ngSrc="/images/logo/cafebazaar.png" alt="Cafebazaar Logo" width="64" height="64" class="object-contain object-center col-start-2 -rotate-6" />
          <img ngSrc="/images/logo/myket.png" alt="Myket Logo" width="64" height="64" class="object-contain object-center rotate-12" />
          <img ngSrc="/images/logo/sibapp.png" alt="Sibapp Logo" width="64" height="64" class="object-contain object-center row-start-3 col-start-2 rotate-6" />
        </div>

        <div class="absolute bottom-10 left-0 md:-left-10 grid grid-cols-2 grid-rows-3 z-0">
          <img ngSrc="/images/logo/google-play.png" alt="Google Play Logo" width="64" height="64" class="object-contain object-center col-start-2 row-start-3 -rotate-6" />
          <img ngSrc="/images/logo/apple.png" alt="Apple Logo" width="64" height="64" class="object-contain object-center rotate-12" />
        </div>
      </div>
      
      <div class="flex flex-col items-start justify-center md:gap-2 md:py-20">
        <div class="flex flex-nowrap items-center gap-4 bg-base-100 border-b md:border border-base-300 md:border-base-200 p-4 md:rounded-lg w-full md:w-96 md:rotate-6 md:shadow-xl md:scale-75 md:-ml-10 lg:ml-0 lg:scale-90 xl:scale-100">
          <img src="/images/icons/messaging.png" alt="" width="48" height="48" class="object-center object-contain" />

          <div class="flex flex-col gap-1">
            <h2 class="font-bold">چت همیشه آنلاین و بلادرنگ</h2>
            <p class="text-base-content/70 leading-7 text-sm">
              سیستم چت پیشرفته با قابلیت ارسال پیام‌های فوری و اشتراک‌گذاری انواع فایل ها
            </p>
          </div>
        </div>

        <div class="flex flex-nowrap items-center gap-4 bg-base-100 border-b md:border border-base-300 md:border-base-200 p-4 md:rounded-lg w-full md:w-96 md:-rotate-3 md:shadow-xl md:scale-75 md:-ml-10 lg:ml-0 lg:scale-90 xl:scale-100">
          <img src="/images/icons/notification.png" alt="" width="48" height="48" class="object-center object-contain" />

          <div class="flex flex-col gap-1">
            <h2 class="font-bold">سیستم نوتیفیکیشن هوشمند</h2>
            <p class="text-base-content/70 leading-7 text-sm">
              ارسال نوتیفیکیشن‌های هوشمند برای افزایش تعامل کاربران و اطلاع‌رسانی به موقع
            </p>
          </div>
        </div>

        <div class="flex flex-nowrap items-center gap-4 bg-base-100 border-b md:border border-base-300 md:border-base-200 p-4 md:rounded-lg w-full md:w-96 md:rotate-0 md:shadow-xl md:scale-75 md:-ml-10 lg:ml-0 lg:scale-90 xl:scale-100">
          <img ngSrc="/images/icons/phone.png" alt="Phone icon" width="48" height="48" class="object-center object-contain scale-150" />

          <div class="flex flex-col gap-1">
            <h2 class="font-bold">سیستم نوتیفیکیشن هوشمند</h2>
            <p class="text-base-content/70 leading-7 text-sm">
              ارسال نوتیفیکیشن‌های هوشمند برای افزایش تعامل کاربران و اطلاع‌رسانی به موقع
            </p>
          </div>
        </div>
      </div>
  `,
  host: {
    class: 'grid grid-cols-1 md:grid-cols-3 md:gap-2 p-4 md:p-0'
  }
})
export class SectionHero {

}
