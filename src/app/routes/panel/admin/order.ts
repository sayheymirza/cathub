import { Component, inject, signal } from '@angular/core';
import { Http } from '../../../services/http';
import { DatePipe } from '../../../pipes/date';
import { FormOrder } from "../../../components/form-order";

@Component({
  selector: 'app-order',
  imports: [DatePipe, FormOrder],
  template: `
    <h1 class="text-4xl font-bold text-white md:col-span-2 lg:col-span-3 xl:col-span-4 px-4 pb-4 -mt-6 hidden md:block">
      سفارش ها
    </h1>

    @for (item of orders(); track $index) {
      <details class="collapse collapse-arrow bg-base-100 md:shadow md:open:shadow-lg border border-base-300 md:border-0">
        <summary class="collapse-title flex flex-nowrap items-center gap-4">
          <strong>سفارش {{item.id}}</strong>  <span class="badge badge-soft">{{item.createdAt | date}}</span>
        </summary>
        <div class="collapse-content border-t border-base-content/20">
          <app-form-order [readonly]="true" [value]="item" class=" pointer-events-none p-4"/>
        </div>
      </details>
    }
  `,
  host: {
    class: 'flex flex-col gap-2 p-4 md:p-0'
  }
})
export class Order {
  public orders = signal<any[]>([]);

  private http = inject(Http);

  ngOnInit() {
    this.fetchConsulations();
  }

  private async fetchConsulations() {
    try {
      const result = await this.http.request({
        method: 'GET',
        path: '/api/v1/order',
        auth: true
      });

      if (result.body.ok) {
        this.orders.set(result.body.orders);
      }
    } catch (error) {
      //
    }
  }
}
