import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-order',
  imports: [ReactiveFormsModule],
  template: `
    <h1 class="font-bold text-2xl">فرم درخواست ثبت سفارش</h1>
    <p class="text-base-content/70">کاربر گرامی, از طریق فرم زیر می‌توانید نسبت به ثبت درخواست سرویس اقدام نمایید.</p>

    <form [formGroup]="form" class="md:grid md:grid-cols-2 gap-4 border border-base-content/20 rounded-xl p-6 md:p-10 my-10">
      <div class="flex flex-col gap-2 col-span-2">
        <span class="mb-2">حقیقی / حقوقی <sup class="text-error text-[10px] font-bold">ضروری</sup></span>

        <label class="flex flex-nowrap items-center gap-4 cursor-pointer">
          <input [checked]="!isCompany" (change)="setCompany(false)" type="radio" class="radio radio-sm checked:radio-primary" />
          <span>ثبت درخواست حقیقی</span>
        </label>

        <label class="flex flex-nowrap items-center gap-4 cursor-pointer">
          <input [checked]="isCompany" (change)="setCompany(true)" type="radio" class="radio radio-sm checked:radio-primary" />
          <span>ثبت درخواست حقوقی</span>
        </label>
      </div>

      <span class="label text-sm col-span-2 font-bold mt-4">اطلاعات فردی</span>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          نام <sup class="text-error">ضروری</sup>
        </legend>
        <input formControlName="firstname" type="text" class="input focus:input-primary w-full" />
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          نام خانوادگی
        </legend>
        <input formControlName="lastname" type="text" class="input focus:input-primary w-full" />
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          شماره موبایل <sup class="text-error">ضروری</sup>
        </legend>
        <input formControlName="phone" type="tel" class="input focus:input-primary w-full" />
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          کد ملی <sup class="text-error">ضروری</sup>
        </legend>
        <input formControlName="national_id" type="tel" class="input focus:input-primary w-full" />
      </fieldset>

      <fieldset class="fieldset col-span-2">
        <legend class="fieldset-legend">
          ایمیل <sup class="text-error">ضروری</sup>
        </legend>
        <input formControlName="email" type="email" class="input focus:input-primary w-full" />
      </fieldset>

      <span class="label text-sm col-span-2 font-bold mt-4">اطلاعات پستی</span>

      <fieldset class="fieldset col-span-2">
        <legend class="fieldset-legend">
          آدرس <sup class="text-error">ضروری</sup>
        </legend>
        <input formControlName="address" type="text" class="input focus:input-primary w-full" />
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          استان <sup class="text-error">ضروری</sup>
        </legend>
        <input formControlName="province" type="text" class="input focus:input-primary w-full" />
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          شهر <sup class="text-error">ضروری</sup>
        </legend>
        <input formControlName="city" type="text" class="input focus:input-primary w-full" />
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          کد پستی
        </legend>
        <input formControlName="postal_code" type="text" class="input focus:input-primary w-full" />
      </fieldset>

      @if(isCompany) {
        <span class="label text-sm col-span-2 font-bold mt-4">اطلاعات شرکت</span>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">
            نام شرکت <sup class="text-error">ضروری</sup>
          </legend>
          <input formControlName="company_name" type="text" class="input focus:input-primary w-full" />
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">
            تلفن شرکت <sup class="text-error">ضروری</sup>
          </legend>
          <input formControlName="company_phone" type="tel" class="input focus:input-primary w-full" />
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">
            شماره ثبت شرکت <sup class="text-error">ضروری</sup>
          </legend>
          <input formControlName="company_register_number" type="text" class="input focus:input-primary w-full" />
        </fieldset>

        <fieldset class="fieldset">
          <legend class="fieldset-legend">
            کد اقتصادی <sup class="text-error">ضروری</sup>
          </legend>
          <input formControlName="company_economic_code" type="text" class="input focus:input-primary w-full" />
        </fieldset>
      }

      <span class="label text-sm col-span-2 font-bold mt-4">اطلاعات سرویس</span>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          دسته‌بندی سرویس <sup class="text-error">ضروری</sup>
        </legend>
        <select formControlName="service_category" class="select focus:select-primary focus-within:select-primary w-full">
          <option value="">انتخاب کنید</option>
          @for (item of services; track $index) {
            <option value="{{item.value}}">{{item.value}}</option>
          }
        </select>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          زیرمجموعه سرویس <sup class="text-error">ضروری</sup>
        </legend>
        <select formControlName="service_subcategory" class="select focus:select-primary focus-within:select-primary w-full">
          <option value="">
            {{form.get('service_category')!.value ? 'انتخاب کنید' : 'دسته بندی سرویس را انتخاب کنید'}}
          </option>
          @for (item of subservices; track $index) {
            <option value="{{item}}">{{item}}</option>
          }
        </select>
      </fieldset>

      <fieldset class="fieldset col-span-2">
        <legend class="fieldset-legend">
          توضیحات سرویس <sup class="text-error">ضروری</sup>
        </legend>
        <textarea formControlName="service_description" rows="4" class="textarea focus:textarea-primary w-full" placeholder="لطفا توضیحات کاملی از سرویس مورد نیاز خود ارائه دهید..."></textarea>
      </fieldset>


      <div class="col-span-2 mt-4 flex flex-nowrap items-center gap-1 font-bold">
        <span class="label text-sm">تایید اطلاعات</span>
        <sup class="text-error text-[10px]">ضروری</sup>
      </div>

      <label class="flex flex-nowrap items-center gap-4 cursor-pointer col-span-2">
        <input formControlName="confirm" type="checkbox" class="checkbox checked:checkbox-primary" />
        <span class="text-sm md:text-base">اینجانب صحت اطلاعات وارد شده در این فرم را تایید می‌نمایم.</span>
      </label>

      <button class="btn btn-primary mt-8 md:mt-2 w-fit">
        ثبت درخواست
      </button>
    </form>
  `,
  host: {
    class: 'flex flex-col gap-2 container mx-auto p-6 md:p-10'
  }
})
export class Order {
  public services: any[] = [
    {
      value: 'چت اختصاصی',
      values: [
        'سازمان ها',
        'استارتاپ ها',
        'تیم های پشتیبانی',
        'شبکه های اجتماعی',
      ],
    }
  ];

