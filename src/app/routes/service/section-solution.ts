import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-solution',
  imports: [NgOptimizedImage],
  template: `
    <div class="w-1/2 flex flex-col gap-4 p-4">
      <h2 class="text-2xl font-bold">{{title()}}</h2>
      <p class="text-base-content/80 leading-8">{{description()}}</p>
    </div>

    <div class="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
      @for (item of items(); track $index) {
        <div class="flex flex-col gap-4 hover:bg-base-200 rounded-xl p-6 group transition-all">
          <div class="flex flex-nowrap items-center gap-4">
            @if(item.image) {
              <img ngSrc="{{item.image}}" alt="{{item.title}}" width="44" height="44" class=" transition-all group-hover:scale-125 group-hover:rotate-6" />
            }
            <h4 class="font-bold">{{item.title}}</h4>
          </div>
          <p class="text-sm leading-7 text-base-content/80">{{item.description}}</p>
        </div>
      }
    </div>
  `,
  host: {
    class: 'flex flex-col gap-10'
  }
})
export class SectionSolution {
  public title = input.required();
  public description = input.required();
  public items = input.required<any[]>();
}
