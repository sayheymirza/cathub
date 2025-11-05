import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Http } from '../../services/http';
import { Toast } from '../../services/toast';
import { HomeSolutions } from '../home/home-solutions';

@Component({
  selector: 'app-consultation',
  imports: [HomeSolutions, ReactiveFormsModule],
  template: `
    <section class="w-full h-96 gap-2 bg-tiles relative">
      <div class="absolute inset-0 bg-radial-[at_50%_75%] from-transparent from-40% to-base-100 z-0"></div>

      <div class="flex flex-col items-center justify-center z-1 w-full h-full relative">
        <p class="text-base-content/70 mb-4 text-sm md:text-base">
          نیاز به مشاوره دارید؟ با ما تماس بگیرید.
        </p>
        <h2 class="text-4xl md:text-6xl font-bold h-24 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">درخواست مشاوره</h2>
      </div>
    </section>

    <form [formGroup]="form" class="bg-base-100 md:border border-base-content/5 md:rounded-xl md:shadow-2xl -mt-24 mb-24 p-8 md:grid md:grid-cols-2 gap-4 w-full max-w-2xl mx-auto z-1">
      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          نام و نام خانوادگی  <sup class="text-error">ضروری</sup>
        </legend>
        <input formControlName="name" type="text" class="input focus:input-primary w-full" />
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          شماره موبایل <sup class="text-error">ضروری</sup>
        </legend>
        <input formControlName="phone" type="tel" class="input focus:input-primary w-full" />
      </fieldset>

      <fieldset class="fieldset col-span-2">
        <legend class="fieldset-legend">
          پیام
        </legend>
        <textarea formControlName="message" rows="4" class="textarea focus:textarea-primary w-full" placeholder="توضیحات کاملی از نیاز خود ارائه دهید..."></textarea>
      </fieldset>

      <button (click)="submit()" [disabled]="form.disabled" class="btn btn-primary w-fit col-start-2 mr-auto">
        ارسال درخواست
      </button>
    </form>

    <app-home-solutions />
  `,
  host: {
    class: 'flex flex-col container mx-auto'
  },
  styles: `
    .bg-tiles {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='50' height='50' fill='none' stroke='rgb(0 0 0 / 0.04)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
    }
  `
})
export class Consultation {
  private http = inject(Http);
  private toast = inject(Toast);

  public form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  public async submit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      try {
        this.form.disable();

        const result = await this.http.request({
          method: 'POST',
          path: '/api/v1/consultation',
          auth: true,
          data: this.form.value
        });

        this.toast.make(result.body.code, result.body.ok ? 'success' : 'error');

        if (result.body.ok) {
          this.form.reset();
        }

      } catch (error) {
        //
      } finally {
        this.form.enable();
      }
    }
  }
}
