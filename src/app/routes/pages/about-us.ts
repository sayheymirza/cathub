import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-us',
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <div class="grid grid-cols-5 gap-10 max-w-5xl mx-auto">
      <div class="flex flex-col gap-2 col-span-3">
        <h1 class="text-2xl font-bold">کت‌هاب؛ پلتفرمی برای ساخت آیندهٔ گفتگوهای دیجیتال</h1>
        <p class="text-base-content/70 leading-7">در کت‌هاب، ما باور داریم که ارتباط مؤثر، ستون اصلی هر سازمان و کسب‌وکار است. مأموریت ما ساده است: کمک کنیم تا هر سازمان، استارتاپ یا تیم، اپلیکیشن چت مخصوص خودش را بسازد. با برند خودش، با داده‌های امن خودش، و با تجربه‌ای که دقیقاً مطابق نیازش باشد.</p>
        
        <a routerLink="/about-us" fragment="jobs" class="btn btn-primary rounded-full w-fit mt-4">
          موقعیت های شغلی ما
        </a>
      </div>

      <div class="grid grid-cols-2 gap-4 col-span-3 col-start-3 row-start-2">
        <div class="flex flex-col bg-primary/10 p-6 rounded-xl">
          <strong class="text-3xl text-primary">3</strong>
          <div class="flex-1 min-h-4"></div>
          <strong class="text-primary">تعداد پروژه ها</strong>
          <p class="text-base-content/70 leading-5 text-sm">
            پروژه هایی که توسط ما توسعه پیدا کرده اند
          </p>
        </div>

        <div class="flex flex-col bg-primary/10 p-6 rounded-xl">
          <strong class="text-3xl text-primary">2</strong>
          <div class="flex-1 min-h-4"></div>
          <strong class="text-primary">سال تجربه</strong>
          <p class="text-base-content/70 leading-5 text-sm">
            با تیمی که کنار هم دارند خوب کار می کنند
          </p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-20 max-w-5xl mx-auto">
      @for (item of contents; track $index) {
        <div class="flex flex-col gap-2" [class.col-start-2]="$odd">
          <h3 class="text-xl font-bold">{{item.title}}</h3>
          <p class="text-base-content/70 leading-7" [innerText]="item.content"></p>
        </div>

        @if($even) {
          <div></div>
        }
      }
    </div>
      
    <div class="max-w-5xl mx-auto flex flex-col gap-10 py-16 px-6 border-y border-gray-200">
      <h2 class="text-2xl font-bold">اصولی که بر پایه‌شان می‌سازیم</h2>
      <ul class="grid md:grid-cols-2 gap-4">
        <li class="p-4 rounded-xl border border-base-content/20 flex flex-nowrap items-center gap-4">
          <img ngSrc="/images/icons/verified-security.png" alt="" width="32" height="32" />
          <p>امنیت داده‌ها در اولویت است.</p>
        </li>
        <li class="p-4 rounded-xl border border-base-content/20 flex flex-nowrap items-center gap-4">
          <img ngSrc="/images/icons/custom-design.png" alt="" width="32" height="32" />
          <p>سادگی و کارایی در طراحی.</p>
        </li>
        <li class="p-4 rounded-xl border border-base-content/20 flex flex-nowrap items-center gap-4">
          <img ngSrc="/images/icons/verified-immediate.png" alt="" width="32" height="32" />
          <p>استقلال و مالکیت کامل داده برای هر سازمان.</p>
        </li>
        <li class="p-4 rounded-xl border border-base-content/20 flex flex-nowrap items-center gap-4">
          <img ngSrc="/images/icons/timeline.png" alt="" width="32" height="32" />
          <p>رشد و یادگیری مداوم در قلب فرهنگ ما.</p>
        </li>
      </ul>
    </div>
    
    <div class="grid grid-cols-3 gap-4 max-w-5xl mx-auto">
      <h2 id="jobs" class="text-2xl font-bold col-span-3">فرصت های شغلی در کت هاب</h2>

      @for (item of jobs; track $index) {
        <div dir="ltr" class="rounded-xl flex flex-col p-8 group transition-all hover:bg-base-200">
          <h3 class="font-bold group-hover:text-primary">{{item.title}}</h3>
          <span class="text-xs">{{item.location}}</span>
          <p class="text-base-content/70 text-sm mt-3">
            {{item.description}}
          </p>
        </div>
      }
    </div>
  `,
  host: {
    class: 'container mx-auto flex flex-col gap-20 px-4 py-10'
  }
})
export class AboutUs {
  public contents: any[] = [
    {
      title: 'چطور کت‌هاب شکل گرفت؟',
      content: 'ایدهٔ کت‌هاب از این سؤال شروع شد: چرا باید همه از پیام‌رسان‌های عمومی استفاده کنند، وقتی می‌توانند اپلیکیشن اختصاصی خودشان را داشته باشند؟\n از همان نقطه، ما زیرساختی طراحی کردیم که ساخت پلتفرم گفت‌وگو برای هر سازمان را ساده کند — امن، سریع و قابل گسترش.',
    },
    {
      title: 'تیمی که گفتگو را بازتعریف می‌کند',
      content: 'تیم ما ترکیبی از مهندسان، طراحان و متخصصان زیرساخت است که با هدف مشترک کار می‌کنند: ساده‌تر کردن ارتباط دیجیتال.\n در کت‌هاب هیچ نقش کوچکی وجود ندارد؛ هر تصمیم حاصل همکاری و تفکر جمعی است.'
    },
    {
      title: 'آزادی، مسئولیت و رشد',
      content: 'در کت‌هاب، کار فقط شغل نیست؛ فرصتی است برای ساختن چیزی واقعی. ما آزادی تصمیم‌گیری و مسئولیت‌پذیری را تشویق می‌کنیم. هیچ ساختار خشک یا سلسله‌مراتبی وجود ندارد — همه می‌توانند ایده بدهند، تصمیم بگیرند و تأثیر بگذارند.'
    },
    {
      title: 'چابک، شفاف و متصل',
      content: 'تیم کت‌هاب به‌صورت ریموت کار می‌کند و از ابزارهایی استفاده می‌کند که خودش ساخته. فرآیندها مستند، تکرارپذیر و مشارکتی‌اند تا همکاری به‌صورت شفاف و منسجم پیش برود.'
    }
  ];

  public jobs = [
    {
      "title": "Flutter Developer",
      "location": "Remote / Full-time",
      "description": "Design and develop chat applications with Flutter, coordinate with UI/UX and Backend teams."
    },
    {
      "title": "Frontend Developer (React / Angular)",
      "location": "Remote / Full-time",
      "description": "Develop CatHub web user interface, focusing on performance and enterprise user experience."
    },
    {
      "title": "Backend Developer (Node.js)",
      "location": "Remote / Full-time",
      "description": "Design and develop APIs, security infrastructure and enterprise chat data management."
    },
    {
      "title": "Support Specialist",
      "location": "Hybrid / Full-time",
      "description": "Technical support for enterprise customers, documentation and troubleshooting communication issues."
    },
    {
      "title": "Product Manager",
      "location": "Remote / Full-time",
      "description": "Manage product lifecycle, gather market requirements and translate them into technical features."
    },
    {
      "title": "UI/UX Designer",
      "location": "Remote / Contract",
      "description": "Design enterprise chat user experience, focus on simplicity and clarity in team communication."
    }
  ];
}
