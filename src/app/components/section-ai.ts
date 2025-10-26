import { Component } from '@angular/core';

@Component({
  selector: 'app-section-ai',
  imports: [],
  template: `
      <div class="flex flex-col gap-4 flex-1">
        <h2 class="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          قابلیت‌های هوش مصنوعی خفن
        </h2>
        <p class="text-xl text-base-content/70 leading-8">
          سیستم چت و پشتیبانی با هوش مصنوعی پیشرفته که کسب‌وکارتان را به سطح بعدی می‌برد
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="flex items-start gap-4 p-4 bg-base-200 rounded-xl">
          <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <i class="material-icons-round text-white text-sm">flash_on</i>
          </div>
          <div>
            <h4 class="font-bold text-gray-800 mb-1">پاسخ‌گویی لحظه‌ای</h4>
            <p class="text-sm text-gray-600">24/7 بدون وقفه، سریع‌تر از برق!</p>
          </div>
        </div>

        <div class="flex items-start gap-4 p-4 bg-base-200 rounded-xl">
          <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <i class="material-icons-round text-white text-sm">person</i>
          </div>
          <div>
            <h4 class="font-bold text-gray-800 mb-1">شخصی‌سازی هوشمند</h4>
            <p class="text-sm text-gray-600">هر مشتری را می‌شناسد و متناسب رفتار می‌کند</p>
          </div>
        </div>

        <div class="flex items-start gap-4 p-4 bg-base-200 rounded-xl">
          <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <i class="material-icons-round text-white text-sm">analytics</i>
          </div>
          <div>
            <h4 class="font-bold text-gray-800 mb-1">آنالیز رفتار مشتری</h4>
            <p class="text-sm text-gray-600">پیش‌بینی نیازها و پیشنهادات هوشمند</p>
          </div>
        </div>

        <div class="flex items-start gap-4 p-4 bg-base-200 rounded-xl">
          <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <i class="material-icons-round text-white text-sm">integration_instructions</i>
          </div>
          <div>
            <h4 class="font-bold text-gray-800 mb-1">یکپارچه‌سازی آسان</h4>
            <p class="text-sm text-gray-600">با هر سیستمی در چند دقیقه!</p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-4 p-6 bg-base-200 rounded-2xl">
        <div class="flex -space-x-2">
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">💼</div>
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">🚀</div>
          <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">⚡</div>
        </div>
        <div class="flex-1">
          <h4 class="font-bold text-lg">مخصوص کسب‌وکارها</h4>
          <p class="text-base-content/70 text-sm">افزایش فروش، کاهش هزینه‌ها و رضایت مشتری بیشتر</p>
        </div>
        <div class="text-right">
          <div dir="ltr" class="text-2xl font-bold">+250%</div>
          <div class="text-base-content/70 text-xs">افزایش تبدیل</div>
        </div>
      </div>
  `,
  host: {
    class: 'flex flex-col gap-4 p-4'
  }
})
export class SectionAi {

}
