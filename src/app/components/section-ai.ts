import { Component } from '@angular/core';

@Component({
  selector: 'app-section-ai',
  imports: [],
  template: `
      <div class="flex flex-col gap-4 flex-1 mb-10">
        <h2 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          در کنار هوش مصنوعی متحول شوید
        </h2>
        <p class="text-xl text-base-content/70 leading-8">
          سیستم چت و پشتیبانی با هوش مصنوعی پیشرفته که کسب‌وکارتان را به سطح بعدی می‌برد
        </p>
      </div>

      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="flex flex-col sm:flex-row items-start gap-4 p-4 bg-blue-50 rounded-xl">
          <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <i class="material-icons-round text-white text-sm">flash_on</i>
          </div>
          <div>
            <h4 class="font-bold text-blue-500 mb-1">پاسخ‌گویی لحظه‌ای</h4>
            <p class="text-sm text-base-content/70">24/7 بدون وقفه، سریع‌تر از برق!</p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-start gap-4 p-4 bg-green-50 rounded-xl">
          <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <i class="material-icons-round text-white text-sm">person</i>
          </div>
          <div>
            <h4 class="font-bold text-green-500 mb-1">شخصی‌سازی هوشمند</h4>
            <p class="text-sm text-base-content/70">مشتری را می‌شناسد و متناسب رفتار می‌کند</p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-start gap-4 p-4 bg-purple-50 rounded-xl">
          <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <i class="material-icons-round text-white text-sm">analytics</i>
          </div>
          <div>
            <h4 class="font-bold text-purple-500 mb-1">آنالیز رفتار مشتری</h4>
            <p class="text-sm text-base-content/70">پیش‌بینی نیازها و پیشنهادات هوشمند</p>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-start gap-4 p-4 bg-orange-50 rounded-xl">
          <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <i class="material-icons-round text-white text-sm">integration_instructions</i>
          </div>
          <div>
            <h4 class="font-bold text-orange-500 mb-1">یکپارچه‌سازی آسان</h4>
            <p class="text-sm text-base-content/70">با هر سیستمی در چند دقیقه!</p>
          </div>
        </div>
      </div>

      <!-- lgbt gradient with tailwind -->
      <div class="p-0.5 rounded-[18px] overflow-hidden relative">
        <div class="mirza-flag absolute -z-1"></div>

        <div class="flex items-center gap-4 p-6 bg-base-100 rounded-2xl">
          <div class="flex-1 flex flex-col gap-1">
            <h4 class="font-bold text-xl">مخصوص کسب‌وکارها</h4>
            <p class="text-base-content/70 text-sm">افزایش فروش، کاهش هزینه‌ها و رضایت مشتری بیشتر</p>
          </div>
          <div class="text-center flex flex-col items-center gap-1">
            <div dir="ltr" class="text-2xl font-bold">+250%</div>
            <div class="text-base-content/70 text-xs">افزایش تبدیل</div>
          </div>
        </div>
      </div>
  `,
  host: {
    class: 'flex flex-col gap-4 p-4'
  }
})
export class SectionAi {

}
