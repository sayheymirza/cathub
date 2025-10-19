import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from '../components/footer';
import { Header } from '../components/header';

@Component({
  selector: 'app-site',
  imports: [RouterOutlet, Header, Footer],
  template: `
    <app-header />
    <main class="min-h-screen">
      <router-outlet />
    </main>
    <app-footer />
  `,
})
export class Site {

}
