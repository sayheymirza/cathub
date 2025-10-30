import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" class="grid grid-cols-2 gap-4">
      <strong>تعریف تیکت</strong>

      <fieldset class="fieldset col-span-2">
        <legend class="fieldset-legend">
          عنوان تیکت
          <sup class="text-error">اجباری</sup>
        </legend>
        <input formControlName="title" type="text" class="input w-full focus:input-primary" />
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          دپارتمان
          <sup class="text-error">اجباری</sup>
        </legend>
        <select formControlName="department" class="select w-full focus:select-primary focus-within:select-primary">
          <option value="sales">فروش</option>
          <option value="support">پشتیبانی</option>
          <option value="billing">صورتحساب</option>
        </select>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">اولویت</legend>
        <select formControlName="priority" class="select w-full focus:select-primary focus-within:select-primary">
          <option value="low">کم</option>
          <option value="medium">متوسط</option>
          <option value="high">زیاد</option>
        </select>
      </fieldset>
    </form>
    
    <div class="flex flex-nowrap items-center justify-end gap-2 col-span-2 bg-base-200 mt-auto md:mt-4 -mx-4 -mb-4 p-2 inset-shadow-sm">
      <button [disabled]="form.disabled" (click)="close()" type="button" class="btn btn-ghost">
        لغو
      </button>
      <button [disabled]="form.disabled" (click)="submit()" class="btn btn-primary">
        ایجاد
      </button>
    </div>
  `,
  host: {
    class: 'flex flex-col h-full'
  }
})
export class Ticket {
  private ref = inject(DialogRef);

  public form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.min(3)]),
    department: new FormControl('', [Validators.required]),
    priority: new FormControl('medium'),
  });

  public submit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      this.form.disable();

      setTimeout(() => {
        this.close()
      }, 2000);
    }
  }

  public close() {
    this.ref.close();
  }
}
