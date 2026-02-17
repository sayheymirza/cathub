import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Seo } from '../../services/seo';

@Component({
  selector: 'app-documentation',
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <div class="flex flex-col gap-10 max-w-5xl mx-auto">
      <!-- Hero Section -->
      <div class="flex flex-col gap-4 text-center">
        <h1 class="text-3xl md:text-4xl font-bold">کت‌هاب چه کارهایی می‌تواند برای شما انجام دهد؟</h1>
        <p class="text-lg text-base-content/70 leading-8">
          راهکارهای جامع برای ساخت، توسعه و مدیریت پلتفرم‌های ارتباطی
        </p>
      </div>

      <!-- Main Capabilities -->
      <div class="grid md:grid-cols-2 gap-8">
        @for (capability of mainCapabilities; track $index) {
          <div class="flex flex-col gap-4 p-6 bg-base-200 rounded-xl hover:shadow-lg transition-all">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                <img [ngSrc]="capability.icon" alt="" width="32" height="32" />
              </div>
              <h3 class="text-xl font-bold">{{capability.title}}</h3>
            </div>
            <p class="text-base-content/70 leading-7">{{capability.description}}</p>
            <a [routerLink]="capability.link" class="btn btn-outline btn-sm rounded-full w-fit">
              اطلاعات بیشتر
              <i class="material-icons-round text-sm">arrow_back</i>
            </a>
          </div>
        }
      </div>

      <!-- Technical Capabilities -->
      <div class="flex flex-col gap-6 mt-10">
        <div class="text-center">
          <h2 class="text-2xl md:text-3xl font-bold mb-2">قابلیت‌های فنی و تخصصی</h2>
          <p class="text-base-content/70">ما چه امکاناتی را در اختیار شما قرار می‌دهیم</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          @for (tech of technicalFeatures; track $index) {
            <div class="flex flex-col gap-2 p-4 border border-base-content/10 rounded-xl hover:border-primary transition-all">
              <div class="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-2">
                <i class="material-icons-round text-primary">{{tech.icon}}</i>
              </div>
              <h4 class="font-bold">{{tech.title}}</h4>
              <p class="text-sm text-base-content/70">{{tech.description}}</p>
            </div>
          }
        </div>
      </div>

      <!-- Industries We Serve -->
      <div class="flex flex-col gap-6 mt-10">
        <div class="text-center">
          <h2 class="text-2xl md:text-3xl font-bold mb-2">صنایع و کسب‌وکارها</h2>
          <p class="text-base-content/70">در خدمت انواع کسب‌وکارها و سازمان‌ها</p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          @for (industry of industries; track $index) {
            <div class="flex flex-col items-center gap-2 p-4 bg-base-100 border border-base-content/10 rounded-xl text-center">
              <i class="material-icons-round text-3xl text-primary">{{industry.icon}}</i>
              <span class="font-medium text-sm">{{industry.name}}</span>
            </div>
          }
        </div>
      </div>

      <!-- Process -->
      <div class="flex flex-col gap-6 mt-10 bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-2xl">
        <div class="text-center">
          <h2 class="text-2xl md:text-3xl font-bold mb-2">فرآیند همکاری با کت‌هاب</h2>
          <p class="text-base-content/70">از ایده تا اجرا در چهار مرحله ساده</p>
        </div>

        <div class="grid md:grid-cols-4 gap-6">
          @for (step of processSteps; track $index) {
            <div class="flex flex-col items-center gap-3 text-center">
              <div class="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                {{$index + 1}}
              </div>
              <h4 class="font-bold">{{step.title}}</h4>
              <p class="text-sm text-base-content/70">{{step.description}}</p>
            </div>
          }
        </div>
      </div>

      <!-- Support & Maintenance -->
      <div class="flex flex-col md:flex-row gap-8 items-center bg-base-200 p-8 rounded-2xl">
        <div class="flex-1 flex flex-col gap-4">
          <h2 class="text-2xl font-bold">پشتیبانی و نگهداری مستمر</h2>
          <p class="text-base-content/70 leading-7">
            ما نه تنها پلتفرم شما را می‌سازیم، بلکه در تمام مراحل کنار شما هستیم. 
            پشتیبانی فنی 24/7، آپدیت‌های امنیتی، بهینه‌سازی عملکرد و مشاوره مستمر.
          </p>
          <div class="flex flex-wrap gap-3">
            <div class="badge badge-lg badge-outline">پشتیبانی 24/7</div>
            <div class="badge badge-lg badge-outline">آپدیت رایگان</div>
            <div class="badge badge-lg badge-outline">مشاوره تخصصی</div>
            <div class="badge badge-lg badge-outline">بکاپ خودکار</div>
          </div>
        </div>
        <div class="w-full md:w-auto">
          <a routerLink="/consultation" class="btn btn-primary btn-lg rounded-full w-full md:w-auto">
            درخواست مشاوره رایگان
            <i class="material-icons-round">arrow_back</i>
          </a>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="flex flex-col gap-4 items-center text-center py-10">
        <h2 class="text-2xl md:text-3xl font-bold">آماده شروع همکاری هستید؟</h2>
        <p class="text-base-content/70">امروز با ما تماس بگیرید و پروژه خود را شروع کنید</p>
        <div class="flex flex-wrap gap-3 justify-center mt-4">
          <a routerLink="/order" class="btn btn-primary rounded-full">
            ثبت سفارش
          </a>
          <a routerLink="/contact-us" class="btn btn-outline rounded-full">
            تماس با ما
          </a>
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'container mx-auto flex flex-col gap-4 px-4 py-10'
  }
})
export class Documentation {
  private seo = inject(Seo);

