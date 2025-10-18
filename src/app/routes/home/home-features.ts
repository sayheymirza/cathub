import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-home-features',
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="md:rounded-2xl flex items-center justify-center md:aspect-square p-4 bg-gradient-to-t from-base-300 to-base-200 relative">
        <swiper-container autoplay-delay="2500" slides-per-view="auto" space-between="10" mousewheel-force-to-axis="true" loop="true" class="w-[240px] h-[560px] z-0 relative">
          <swiper-slide class="flex items-center justify-center">
            <div class="w-full h-full rounded-[40px] bg-white overflow-hidden px-4 py-10">
              Slide 1
            </div>
          </swiper-slide>
          <swiper-slide class="flex items-center justify-center">
            <div class="w-full h-full rounded-[40px] bg-white overflow-hidden px-4 py-10">
              Slide 2
            </div>
          </swiper-slide>
          <swiper-slide class="flex items-center justify-center">
            <div class="w-full h-full rounded-[40px] bg-white overflow-hidden px-4 py-10">
              Slide 3
            </div>
          </swiper-slide>
          <swiper-slide class="flex items-center justify-center">
            <div class="w-full h-full rounded-[40px] bg-white overflow-hidden px-4 py-10">
              Slide 4
            </div>
          </swiper-slide>
        </swiper-container>

        <img src="/images/iphone.png" alt="IPhone Mockup" class="w-[280px] h-[560px] object-contain absolute z-1" />
    </div>

    <div class="flex flex-col gap-4 p-4">
      <h2 class="font-bold text-2xl">راه‌حل ما، ساخت سریع اپلیکیشن چت با برند شما</h2>

      <p class="text-base-content/80 leading-7">
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
      image: 'https://landingo.themi.ir/wp-content/uploads/2025/03/icons8-solid-paint-96.png',
      title: 'طراحی اختصاصی',
      subtitle: 'اپ شما با ظاهر و تجربه کاربری ویژه‌ی برندتان ساخته می‌شود.',
    },
    {
      image: 'https://landingo.themi.ir/wp-content/uploads/2025/03/icons8-guarantee-96.png',
      title: 'امنیت کامل داده‌ها',
      subtitle: 'تمام پیام‌ها رمزگذاری و در سرورهای امن نگهداری می‌شوند.',
    },
    {
      image: 'https://landingo.themi.ir/wp-content/uploads/2025/03/icons8-approval-96.png',
      title: 'تحویل فوری',
      subtitle: 'در کمتر از یک هفته نسخه نهایی آماده استفاده است.',
    },
    {
      image: 'https://landingo.themi.ir/wp-content/uploads/2025/03/icons8-brainstorm-skill-96.png',
      title: 'پشتیبانی فنی مداوم',
      subtitle: 'تیم کت‌هاب همواره وضعیت اپلیکیشن شما را پایش و به‌روزرسانی می‌کند.',
    },
    {
      image: 'https://landingo.themi.ir/wp-content/uploads/2025/03/icons8-web-96.png',
      title: 'پنل مدیریت قدرتمند',
      subtitle: 'مدیریت کاربران، پیام‌ها و تنظیمات اپلیکیشن از طریق پنل وب آسان است.',
    }
  ];
}
