import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SectionApplicationCategories } from "./section-application-categories";
import { SectionFaq } from '../../components/section-faq';
import { HomeBadges } from '../home/home-badges';
import { SectionHero } from './section-hero';
import json from './service-dynamic.json';

@Component({
  selector: 'app-service-dynamic',
  imports: [RouterLink, SectionFaq, HomeBadges, SectionApplicationCategories, SectionHero],
  template: `
    <section class="flex flex-col items-center justify-center text-center gap-2 px-4 pt-10 -mb-20">
      <h1 class="text-3xl font-bold">{{heroTitle()}}</h1>
      <p class="text-lg leading-8 text-base-content/70">
        {{heroSubtitle()}}
      </p>

      <div class="flex flex-wrap gap-2 mt-4">
        <a routerLink="/order" class="btn btn-primary rounded-full">
          ثبت درخواست
        </a>
        <a routerLink="/consultation" class="btn btn-primary rounded-full btn-outline">
          درخواست مشاوره
        </a>
      </div>
    </section>

    <app-section-hero />

    <app-section-application-categories />

    <app-section-faq [items]="faqItems()" [category]="faqCategory()" />
  
    <app-home-badges class="px-6 md:px-10 mb-10" />
  `,
  host: {
    class: 'flex flex-col gap-32 container mx-auto'
  }
})
export class ServiceDynamic {
  private activatedRoute = inject(ActivatedRoute);

  public heroTitle = signal('');
  public heroSubtitle = signal('');

  public faqCategory = signal('');
  public faqItems = signal<Array<{ question: string; answer: string }>>([]);

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const category = params['category'] as keyof typeof json;
      const value = json[category];

      this.heroTitle.set(value['hero']['title']);
      this.heroSubtitle.set(value['hero']['subtitle']);

      this.faqCategory.set(value['faq']['category']);
      this.faqItems.set(value['faq']['items']);
    });
  }
}
