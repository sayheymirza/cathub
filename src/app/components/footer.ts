import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage],
  template: `
    <footer class="flex flex-col gap-20 container mx-auto p-4">
      <div class="grid grid-cols-4 gap-4">
        <div class="flex flex-col gap-4">
          <img ngSrc="/images/logo.png" alt="Cathub Logo" width="56" height="56" />
          <strong class="text-4xl mt-6">کت هاب</strong>
          <p class="text-neutral-600">اپلیکیشن چت خودتان را داشته باشید</p>
        </div>
      </div>

      <!-- copyright -->
      <div class="flex flex-wrap justify-between gap-2 text-sm text-neutral-700">
        <p>&copy; تمامی حقوق برای کت هاب محفوظ است.</p>
        <p>2025 - 1404</p>
      </div>
    </footer>
  `,
})
export class Footer {

}
