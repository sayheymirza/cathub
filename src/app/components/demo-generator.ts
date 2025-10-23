import { NgOptimizedImage, NgStyle } from '@angular/common';
import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, ElementRef, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Swiper } from 'swiper/types';

@Component({
  selector: 'app-demo-generator',
  imports: [NgOptimizedImage, FormsModule, NgStyle],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="md:col-span-2 flex flex-col gap-1 py-8">
      <div class="flex flex-col gap-2">
        <h2 class="text-xl font-bold">اپلیکیشن خودتان را بسازید</h2>
        <p class="text-base-content/70 leading-7">
          پیش نمایشی از امکانات و قابلیت‌های شبکه اجتماعی شما
        </p>
      </div>

      <!-- name of each tab group should be unique -->
      <div class="tabs tabs-lift mt-10">
        <input type="radio" name="demo" class="tab" aria-label="اطلاعات اپلیکیشن" checked="checked" />
        <div class="tab-content bg-base-100 border-base-300 rounded-field p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="border border-base-content/20 rounded-field p-4 flex flex-nowrap items-center gap-4 md:col-span-2">
            <img ngSrc="{{logo()}}" alt="Application logo" width="48" height="48" class="rounded-lg" />

            <strong class="flex-1">لوگو اپلیکیشن</strong>

            <button (click)="changeLogo()" class="btn btn-primary btn-sm rounded-full">
              تغییر
            </button>
          </div>

          <fieldset class="fieldset w-full">
            <legend class="fieldset-legend">نام اپلیکیشن</legend>
            <input [(ngModel)]="name" type="text" placeholder="نام اپلیکیشن شما" class="input input-lg text-sm w-full focus:input-primary" />
          </fieldset>

          <fieldset class="fieldset w-full">
            <legend class="fieldset-legend">رنگ اپلیکیشن</legend>
            <label class="input input-lg text-sm w-full focus-within:input-primary">
              <input (click)="colorPicker.focus()" [(ngModel)]="color" type="text" readonly placeholder="رنگ اپلیکیشن شما" dir="ltr" class="font-mono" />
              <input #colorPicker [(ngModel)]="color" type="color" class="rounded-full w-8 min-h-8 h-8 border-none outline-none appearance-none">
            </label>
          </fieldset>
        </div>

        <!-- <input type="radio" name="demo" class="tab" aria-label="Tab 2" />
        <div class="tab-content bg-base-100 border-base-300 p-6">Tab content 2</div> -->
      </div>
    </div>

    <section class="flex flex-col items-center justify-center gap-4">
      <div class="flex items-center justify-center p-4 relative">
      <img src="/images/iphone.png" alt="IPhone Mockup" class="min-w-[280px] h-[575px] absolute" />

      <div class="rounded-[36px] overflow-hidden bg-black">
        <swiper-container #swiper loop="true" class="w-[255px] h-[555px] z-0">
            <swiper-slide class="flex items-center justify-center rounded-[36px]">
              <div class="w-full h-full rounded-[34px] overflow-hidden px-4 pt-16 relative">
                <img src="https://applescoop.org/image/wallpapers/iphone/ios-18-stock-default-light-azure-blue-27-10-2024-1730076291-hd-wallpaper.png" alt="" class="absolute inset-0 object-center object-cover -z-1 scale-105 rounded-[34px]" />
                <div class="bg-white/12 backdrop-blur-lg absolute inset-0 -z-1"></div>
                
                <div class="grid grid-cols-3 gap-1">
                  <div (click)="nextSlide()" class="flex flex-col items-center gap-2 cursor-pointer">
                    <img ngSrc="{{logo()}}" alt="Test Application Icon" width="46" height="46" class="rounded-xl" />

                    <span class="text-[10px] text-center text-white text-shadow-2xs">{{name()}}</span>
                  </div>
                </div>
              </div>
            </swiper-slide>
            <swiper-slide class="flex items-center justify-center">
              <div class="w-full h-full rounded-[34px] bg-white overflow-hidden flex items-center justify-center relative">
                <img ngSrc="{{logo()}}" alt="Test Application Icon" width="46" height="46" class="rounded-xl" />

                <div class="flex flex-col items-center justify-center gap-4 absolute bottom-6 left-0 right-0">
                  <progress class="progress w-1/3 h-1" [ngStyle]="{'color': color()}"></progress>
                  <span class="text-[10px]">در حال ارتباط با سرور</span>
                </div>
              </div>
            </swiper-slide>
            <!-- <swiper-slide class="flex items-center justify-center">
              <div class="w-full h-full rounded-[34px] bg-white overflow-hidden px-4 py-10">
                Slide 3
              </div>
            </swiper-slide> -->
          </swiper-container>
        </div>

        <div class="w-[250px] h-4 flex flex-nowrap items-center justify-between absolute top-8 px-4 z-1">
          <div class="flex flex-nowrap items-center gap-1">
            <img ngSrc="/images/icons/battery.png" alt="Battery" width="18" height="18" />
            <img ngSrc="/images/icons/wifi.png" alt="Wifi" width="14" height="14" />
            <img ngSrc="/images/icons/signal.png" alt="Signal" width="14" height="14" />
          </div>

          <strong class="font-mono text-[11px]">12:34</strong>
        </div>

        <div class="bg-black h-6 w-20 rounded-full absolute top-7 left-1/2 -translate-x-1/2"></div>
      </div>

      <div class="flex flex-nowrap items-center justify-between gap-4">
        <button (click)="prevSlide()" class="btn btn-circle btn-lg">
          <i class="material-icons-round">arrow_forward</i>
        </button>

        <strong class="text-xs">{{title()}}</strong>

        <button (click)="nextSlide()" class="btn btn-circle btn-lg">
          <i class="material-icons-round">arrow_back</i>
        </button>
      </div>
    </section>
  `,
  host: {
    class: 'grid grid-cols-1 md:grid-cols-3 px-4 md:px-0'
  }
})
export class DemoGenerator {
  private swiperElem = viewChild<ElementRef<{ swiper: Swiper }>>('swiper');
  private index = signal(0);

  public title = computed(() => {
    const index = this.index();

    return ['نمایش آیکون اپلیکیشن', 'بارگذاری اولیه اپلیکیشن', 'صفحه فرود'][index];
  });

  public logo = signal('/images/icons/testflight.png');
  public name = signal('نام اپلیکیشن شما');
  public color = signal('#238FFF');

  public changeLogo() {
    // pick an png file and blob url encode it to set as logo
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/png, image/jpeg';
    fileInput.onchange = () => {
      const file = fileInput.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.logo.set(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  }

  public nextSlide() {
    this.swiperElem()?.nativeElement.swiper.slideNext();
    this.onSlideChange();
  }

  public prevSlide() {
    this.swiperElem()?.nativeElement.swiper.slidePrev();
    this.onSlideChange();
  }

  public onSlideChange() {
    const index = this.swiperElem()?.nativeElement.swiper.activeIndex || 0
    this.index.set(index);
  }
}
