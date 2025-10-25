import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionApplicationCategories } from "./section-application-categories";
import { SectionFaq } from "../../components/section-faq";
import { HomeBadges } from "../home/home-badges";

@Component({
  selector: 'app-social-media',
  imports: [NgOptimizedImage, RouterLink, HomeBadges, SectionFaq, SectionApplicationCategories],
  template: `
    <section class="flex flex-col items-center justify-center text-center gap-2 px-4 pt-10">
      <h1 class="text-3xl font-bold">شبکه اجتماعی اختصاصی برندتان را بسازید</h1>
      <p class="text-lg leading-8 text-base-content/70">
        از ایده تا اجرا و انتشار؛ ما زیرساخت کامل شبکه اجتماعی شما را می‌سازیم
      </p>

      <div class="flex flex-wrap gap-2 mt-4">
        <a routerLink="/order" class="btn btn-primary rounded-full">
          ثبت درخواست
        </a>
        <a routerLink="/consultation" class="btn btn-primary rounded-full btn-outline">
          درخواست مشاوره
        </a>
      </div>
    </section>

    <section class="grid grid-cols-1 md:grid-cols-3 md:gap-2 p-4 md:p-0">
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
        <img ngSrc="/images/demo-1.png" alt="First demo" width="300" height="420" class="object-contain object-center md:z-20" />

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
    </section>

    <section class="grid grid-cols-3 gap-10">
      <div class="flex flex-col">
        <h2 class="text-3xl font-bold leading-12">
          روند و مسیر ساخت شبکه اجتماعی شما چگونه است؟
        </h2>
      </div>
    </section>
    
    <app-section-application-categories />

    <app-section-faq [items]="faq" category="ساخت شبکه اجتماعی" />
    
    <app-home-badges class="px-6 md:px-10 mb-10" />

  `,
  host: {
    class: 'flex flex-col gap-32 container mx-auto'
  }
})
export class SocialMedia {
  public faq: Array<{ question: string; answer: string }> = [
    {
      question: 'آیا می‌توانم شبکه اجتماعی خود را با برند و لوگوی خودم داشته باشم؟',
      answer: 'بله، ما امکان شخصی‌سازی کامل ظاهر و امکانات شبکه اجتماعی شما را فراهم می‌کنیم تا با برند شما هماهنگ باشد.'
    },
    {
      question: 'چه مدت طول می‌کشد تا شبکه اجتماعی من ساخته شود؟',
      answer: 'زمان ساخت بستگی به پیچیدگی پروژه دارد، اما معمولاً بین 4 تا 12 هفته طول می‌کشد.'
    },
    {
      question: 'آیا پشتیبانی پس از تحویل پروژه ارائه می‌دهید؟',
      answer: 'بله، ما پشتیبانی 24 ساعته برای رفع مشکلات و به‌روزرسانی‌های آینده ارائه می‌دهیم.'
    },
    {
      question: 'آیا می‌توانم ویژگی‌های خاصی را در شبکه اجتماعی خود اضافه کنم؟',
      answer: 'بله، ما می‌توانیم ویژگی‌های سفارشی را بر اساس نیازهای شما اضافه کنیم.'
    },
    {
      question: 'هزینه ساخت یک شبکه اجتماعی چقدر است؟',
      answer: 'هزینه بستگی به ویژگی‌ها و پیچیدگی پروژه دارد. برای دریافت یک برآورد دقیق، لطفاً با ما تماس بگیرید.'
    },
  ];
}