  ngOnInit() {
    this.seo.set({
      title: 'کت‌هاب چه کارهایی می‌تواند انجام دهد؟',
      description: 'کت‌هاب راهکارهای جامع برای ساخت اپلیکیشن چت، شبکه اجتماعی، سیستم پشتیبانی و چت سازمانی ارائه می‌دهد. با امکانات پیشرفته و پشتیبانی مستمر.',
    });
  }

  public mainCapabilities = [
    {
      icon: '/images/icons/messaging.png',
      title: 'ساخت اپلیکیشن چت',
      description: 'پلتفرم چت اختصاصی با تمام امکانات پیام‌رسانی مدرن شامل چت متنی، صوتی، تصویری، اشتراک فایل و گروه‌های چت.',
      link: '/service/chat'
    },
    {
      icon: '/images/icons/picture.png',
      title: 'ساخت شبکه اجتماعی',
      description: 'شبکه اجتماعی اختصاصی با امکانات پست، کامنت، لایک، پیام خصوصی، گروه‌های کاربری و سیستم دوستی.',
      link: '/service/social-media'
    },
    {
      icon: '/images/icons/permission.png',
      title: 'سیستم چت سازمانی',
      description: 'راه‌حل ارتباطی داخلی برای سازمان‌ها با کنترل دسترسی، مدیریت نقش‌ها، گزارش‌گیری و ادغام با سیستم‌های سازمانی.',
      link: '/service/organization'
    },
    {
      icon: '/images/icons/verified-security.png',
      title: 'سیستم پشتیبانی مشتریان',
      description: 'چت پشتیبانی حرفه‌ای با سیستم تیکت، چت‌بات هوشمند، آمار عملکرد و اتصال به CRM.',
      link: '/service/support'
    },
    {
      icon: '/images/icons/brain-storm.png',
      title: 'پلتفرم چت بازی',
      description: 'چت تخصصی برای بازی‌ها با اتاق‌های گفتگو، چت صوتی، سیستم رتبه‌بندی و اتصال به پلتفرم‌های بازی.',
      link: '/service/gaming'
    },
    {
      icon: '/images/icons/timeline.png',
      title: 'راهکارهای ویژه استارتاپ‌ها',
      description: 'ساخت سریع پیام‌رسان اختصاصی در چند روز، بدون نیاز به تیم فنی، با زیرساخت مقیاس‌پذیر.',
      link: '/service/startup'
    }
  ];

  public technicalFeatures = [
    {
      icon: 'security',
      title: 'رمزگذاری End-to-End',
      description: 'امنیت کامل پیام‌ها با بالاترین استانداردهای رمزگذاری'
    },
    {
      icon: 'cloud',
      title: 'زیرساخت ابری مقیاس‌پذیر',
      description: 'رشد بدون محدودیت با زیرساخت خودکار مقیاس‌پذیر'
    },
    {
      icon: 'api',
      title: 'API و یکپارچه‌سازی',
      description: 'اتصال آسان به سیستم‌های موجود با API قدرتمند'
    },
    {
      icon: 'notifications',
      title: 'نوتیفیکیشن بلادرنگ',
      description: 'اطلاع‌رسانی فوری با پشتیبانی از تمام پلتفرم‌ها'
    },
    {
      icon: 'phone',
      title: 'تماس صوتی و تصویری',
      description: 'کیفیت بالا با پشتیبانی از WebRTC'
    },
    {
      icon: 'folder',
      title: 'مدیریت فایل و رسانه',
      description: 'آپلود، ذخیره و اشتراک انواع فایل‌ها'
    },
    {
      icon: 'analytics',
      title: 'تحلیل و گزارش‌گیری',
      description: 'داشبورد جامع با آمار و نمودارهای تحلیلی'
    },
    {
      icon: 'palette',
      title: 'شخصی‌سازی کامل',
      description: 'طراحی و ظاهر متناسب با برند شما'
    },
    {
      icon: 'smart_toy',
      title: 'چت‌بات هوشمند',
      description: 'پاسخگویی خودکار با هوش مصنوعی پیشرفته'
    }
  ];

  public industries = [
    { icon: 'business', name: 'کسب‌وکارها' },
    { icon: 'account_balance', name: 'سازمان‌ها' },
    { icon: 'rocket_launch', name: 'استارتاپ‌ها' },
    { icon: 'school', name: 'آموزشی' },
    { icon: 'local_hospital', name: 'سلامت و درمان' },
    { icon: 'shopping_cart', name: 'فروشگاه‌ها' },
    { icon: 'sports_esports', name: 'بازی و سرگرمی' },
    { icon: 'gavel', name: 'حقوقی' }
  ];

  public processSteps = [
    {
      title: 'مشاوره و برنامه‌ریزی',
      description: 'تحلیل نیازها و ارائه بهترین راهکار'
    },
    {
      title: 'طراحی و توسعه',
      description: 'ساخت پلتفرم مطابق استانداردها'
    },
    {
      title: 'تست و تحویل',
      description: 'آزمایش کامل و راه‌اندازی پروژه'
    },
    {
      title: 'پشتیبانی مستمر',
      description: 'نگهداری و بهبود مداوم سیستم'
    }
  ];
}
