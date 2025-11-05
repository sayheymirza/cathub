import { isPlatformBrowser, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, PLATFORM_ID, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ArcaptchaAngularComponent, ArcaptchaAngularModule } from 'arcaptcha-angular';
import { Http } from '../../services/http';
import { User } from '../../services/user';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgOptimizedImage, RouterLink, ArcaptchaAngularModule],
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
                [class.input-error]="error() != ''"
                [disabled]="disabled()"
                [(ngModel)]="phone"
                (keyup.enter)="submit()"
                placeholder="09"
                class="input focus:input-primary w-full"
                dir="ltr"
                maxlength="11"
              >
              <p class="label text-error">
                {{error()}}
              </p>
            </fieldset>
            <button 
              class="btn btn-primary w-full"
              (click)="submit()"
              [disabled]="!phone() || phone().length != 11 || disabled()"
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
                type="tel"
                [class.input-error]="error() != ''"
                [disabled]="disabled()"
                [(ngModel)]="code"
                (keyup.enter)="submit()"
                placeholder="کد {{length()}} رقمی را وارد کنید"
                class="input focus:input-primary w-full placeholder:text-right"
                dir="ltr"
                maxlength="{{length()}}"
              >
              <p class="label text-error">
                {{error()}}
              </p>
            </fieldset>

            
            <div class="flex flex-col gap-2 w-full">
              <div class="flex flex-nowrap items-center justify-between">
                @if(!canRerequest()) {
                  <p class="px-2 text-base-content/70 text-sm">
                    <span dir="ltr" class="countdown">
                      <span class="text-center w-4" style="--value:{{timeMinute()}}; --digits: 2;" aria-live="polite" aria-label="{{timeMinute()}}">{{timeMinute()}}</span>
                      :
                    <span class="text-center w-4" style="--value:{{timeSecond()}}; --digits: 2;" aria-live="polite" aria-label="{{timeSecond()}}">{{timeSecond()}}</span>
                  </span>
                  
                  تا ارسال مجدد
                </p>
              } @else {
                <p class="px-2 text-base-content/70 text-sm">
                  کد تایید را دریافت نکردید ؟
                </p>
              }
                
                <button class="btn btn-ghost text-primary btn-sm" [disabled]="!canRerequest() || disabled()" (click)="request()">
                  ارسال مجدد
                </button>
              </div>

              <button 
                class="btn btn-primary w-full"
                [disabled]="!code() || code().length < length() || disabled()"
                (click)="submit()"
              >
                تایید و ورود
              </button>
              
              <button 
                class="btn btn-ghost w-full text-primary"
                (click)="error.set(''); step.set(0)"
              >
                تغییر شماره موبایل
              </button>
            </div>
          }
        </div>
      </section>

      <lib-arcaptcha-angular #arcaptcha site_key="2o8d1er3eg" api_url="/arcaptcha.js" [invisible]="true" /> 
  `,
  host: {
    class: 'flex flex-col items-center justify-center w-screen h-dvh overflow-hidden'
  }
})
export class Login {
  public phone = signal('');
  public code = signal('');
  public step = signal(0);
  public disabled = signal(false);
  public time = signal('00:00');
  public length = signal(4);
  public error = signal('');

  public timeMinute = computed(() => {
    return parseInt(this.time().split(':')[0]);
  });

  public timeSecond = computed(() => {
    return parseInt(this.time().split(':')[1]);
  });

  public canRerequest = computed(() => {
    return this.time() == '00:00';
  });

  private router = inject(Router);
  private http = inject(Http);
  private user = inject(User);
  private platformId = inject(PLATFORM_ID);

  private arcaptcha = viewChild<ArcaptchaAngularComponent>('arcaptcha');

  private timerInterval: any = null;
  private captchaToken: string | null = null;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const token = window.localStorage.getItem('#cathub/token');
      if (token) {
        this.router.navigate(['/panel'], { replaceUrl: true });
        return;
      }

      const stored = window.localStorage.getItem('#cathub/auth');
      if (stored) {
        try {
          const authData = JSON.parse(stored);
          if (authData?.ok && authData?.result) {
            this.phone.set(authData.result.phone || '');
            this.length.set(authData.result.length || 4);

            if (authData.result.expired_at) {
              const now = Date.now();
              const expiredAt = new Date(authData.result.expired_at).getTime();
              const remainingSeconds = Math.max(0, Math.floor((expiredAt - now) / 1000));

              if (remainingSeconds > 0) {
                this.step.set(1);
                this.startTimer(remainingSeconds);

                if (authData.result.code) {
                  this.code.set(authData.result.code);
                }
              } else {
                window.localStorage.removeItem('#cathub/auth');
                this.step.set(0);
                this.code.set('');
              }
            }
          }
        } catch (error) {
          console.error('Failed to parse stored auth data:', error);
          window.localStorage.removeItem('#cathub/auth');
        }
      }
    }
  }

  public submit() {
    if (this.step() == 0) {
      this.request();
    } else if (this.step() == 1) {
      this.verify();
    }
  }


  /**
   * Start timer from seconds to 0 and format it as time
   * @param seconds 
   */
  private startTimer(seconds: number) {
    clearInterval(this.timerInterval);

    const format = () => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;

      this.time.set(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
    }

    format();

    this.timerInterval = setInterval(() => {
      if (seconds > 0) {
        seconds--;
        format();
      } else {
        clearInterval(this.timerInterval);
      }
    }, 1000);
  }

  public async request() {
    try {
      this.error.set('');

      if (!this.phone() || this.phone().length != 11 || this.phone().startsWith('09') == false) {
        this.error.set('شماره موبایل وارد شده معتبر نیست');
        return;
      }

      this.disabled.set(true)

      if (!this.captchaToken) {
        const token = await this.arcaptcha()!.execute();
        this.captchaToken = token.arcaptcha_token;
      }

      const result = await this.http.request({
        method: 'POST',
        path: '/api/v1/auth/request',
        data: {
          phone: this.phone(),
        },
        header: {
          'x-captcha': this.captchaToken
        }
      });


      if (result.body.ok) {
        this.startTimer(result.body.result.ttl);
        this.length.set(result.body.result.length);
        this.step.set(1);

        if (result.body.result.code) {
          this.code.set(result.body.result.code);
        }

        window.localStorage.setItem('#cathub/auth', JSON.stringify(result.body));
      }

      if (result.body.code == 'INVALID_CAPTCHA') {
        // reset captcha token
        this.captchaToken = null;
        this.arcaptcha()!.resetCaptcha();
        this.request();
      }

    } catch (error) {
      console.error(error);
    } finally {
      this.disabled.set(false);
    }
  }

  private async verify() {
    try {
      this.error.set('');

      if (!this.code() || this.code().length < this.length()) {
        this.error.set('کد تایید وارد شده معتبر نیست');
        return;
      }

      this.disabled.set(true);

      if (!this.captchaToken) {
        const token = await this.arcaptcha()!.execute();
        this.captchaToken = token.arcaptcha_token;
      }

      const result = await this.http.request({
        method: 'POST',
        path: '/api/v1/auth/verify',
        data: {
          phone: this.phone(),
          code: this.code(),
        },
        header: {
          'x-captcha': this.captchaToken,
        }
      });

      if (result.body.ok && result.body.token) {
        window.localStorage.setItem('#cathub/token', result.body.token);
        window.localStorage.removeItem('#cathub/auth');
        clearInterval(this.timerInterval);
        this.user.whoami();
        this.router.navigate(['/panel'], { replaceUrl: true });
      }

      if (!result.body.ok && result.body.code == 'INVALID_OTP') {
        this.error.set('کد تایید وارد شده اشتباه است');
      }

      if (result.body.code == 'INVALID_CAPTCHA') {
        // reset captcha token
        this.captchaToken = null;
        this.arcaptcha()!.resetCaptcha();
        this.verify();
      }

    } catch (error) {
      console.error(error);
    } finally {
      this.disabled.set(false);
    }

  }
}
