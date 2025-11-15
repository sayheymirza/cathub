import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home-features',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="sm:rounded-2xl flex items-center justify-center md:aspect-square p-4 bg-gradient-to-t from-base-300 to-base-200 relative">
        <swiper-container autoplay-delay="2500" slides-per-view="auto" space-between="10" mousewheel-force-to-axis="true" loop="true" class="z-0 relative aspect-square">
          <swiper-slide class="p-10">
            <img src="/images/demo/demo-1.png" alt="Demo 1" class="object-center object-contain w-full h-full" />
          </swiper-slide>
          <swiper-slide class="p-10">
            <img src="/images/demo/demo-2.png" alt="Demo 2" class="object-center object-contain w-full h-full" />
          </swiper-slide>
          <swiper-slide class="p-10">
            <img src="/images/demo/demo-3.png" alt="Demo 3" class="object-center object-contain w-full h-full" />
          </swiper-slide>
          <swiper-slide class="p-10">
            <img src="/images/demo/demo-4.png" alt="Demo 4" class="object-center object-contain w-full h-full" />
          </swiper-slide>
        </swiper-container>
    </div>

    <div class="flex flex-col gap-4 p-4">
      <h2 class="font-bold text-2xl">راه‌حل ما، ساخت سریع اپلیکیشن چت با برند شما</h2>

      <p class="text-base-content/70 leading-8 text-lg">
        با استفاده از پلتفرم کت‌هاب، می‌توانید در کمتر از یک هفته اپلیکیشن چت اختصاصی خود را با طراحی منحصربه‌فرد و امکانات پیشرفته بسازید. ما تمامی جنبه‌های فنی را مدیریت می‌کنیم تا شما بتوانید بر رشد کسب‌وکار خود تمرکز کنید.
      </p>

      <ul class="mt-4">
        @for (item of features; track $index) {
        <li class="flex flex-nowrap items-center gap-4 py-4 pe-4 ps-2 border-b border-b-base-content/20 last:border-transparent group">
          <img src="{{item.image}}" alt="{{item.title}}" class="w-[56px] transition-all group-hover:scale-125 group-hover:rotate-6" />

          <div class="flex flex-col flex-1 gap-1">
            <h3 class="font-bold group-hover:text-primary">{{item.title}}</h3>
            <p class="text-sm text-base-content/80">{{item.subtitle}}</p>
          </div>

          <!-- <i class="material-icons-round group-hover:text-primary">chevron_left</i> -->
        </li>
        }
      </ul>
    </div>
  `,
  host: {
    class: 'grid md:grid-cols-2 gap-10 md:gap-20'
  }
})
export class HomeFeatures {
  public features: any[] = [
    {
      image: '/images/icons/custom-design.png',
      title: 'طراحی اختصاصی',
      subtitle: 'اپ شما با ظاهر و تجربه کاربری ویژه‌ی برندتان ساخته می‌شود.',
    },
    {
      image: '/images/icons/verified-security.png',
      title: 'امنیت کامل داده‌ها',
      subtitle: 'تمام پیام‌ها رمزگذاری و در سرورهای امن نگهداری می‌شوند.',
    },
    {
      image: '/images/icons/verified-immediate.png',
      title: 'تحویل فوری',
      subtitle: 'در کمتر از یک هفته نسخه نهایی آماده استفاده است.',
    },
    {
      image: '/images/icons/brain-storm.png',
      title: 'پشتیبانی فنی مداوم',
      subtitle: 'تیم کت‌هاب همواره وضعیت اپلیکیشن شما را پایش و به‌روزرسانی می‌کند.',
    },
    {
      image: '/images/icons/admin-panel.png',
      title: 'پنل مدیریت قدرتمند',
      subtitle: 'مدیریت کاربران، پیام‌ها و تنظیمات اپلیکیشن از طریق پنل وب آسان است.',
    }
  ];
}
