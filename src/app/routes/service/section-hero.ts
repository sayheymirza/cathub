import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-section-hero',
  imports: [NgOptimizedImage, RouterLink],
  template: `
    <div class="flex flex-col justify-center gap-4 p-4">
      <h1 class="text-3xl font-bold">{{title()}}</h1>
      <p class="text-lg leading-8 text-base-content/70">
        {{subtitle()}}
      </p>

      <div class="flex flex-wrap gap-2 mt-4">
        <a routerLink="/order" class="btn btn-primary rounded-full">
          ثبت درخواست
        </a>
        <a routerLink="/consultation" class="btn btn-primary rounded-full btn-outline">
          درخواست مشاوره
        </a>
      </div>
    </div>

      <div class="flex flex-col items-center justify-end text-center p-4 gap-4 relative row-start-1 md:col-start-2">
        <img ngSrc="/images/demo/demo-1.png" alt="First demo" width="240" height="380" class="object-contain object-center md:z-20" />

        <div class="absolute bottom-10 right-0 md:right-20 grid grid-cols-2 grid-rows-3 z-10">
          <img ngSrc="/images/logo/cafebazaar.png" alt="Cafebazaar Logo" width="64" height="64" class="object-contain object-center col-start-2 -rotate-6" />
          <img ngSrc="/images/logo/myket.png" alt="Myket Logo" width="64" height="64" class="object-contain object-center rotate-12" />
          <img ngSrc="/images/logo/sibapp.png" alt="Sibapp Logo" width="64" height="64" class="object-contain object-center row-start-3 col-start-2 rotate-6" />
        </div>

        <div class="absolute bottom-10 left-0 md:left-20 grid grid-cols-2 grid-rows-3 z-0">
          <img ngSrc="/images/logo/google-play.png" alt="Google Play Logo" width="64" height="64" class="object-contain object-center col-start-2 row-start-3 -rotate-6" />
          <img ngSrc="/images/logo/apple.png" alt="Apple Logo" width="64" height="64" class="object-contain object-center rotate-12" />
        </div>
      </div>
  `,
  host: {
    class: 'grid grid-cols-2 md:gap-2 p-4 md:p-0'
  }
})
export class SectionHero {
  public title = input.required();
  public subtitle = input.required();
}
