import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SectionBadges } from '../../components/section-badges';
import { SectionFaq } from '../../components/section-faq';
import { SectionMap } from '../../components/section-map';

@Component({
  selector: 'app-service-server',
  imports: [SectionBadges, SectionFaq, SectionMap, NgOptimizedImage, RouterLink],
  template: `
    <div class="grid md:grid-cols-2 gap-10">
      <div class="flex items-center justify-center">
        <img ngSrc="/images/server.png" alt="Servers" width="400" height="550" class="object-center object-contain" />
      </div>

      <div class="flex flex-col items-center text-center md:items-start md:text-start justify-center gap-4 p-4">
        <h1 class="text-3xl font-bold leading-12"> سرور ابری و سرور اختصاصی </h1>
        <p class="text-lg leading-8 text-base-content/70">
          ما بهترین سرورهای ابری و اختصاصی را با کیفیت بالا و قیمت مناسب ارائه می‌دهیم. از هر نقطه جهان با سرعت بالا و پایداری کامل.
        </p>
        
        <div class="flex flex-wrap gap-2 mt-4">
          <a routerLink="/order" class="btn btn-primary rounded-full">
            ثبت درخواست
          </a>
          <a routerLink="/consultation" class="btn btn-primary rounded-full btn-outline">
            درخواست مشاوره
          </a>
        </div>

        <div class="divider"></div>

        <section class="flex flex-col xl:flex-row gap-4 items-center justify-between w-full">
          <h2 class="text-xl font-bold leading-9 grow">هر سیستم عاملی که نیاز دارید</h2>
          <div class="flex flex-nowrap items-center gap-4 w-fit">
            <div class="p-4 aspect-square rounded-xl flex items-center justify-center hover:bg-base-200 transition-all tooltip tooltip-top" data-tip="ویندوز">
              <img ngSrc="/images/os/win.png" alt="Windows Server" width="32" height="32" />
            </div>
            <div class="p-4 aspect-square rounded-xl flex items-center justify-center hover:bg-base-200 transition-all tooltip tooltip-top" data-tip="اوبونتو">
              <img ngSrc="/images/os/ubuntu.png" alt="Ubuntu" width="32" height="32" />
            </div>
            <div class="p-4 aspect-square rounded-xl flex items-center justify-center hover:bg-base-200 transition-all tooltip tooltip-top" data-tip="دبیان">
              <img ngSrc="/images/os/debian.png" alt="Debian" width="32" height="32" />
            </div>
            <div class="p-4 aspect-square rounded-xl flex items-center justify-center hover:bg-base-200 transition-all tooltip tooltip-top" data-tip="سنت او اس">
              <img ngSrc="/images/os/centos.png" alt="CentOS" width="32" height="32" />
            </div>
            <div class="p-4 aspect-square rounded-xl flex items-center justify-center hover:bg-base-200 transition-all tooltip tooltip-top" data-tip="آلما لینوکس">
              <img ngSrc="/images/os/almalinux.png" alt="Almalinux" width="32" height="32" />
            </div>
          </div>
        </section>
      </div>

    </div>

    <section class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div class="flex flex-col gap-10 p-4">
        <h2 class="text-2xl font-bold leading-9">انتخاب بیین چندین دیتاسنتر معتبر در جهان</h2>

        <div class="grid grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-4">
          @for (item of countries; track $index) {
            <div class="flex flex-nowrap items-center gap-4 p-4 rounded-xl border border-base-300 transition-all hover:shadow-xl">
              <img ngSrc="/images/flags/{{item.id}}.png" alt="پرچم کشور {{item.name}}" width="32" height="24" class="object-center object-contain"/>
              <strong class="text-sm truncate">{{item.name}}</strong>
            </div>
          }
        </div>
      </div>

      <app-section-map class="md:col-span-2" [countries]="countriesIDs" />
    </section>

    <app-section-faq [items]="faq" [category]="'سرور اختصاصی'" />

    <app-section-badges class="px-6 md:px-10 mb-10" />
  `,
  host: {
    class: 'flex flex-col gap-32 container mx-auto'
  }
})
export class ServiceServer {
  public get countriesIDs(): string[] {
    return this.countries.map(country => `#${country.id}`);
  }

  //['#IR', '#TR', '#FR', '#DE', '#AE']
  public countries: { id: string, name: string }[] = [
    { id: 'IR', name: 'ایران' },
    { id: 'TR', name: 'ترکیه' },
    { id: 'AE', name: 'امارات متحده عربی' },
    { id: 'FR', name: 'فرانسه' },
    { id: 'DE', name: 'آلمان' },
  ];

  public faq: { question: string; answer: string }[] = [
    {
      question: 'آیا می‌توانم سیستم‌عامل سرور را انتخاب کنم؟',
      answer: 'بله، ما تمامی سیستم‌عامل‌های محبوب شامل Ubuntu، CentOS، Windows Server و غیره را ارائه می‌دهیم و شما می‌توانید هر زمان آن را تغییر دهید.'
    },
    {
      question: 'چگونه می‌توانم سرور را ارتقا یا کاهش دهم؟',
      answer: 'شما می‌توانید در هر زمان از پنل کاربری خود، منابع سرور (CPU، RAM، پهنای باند) را فوری ارتقا یا کاهش دهید بدون قطعی سرویس.'
    },
    {
      question: 'آیا سرورهای شما برای بازی‌ها و چت بهینه‌سازی شده‌اند؟',
      answer: 'بله، سرورهای ما با شبکه پرسرعت و تاخیر بسیار پایین طراحی شده‌اند تا بهترین عملکرد را برای سرورهای بازی و پلتفرم‌های چت ارائه دهند.'
    },
    {
      question: 'چه نوع کنترل پنل‌هایی می‌توانم استفاده کنم؟',
      answer: 'ما انواع پنل‌های محبوب شامل Pterodactyl برای بازی‌ها، cPanel، Plesk و یا هر پنل سفارشی مورد نیاز شما را نصب می‌کنیم.'
    },
    {
      question: 'آیا از تمامی انواع بازی‌ها پشتیبانی می‌کنید؟',
      answer: 'بله، سرورهای ما از تمامی بازی‌های محبوب شامل Minecraft، CS:GO، FiveM، Discord Bot و سرورهای چت مختلف پشتیبانی کامل می‌کنند.'
    }
  ];
}
