import { isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { IUser } from '../../interfaces/user';
import { Http } from './http';

@Injectable({
  providedIn: 'root'
})
export class User {
  public profile = signal<IUser | undefined>(undefined);

  public authed = computed(() => this.profile() != undefined);
  public admin = computed(() => this.profile()?.type === 'admin');

  private http = inject(Http);
  private platformId = inject(PLATFORM_ID);

  public async whoami() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    if (window.localStorage.getItem('#cathub/token') == null) {
      return
    }

    try {
      const result = await this.http.request({
        method: 'GET',
        path: '/api/v1/auth/me',
        auth: true,
      });

      if (result.body.ok) {
        this.profile.set(result.body.user);
      }
    } catch (error) {
      //
    }
  }

  public logout() {
    this.profile.set(undefined);
    window.localStorage.removeItem('#cathub/token');
  }
}