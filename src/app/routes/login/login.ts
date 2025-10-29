import { NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgOptimizedImage, RouterLink],
  template: `
      <div class="flex flex-nowrap items-center gap-2 p-4 absolute top-2 md:top-4 right-2 md:right-4">
        <a routerLink="/" class="btn btn-primary btn-ghost btn-circle">
          <i class="material-icons-round">arrow_forward</i>
        </a>

        <strong class="text-sm">بازگشت به سایت</strong>
      </div>

      <section class="flex flex-col items-center justify-center gap-4 h-full w-full max-w-sm p-8">
        <div class="w-full flex flex-col items-center text-center gap-4 -mt-10 mb-10">
          <a routerLink="/" class="">
            <img ngSrc="/images/logo.png" alt="Cathub Logo" width="56" height="56" class="w-[56px] min-w-[56px] h-[56px]" />
          </a>

          <div class="flex flex-col items-center text-center gap-2 grow">
            <strong class="text-lg">ورود به پورتال مشتریان</strong>
            <p class="text-base-content/70 text-sm">
              {{step() == 0 ? 'برای دسترسی به خدمات ما با شماره موبایل وارد شوید' : 'کد تایید ارسال شده به ' + phone() + ' را وارد کنید'}}
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-2 w-full h-[200px]">

        <!-- two step login -->
          @if (step() === 0) {
            <!-- Phone number step -->
            <fieldset class="fieldset w-full">
              <legend class="fieldset-legend">
                شماره موبایل
              </legend>

              <input 
                type="tel" 
                [(ngModel)]="phone"
                (keyup.enter)="step.set(1)"
                placeholder="09123456789"
                class="input focus:input-primary w-full"
                dir="ltr"
              >
            </fieldset>
            <button 
              class="btn btn-primary w-full"
              (click)="step.set(1)"
              [disabled]="!phone()"
            >
              ارسال کد تایید
            </button>
          } @else {
            <!-- Verification code step -->
            <fieldset class="fieldset w-full">
              <legend class="fieldset-legend">
                کد تایید
              </legend>

              <input 
                type="text" 
                [(ngModel)]="code"
                placeholder="کد ۴ رقمی را وارد کنید"
                class="input focus:input-primary w-full placeholder:text-right"
                dir="ltr"
                maxlength="4"
              >
            </fieldset>

            <div class="flex flex-col gap-2 w-full">
              <button 
                class="btn btn-primary w-full"
                [disabled]="!code() || code().length < 4"
                (click)="submit()"
              >
                تایید و ورود
              </button>
              
              <button 
                class="btn btn-ghost w-full"
                (click)="step.set(0)"
              >
                تغییر شماره موبایل
              </button>
            </div>
          }
        </div>
      </section>
  `,
  host: {
    class: 'flex flex-col items-center justify-center w-screen h-dvh overflow-hidden'
  }
})
export class Login {
  public phone = signal('');
  public code = signal('');
  public step = signal(0);

  private router = inject(Router);

  public submit() {
    this.router.navigate(['/panel'])
  }
}
