import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-home-solutions',
  imports: [NgClass],
  template: `
  <div class="flex flex-col gap-4">
    <h2 class="font-bold text-2xl">راهکار هایی برای ساخت ارتباط سریع، امن و مقیاس‌پذیر</h2>
    <p class="text-base-content/70 leading-8 text-xl">
      متناسب با نوع کسب‌وکار، مقیاس تیم و نیاز کاربران، کت‌هاب راه‌حل‌های اختصاصی برای طراحی و پیاده‌سازی سیستم‌های چت ارائه می‌دهد.
    </p>
  </div>

    <div class="tabs tabs-lg tabs-border mt-6">
      @for (item of items; track $index) {
        <label class="tab transition-all gap-4" [class.text-primary]="index() == $index">
          <input type="radio" name="solutions" (change)="index.set($index)" [checked]="index() == $index"  />
          <i class="material-icons-round">{{item.icon}}</i>
          <span>{{item.title}}</span>
        </label>

        <div class="tab-content py-8">
          <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            @for (item of item.items; track $index) {
              <div 
                class="flex flex-col gap-4 rounded-xl p-6 group transition-all"
                [ngClass]="'bg-base-200'"
              >
                <div class="flex flex-nowrap items-center gap-4">
                  @if(item.image) {
                    <img src="{{item.image}}" alt="{{item.title}}" width="44px" class=" transition-all group-hover:scale-125 group-hover:rotate-6" />
                  }
                  <h4 class="font-bold text-lg">{{item.title}}</h4>
                </div>
                <p class="text-base leading-7 text-base-content/80">{{item.description}}</p>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  host: {
    class: 'flex flex-col gap-2 p-4'
  }
})
export class HomeSolutions {
  public index = signal(0);

  public subitems = computed(() => {
    return this.items[this.index()].items;
  });

  public items: any[] = [
    {
      title: "سازمان‌ها",
      icon: 'apartment',
      items: [
        {
          image: '/images/icons/messaging.png',
          title: "چت سازمانی داخلی",
          description: "راه‌حلی برای برقراری ارتباط سریع بین تیم‌ها با امنیت دادهٔ درون‌سازمانی.",
          class: "bg-gradient-to-r from-green-50 to-blue-50 border border-blue-100"
        },
        {
          image: '/images/icons/cursor.png',
          title: "ادغام با سیستم‌های سازمانی (CRM، ERP)",
          description: "اتصال مستقیم سیستم چت کت‌هاب به سامانه‌های مدیریتی و منابع انسانی.",
          class: "bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-100"
        },
        {
          image: '/images/icons/report.png',
          title: "گزارش‌گیری و مانیتورینگ ارتباطات",
          description: "امکان پایش فعالیت‌ها، کیفیت پاسخ‌گویی و تحلیل تعامل داخلی.",
          class: "bg-gradient-to-r from-purple-50 to-blue-50 border border-blue-100"
        },
        {
          image: '/images/icons/permission.png',
          title: "کنترل دسترسی و مدیریت نقش‌ها",
          description: "تعریف سطح دسترسی برای مدیران، کارمندان و بخش‌های مختلف سازمان.",
          class: "bg-gradient-to-r from-orange-50 to-red-50 border border-red-100"
        },

      ]
    },
    {
      title: "استارتاپ‌ها",
      icon: 'rocket_launch',
      items: [
        {
          image: '/images/icons/brain-storm.png',
          title: "ساخت سریع اپلیکیشن چت بدون تیم فنی",
          description: "در چند روز پیام‌رسان اختصاصی خود را تحویل بگیرید.",
          class: "bg-gradient-to-r from-orange-50 to-red-50 border border-red-100"
        },
        {
          image: '/images/icons/custom-design.png',
          title: "طراحی سفارشی متناسب با برند",
          description: "رنگ، لوگو و ظاهر اپ به‌صورت کامل مطابق هویت استارتاپ شما تنظیم می‌شود.",
          class: "bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-100"
        },
        {
          image: '/images/icons/timeline.png',
          title: "زیرساخت مقیاس‌پذیر از روز اول",
          description: "افزایش کاربران بدون نگرانی از پرفورمنس یا هزینه‌های سرور.",
          class: "bg-gradient-to-r from-green-50 to-blue-50 border border-blue-100"
        },
        {
          image: '/images/icons/admin-panel.png',
          title: "مدیریت ساده از داشبورد مرکزی",
          description: "کاربران، گفتگوها و تنظیمات را از یک پنل واحد کنترل کنید.",
          class: "bg-gradient-to-r from-purple-50 to-blue-50 border border-blue-100"
        }
      ]
    },
    {
      title: "تیم‌های پشتیبانی",
      icon: 'support_agent',
      items: [
        {
          image: '/images/icons/messaging.png',
          title: "چت هم‌زمان با چند کاربر",
          description: "پشتیبان‌ها می‌توانند به چند گفت‌وگو به‌صورت هم‌زمان پاسخ دهند.",
          class: "bg-gradient-to-r from-green-50 to-blue-50 border border-blue-100"
        },
        {
          image: '/images/icons/verified-security.png',
          title: "سیستم برچسب‌گذاری و تیکت",
          description: "گفتگوها قابل دسته‌بندی و پیگیری تا زمان حل مشکل هستند.",
          class: "bg-gradient-to-r from-yellow-50 to-pink-50 border border-pink-100"
        },
        {
          image: '/images/icons/timeline.png',
          title: "آمار و تحلیل عملکرد تیم",
          description: "نمایش داده‌های پاسخ‌گویی، زمان انتظار و سطح رضایت کاربران.",
          class: "bg-gradient-to-r from-green-50 to-blue-50 border border-blue-100"
        },
        {
          image: '/images/icons/cursor.png',
          title: "اتصال به CRM و سیستم‌های مدیریت مشتری",
          description: "انتقال خودکار داده‌ها و تاریخچه گفتگوها به پروفایل مشتریان.",
          class: "bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-100"
        }
      ]
    },
    {
      title: "شبکه‌های اجتماعی",
      icon: 'groups',
      items: [
        {
          image: '/images/icons/messaging.png',
          title: "ایجاد گروه و کانال اختصاصی",
          description: "ساخت گروه‌های گفت‌وگو یا کانال‌های اطلاع‌رسانی با کنترل مدیر.",
          class: "bg-gradient-to-r from-green-50 to-blue-50 border border-blue-100"
        },
        {
          image: '/images/icons/picture.png',
          title: "پروفایل کاربری و پیام خصوصی",
          description: "هر کاربر دارای صفحه شخصی و امکان گفت‌وگوی مستقیم است.",
          class: "bg-gradient-to-r from-orange-50 to-red-50 border border-red-100"
        },
        {
          image: '/images/icons/custom-design.png',
          title: "طراحی اجتماعی متناسب با برند",
          description: "رابط کاربری چت مطابق تم و گرافیک شبکهٔ شما ساخته می‌شود.",
          class: "bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-100"
        },
        {
          image: '/images/icons/notification.png',
          title: "سیستم نوتیفیکیشن بلادرنگ",
          description: "اطلاع‌رسانی سریع پیام‌ها و فعالیت‌ها برای افزایش تعامل کاربران.",
          class: "bg-gradient-to-r from-purple-50 to-blue-50 border border-blue-100"
        }
      ]
    },
    {
      title: 'بازی و سرگرمی', // online mobile games
      icon: 'sports_esports',
      items: [
        {
          image: '/images/icons/messaging.png',
          title: "چت درون‌بازی بلادرنگ",
          description: "بازیکنان می‌توانند در حین بازی با یکدیگر ارتباط برقرار کنند.",
          class: "bg-gradient-to-r from-green-50 to-blue-50 border border-blue-100"
        },
        {
          image: '/images/icons/report.png',
          title: "اتاق‌های گفتگو و گروه‌های بازی",
          description: "ایجاد اتاق‌های اختصاصی برای تیم‌ها و گروه‌های بازی.",
          class: "bg-gradient-to-r from-purple-50 to-blue-50 border border-blue-100"
        },
        {
          image: '/images/icons/custom-design.png',
          title: "شخصی‌سازی رابط کاربری چت",
          description: "ظاهر چت مطابق با تم و گرافیک بازی طراحی می‌شود.",
          class: "bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-100"
        },
        {
          image: '/images/icons/notification.png',
          title: "نوتیفیکیشن‌های فوری برای رویدادهای بازی",
          description: "اطلاع‌رسانی به بازیکنان درباره پیام‌ها و رویدادهای مهم بازی.",
          class: "bg-gradient-to-r from-purple-50 to-blue-50 border border-blue-100"
        }
      ]
    }
  ];

}
