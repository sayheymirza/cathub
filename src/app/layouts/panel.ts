import { NgClass, NgOptimizedImage } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { User } from '../services/user';

@Component({
  selector: 'app-panel',
  imports: [RouterOutlet, RouterLink, NgOptimizedImage, NgClass],
  template: `
    <nav 
      [ngClass]="{
        'md:text-white border-transparent': !sticky(),
        'bg-white/40 border-base-content/10': sticky(),
      }"
      class="backdrop-blur transition-all h-16 fixed top-0 left-0 w-full z-50 border-b">
      <div class="flex flex-nowrap items-center h-full px-4 container mx-auto">
        <div class="md:hidden">
          <button class="btn btn-square btn-ghost">
            <i class="material-icons-round">menu</i>
          </button>
        </div>

        <a routerLink="/" class="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 mx-auto md:mx-0 md:w-36">
          <img ngSrc="/images/logo.png" alt="Cathub Logo" width="56" height="56" class="w-[32px] h-[32px transition-all" />
          <strong class="text-base sm:text-lg md:text-xl hidden md:block">کت هاب</strong>
        </a>

        <div class="hidden md:flex flex-nowrap items-center mx-auto">
          <a routerLink="/panel" class="btn btn-ghost m-1">
            <span>پیشخان</span>
          </a>
            
          @if(user.profile()?.type == 'admin') {
            <div class="dropdown dropdown-hover">
              <div tabindex="0" role="button" class="btn btn-ghost mb-1">
                <span>مدیریت</span>
                <i class="material-icons-round">arrow_drop_down</i>
              </div>
              <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm text-base-content">
                <li><a routerLink="/panel/users">کاربر ها</a></li>
                <li><a routerLink="/panel/orders">سفارش ها</a></li>
                <li><a routerLink="/panel/consultations">درخواست های مشاوره</a></li>
              </ul>
            </div>
          }
        </div>

        <a routerLink="/consultation" class="btn btn-outline rounded-full hidden md:flex hover:text-primary">
          درخواست مشاوره
        </a>
        
        @if(user.authed()) {
          <div class="mx-1"></div>

          <div class="dropdown dropdown-end dropdown-hover">
            <div tabindex="0" role="button" class="btn btn-circle btn-ghost mb-1">
              <i class="material-icons-round">notifications</i>
            </div>
            
            <ul tabindex="-1" class="dropdown-content menu bg-base-100 text-base-content rounded-box z-1 w-64 p-4 shadow-sm">
              <div class="flex flex-col items-center justify-center gap-8 p-10">
                <i class="material-icons-round scale-200">notifications_off</i>
                <strong>شما هیچ پیامی ندارید</strong>
              </div>
            </ul>
          </div>
            
            <div class="mx-1"></div>
            
            <div class="dropdown dropdown-end dropdown-hover">
              <div tabindex="0" role="button" class="btn btn-circle text-secondary mb-1">
                <i class="material-icons-round">person</i>
          </div>

          <ul tabindex="-1" class="dropdown-content menu bg-base-100 text-base-content rounded-box z-1 w-64 p-2 shadow-sm">
            <div class="flex flex-col gap-1 pt-2 px-2">
              <strong>
                {{user.profile()?.name}}
              </strong>
              <span class="text-xs text-base-content/70">
                {{user.profile()?.phone}}
              </span>
            </div>
            
            <div class="divider my-0 -mx-2"></div>
            
            <li (click)="logout()">
              <a>
                <i class="material-icons-round scale-75">logout</i>
                <span class="text-xs">خروج از حساب کاربری</span>
              </a>
            </li>
          </ul>
        </div>
        
      }
      </div>
    </nav>

    <section class="w-full h-64 bg-gradient-to-b from-secondary to-primary hidden md:block"></section>
    
    <section class="container h-full mx-auto flex flex-col grow md:mb-16 mt-16 md:-mt-24">
      @if(user.authed()){
        <router-outlet></router-outlet>
      }
    </section>
  `,
  host: {
    class: 'flex flex-col h-full min-h-screen bg-base-100 md:bg-base-200',
  }
})
export class Panel {
  public sticky = signal(false);

  public user = inject(User);
  private router = inject(Router);

  // listen to window and when sticked to top, change some classes for navbar
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const target = event.target as Document;
    const scrollTop = target.scrollingElement?.scrollTop || 0;

    if (scrollTop >= 40) {
      this.sticky.set(true);
    } else {
      this.sticky.set(false);
    }
  }

  public logout() {
    if (confirm('خروج از حساب کاربری ؟ ')) {
      this.user.logout();
      this.router.navigate(['/'], { replaceUrl: true });
    }
  }
}
