import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Http } from '../../../services/http';
import { Toast } from '../../../services/toast';

@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" class="grid grid-cols-2 gap-4">
      <strong>تعریف کاربر</strong>

      <fieldset class="fieldset col-span-2">
        <legend class="fieldset-legend">
          نام کامل
          <sup class="text-error">اجباری</sup>
        </legend>

        <input formControlName="name" type="text" class="input w-full focus:input-primary" />
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          شماره موبایل
          <sup class="text-error">اجباری</sup>
        </legend>

        <input formControlName="phone" type="tel" class="input w-full focus:input-primary" />
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          کد ملی
          <sup class="text-error">اجباری</sup>
        </legend>
        <input formControlName="national_id" type="tel" class="input w-full focus:input-primary" />
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          هویت
          <sup class="text-error">اجباری</sup>
        </legend>
        <select formControlName="type" class="select w-full focus:select-primary focus-within:select-primary">
          <option value="admin">مدیر</option>
          <option value="user">حقیقی</option>
          <option value="company">حقوقی</option>
        </select>
      </fieldset>
    </form>
    
    <div class="flex flex-nowrap items-center justify-end gap-2 col-span-2 bg-base-200 mt-auto md:mt-4 -mx-4 -mb-4 p-2 inset-shadow-sm">
      <button [disabled]="form.disabled" (click)="close()" type="button" class="btn btn-ghost">
        لغو
      </button>
      <button [disabled]="form.disabled" (click)="submit()" class="btn btn-primary">
        ثبت
      </button>
    </div>
  `,
  host: {
    class: 'flex flex-col h-full'
  }
})
export class User {
  private ref = inject(DialogRef);
  private data = inject(DIALOG_DATA);
  private http = inject(Http);
  private toast = inject(Toast);

  public form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^09\d{9}$/)]),
    type: new FormControl('user', [Validators.required]),
    national_id: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    if (this.data) {
      this.form.patchValue(this.data);
    }
  }

  public close(result: boolean = false) {
    this.ref.close(result);
  }

  public submit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.form.disable();

      if (this.data?.id) {
        this.update();
      } else {
        this.create();
      }
    }
  }

  private async create() {
    try {
      const result = await this.http.request({
        method: 'POST',
        path: '/api/v1/user',
        auth: true,
        data: this.form.value,
      });

      this.toast.make(result.body.code, result.body.ok ? 'success' : 'error');

      if (result.body.ok) {
        this.close(true);
      }
    } catch (error) {
      //
    } finally {
      this.form.enable();
    }
  }

  private async update() {
    try {
      const result = await this.http.request({
        method: 'POST',
        path: `/api/v1/user/${this.data.id}`,
        auth: true,
        data: this.form.value,
      });

      this.toast.make(result.body.code, result.body.ok ? 'success' : 'error');

      if (result.body.ok) {
        this.close(true);
      }
    } catch (error) {
      //
    } finally {
      this.form.enable();
    }
  }
}
