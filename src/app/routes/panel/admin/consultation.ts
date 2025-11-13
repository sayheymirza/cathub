import { Component, inject, signal } from '@angular/core';
import { Http } from '../../../services/http';
import { DatePipe } from '../../../pipes/date';

@Component({
  selector: 'app-consultation',
  imports: [DatePipe],
  template: `
    <h1 class="text-4xl font-bold text-white md:col-span-2 lg:col-span-3 xl:col-span-4 px-4 pb-4 -mt-6 hidden md:block">
      درخواست های مشاوره
    </h1>

    @for (item of consultations(); track $index) {
      <div class="flex flex-col gap-2 p-4 rounded-xl bg-base-100 md:shadow border border-base-300 md:border-0">
        <div class="flex flex-nowrap items-center justify-between">
          <span class="text-base-content/70 text-sm">نام</span>
          <strong>{{item.name}}</strong>
        </div>
        <div class="flex flex-nowrap items-center justify-between">
          <span class="text-base-content/70 text-sm">شماره موبایل</span>
          <a class="hover:text-primary" href="tel://{{item.phone}}"><strong>{{item.phone}}</strong></a>
        </div>
        <div class="flex flex-nowrap items-center justify-between">
          <span class="text-base-content/70 text-sm">تاریخ ثبت</span>
          <strong>{{item.createdAt | date}}</strong>
        </div>

        <span class="text-base-content/70 text-sm mt-2">پیام</span>
        <p>
          {{item.message}}
        </p>
      </div>
    }
  `,
  host: {
    class: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 md:p-0'
  }
})
export class Consultation {
  public consultations = signal<any[]>([]);

  private http = inject(Http);

  ngOnInit() {
    this.fetchConsulations();
  }

  private async fetchConsulations() {
    try {
      const result = await this.http.request({
        method: 'GET',
        path: '/api/v1/consultation',
        auth: true
      });

      if (result.body.ok) {
        this.consultations.set(result.body.consultations);
      }
    } catch (error) {
      //
    }
  }
}
