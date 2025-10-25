import { Component } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  imports: [],
  template: `
    <div class="flex flex-col gap-4 p-10 lg:p-20 border-b lg:border-0 lg:border-l border-base-300 w-full lg:w-1/2 min-h-full h-full">
      <h1 class="font-bold text-3xl">با ما در تماس باشید</h1>
      <p>برای ارتباط با ما نیازی به فرم تماسی نیست، در ساعات پاسخگویی با شما هستیم.</p>
      <p class="text-sm text-base-content/70">پاسخگویی در روزهای اداری از ساعت ۹ صبح تا ۵ بعد از ظهر است.</p>
    </div>

    <div class="flex flex-col gap-10 p-10 lg:p-20 min-h-full h-full w-full lg:w-1/2">
      <div class="flex flex-nowrap gap-10">
        <div class="bg-base-200 rounded-xl min-w-12 h-12 flex items-center justify-center">
          <i class="material-icons-round">location_on</i>
        </div>

        <div class="flex flex-col gap-1">
          <strong>آدرس پستی</strong>
          <p class="text-base-content/70">پارک علم و فناوری قزوین، طبقه ۱، واحد ۳ غربی</p>
        </div>
      </div>

      <div class="flex flex-nowrap gap-10">
        <div class="bg-base-200 rounded-xl min-w-12 h-12 flex items-center justify-center">
          <i class="material-icons-round">phone</i>
        </div>

        <div class="flex flex-col gap-1">
          <strong>شماره موبایل</strong>
          <p class="text-base-content/70">02833291122</p>
        </div>
      </div>

      <div class="flex flex-nowrap gap-10">
        <div class="bg-base-200 rounded-xl min-w-12 h-12 flex items-center justify-center">
          <i class="material-icons-round">email</i>
        </div>

        <div class="flex flex-col gap-1">
          <strong>آدرس ایمیل</strong>
          <p class="text-base-content/70">contact@cathub.ir</p>
        </div>
      </div>
    </div>
  `,
  host: {
    class: 'container mx-auto flex flex-col lg:flex-row items-center justify-center py-20'
  }
})
export class ContactUs {

}