  public get subservices(): any[] {
    const category = this.form.get('service_category')!.value;
    const service = this.services.find(s => s.value === category);
    return service ? service.values : [];
  }

  public get isCompany(): boolean {
    return this.form.get('company')!.value ?? false;
  }

  public form = new FormGroup({
    company: new FormControl<boolean>(false),
    firstname: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    lastname: new FormControl<string>('', []),
    phone: new FormControl<string>('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
    national_id: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    address: new FormControl<string>('', [Validators.required]),
    province: new FormControl<string>('', [Validators.required]),
    city: new FormControl<string>('', [Validators.required]),
    postal_code: new FormControl<string>('', []),
    company_name: new FormControl<string>('', []),
    company_phone: new FormControl<string>('', []),
    company_register_number: new FormControl<string>('', []),
    company_economic_code: new FormControl<string>('', []),
    service_category: new FormControl<string>('', [Validators.required]),
    service_subcategory: new FormControl<string>('', [Validators.required]),
    service_description: new FormControl<string>('', [Validators.required]),
    confirm: new FormControl<boolean>(false, [Validators.required]),
  });

  public setCompany(value: boolean) {
    // if company is selected, company_* validators to required
    this.form.get('company')!.setValue(value);
    this.form.get('company_name')!.setValidators(value ? [Validators.required] : []);
    this.form.get('company_phone')!.setValidators(value ? [Validators.required] : []);
    this.form.get('company_register_number')!.setValidators(value ? [Validators.required] : []);
    this.form.get('company_economic_code')!.setValidators(value ? [Validators.required] : []);
  }
}
