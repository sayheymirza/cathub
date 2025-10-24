import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-faq',
  imports: [],
  template: `
    <div>
      <h2 class="text-3xl font-bold leading-12">
        سوالات متداول شما در مورد <span class="text-primary">{{ category() || 'خدمات ما' }}</span>
      </h2>
    </div>

    <div class="flex flex-col gap-4 lg:col-span-2">
      @for (item of items(); track $index) {
        <details class="collapse bg-base-100 border-base-300 border group hover:shadow-lg transition-all open:!shadow-none">
          <summary class="collapse-title font-semibold flex flex-nowrap items-center gap-2 pe-4 min-h-16 group-open:text-primary">
            <p class="leading-7">{{ item.question }}</p>
            <div class="flex-1"></div>
            <i class="material-icons-round group-open:!hidden">add</i>
            <i class="material-icons-round !hidden group-open:!block">remove</i>
          </summary>
          <div class="collapse-content text-sm">
            {{ item.answer }}
          </div>
        </details>
      }
    </div>
  `,
  host: {
    class: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4 md:p-0'
  }
})
export class SectionFaq {
  public items = input.required<any[]>();
  public category = input<string>('');
}
