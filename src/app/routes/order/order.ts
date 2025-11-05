import { Component, inject, signal } from '@angular/core';
import { FormOrder } from '../../components/form-order';
import { Http } from '../../services/http';
import { Toast } from '../../services/toast';
import { User } from '../../services/user';

@Component({
  selector: 'app-order',
  imports: [FormOrder],
  template: `
    <h1 class="font-bold text-2xl">فرم درخواست ثبت سفارش</h1>
    <p class="text-base-content/70">کاربر گرامی, از طریق فرم زیر می‌توانید نسبت به ثبت درخواست سرویس اقدام نمایید.</p>

    <app-form-order 
      class="border border-base-content/20 rounded-xl p-6 md:p-10 my-10"
      (submit)="submit($event)" 
      [disabled]="disabled()" 
      [value]="value()" 
    />
  `,
  host: {
    class: 'flex flex-col gap-2 container mx-auto p-6 md:p-10'
  }
})
export class Order {
  private user = inject(User);
  private http = inject(Http);
  private toast = inject(Toast);

  public disabled = signal(false);
  public value = signal({});

  ngOnInit() {
    this.setFormFromProfile();
  }

  private setFormFromProfile() {
    if (this.user.authed()) {
      const profile = this.user.profile()!;

      let value: any = {
        phone: profile.phone,
      };


      if (profile.type == 'user') {
        value['firstname'] = profile.name;
        value['national_id'] = profile.national_id;
      }

      if (profile.type == 'company') {
        value['company_name'] = profile.name;
        value['company_register_number'] = profile.national_id;
        value['company'] = true;
      }

      this.value.set(value);
    }
  }


  public async submit(value: any) {
    try {
      this.disabled.set(true);

      const result = await this.http.request({
        method: 'POST',
        path: '/api/v1/order',
        auth: true,
        data: this.value,
      });

      this.toast.make(result.body.code, result.body.ok ? 'success' : 'error');

      if (result.body.ok) {
        this.value.set({});
      }


    } catch (error) {
      //
    } finally {
      this.disabled.set(false);
    }
  }
}
