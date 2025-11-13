import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Http } from '../../../services/http';
import { Toast } from '../../../services/toast';
import { User } from '../../../services/user';

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
        <select formControlName="department" class="select mirza-select w-full focus:select-primary focus-within:select-primary">
          <option value="sales">فروش</option>
          <option value="support">پشتیبانی</option>
          <option value="technical">فنی</option>
        </select>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">اولویت</legend>
        <select formControlName="priority" class="select mirza-select w-full focus:select-primary focus-within:select-primary">
          <option value="low">کم</option>
          <option value="medium">متوسط</option>
          <option value="high">بالا</option>
        </select>
      </fieldset>

      @if (user.admin()) {
        <fieldset class="fieldset col-span-2">
          <legend class="fieldset-legend">
            کاربر
            <sup class="text-error">اجباری</sup>
          </legend>
          <select formControlName="user_id" class="select mirza-select-[53%] w-full focus:select-primary focus-within:select-primary">
            <option value="">انتخاب کاربر</option>
            @for (user of users(); track user.id) {
              <option [value]="user.id">{{ user.name }}</option>
            }
          </select>
        </fieldset>
      }
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
  private http = inject(Http);
  private toast = inject(Toast);
  public user = inject(User);

  public users = signal<any[]>([]);

  public form = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.min(3)]),
    department: new FormControl('', [Validators.required]),
    priority: new FormControl('medium'),
    user_id: new FormControl<string | undefined>(undefined, [])
  });

  ngOnInit() {
    if (this.user.admin()) {
      this.fetchAllUsers();
      this.form.get('user_id')!.setValue("");
      this.form.get('user_id')!.setValidators([Validators.required]);
    }
  }

  private async fetchAllUsers() {
    try {
      const result = await this.http.request({
        method: 'GET',
        path: '/api/v1/user',
        auth: true
      });


      if (result.body.ok) {
        const users = result.body.users.filter((user: any) => user.type != 'admin').map((user: any) => ({
          id: user.id,
          name: user.name,
          type: user.type
        }));

        this.users.set(users);
      }
    } catch (error) {
      //
    }
  }

  public async submit() {
    this.form.markAllAsTouched();

    if (this.form.valid) {
      try {
        this.form.disable();

        const result = await this.http.request({
          method: 'POST',
          path: '/api/v1/ticket',
          data: this.form.value,
          auth: true
        });

        this.toast.make(result.body.code, result.body.ok ? 'success' : 'error');


        if (result.body.ok) {
          this.ref.close(result.body.ticket);
        }
      } catch (error) {
        //
      } finally {
        this.form.enable();
      }


    }
  }

  public close() {
    this.ref.close();
  }
}
