import { Component } from '@angular/core';

@Component({
  selector: 'app-home-hero',
  imports: [],
  template: `
    <div class="flex flex-col items-center text-center md:items-start md:text-start justify-center gap-2 p-10 md:pl-10 md:p-14 xl:p-28">
      <h1 class="text-2xl xl:text-3xl font-bold leading-12">کت‌هاب ارائه‌دهنده راهکارهای تخصصی در حوزه ارتباطات بلادرنگ</h1>
      <p class="text-white/85 leading-8 lg:text-md xl:text-lg">ما برای شرکت‌ها و سازمان‌ها، اپلیکیشن‌های چت امن و مقیاس‌پذیر طراحی و تحویل می‌دهیم تا تعامل داخلی و ارتباط با مشتریان ساده‌تر و کارآمدتر شود.</p>

      <div class="flex flex-wrap justify-center md:justify-start gap-2 mt-8">
        <a class="btn btn-lg rounded-full text-primary">
          <span class="text-sm">مشاهده خدمات</span>
        </a>
        <a class="btn btn-lg btn-outline rounded-full hover:text-primary">
          <span class="text-sm">مشاوره رایگان</span>
        </a>
      </div>
    </div>
    
    <div class="flex flex-nowrap items-end justify-center gap-4 -mb-20 md:mb-0 md:relative md:-bottom-20">
      <img src="/images/demo-1.png" alt="First Demo" class="w-fit h-[300px] md:h-[480px] object-center object-contain lg:static md:absolute left-0 z-1 shadow-xl rounded-[45px]" />
      <img src="/images/demo-2.png" alt="Second Demo" class="w-fit h-[300px] md:h-[480px] object-center object-contain lg:static md:absolute left-10 top-0 shadow-xl rounded-[45px]" />
    </div>
  `,
  host: {
    class: 'grid md:grid-cols-2 md:rounded-3xl bg-gradient-to-b from-primary to-secondary text-white mb-16 overflow-hidden md:[overflow:unset]'
  }
})
export class HomeHero {

}
