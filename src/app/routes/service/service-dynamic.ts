import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionAi } from "../../components/section-ai";
import { SectionBadges } from '../../components/section-badges';
import { SectionFaq } from '../../components/section-faq';
import { SectionApplicationCategories } from "./section-application-categories";
import { SectionHero } from './section-hero';
import { SectionSolution } from "./section-solution";
import json from './service-dynamic.json';

@Component({
  selector: 'app-service-dynamic',
  imports: [SectionFaq, SectionBadges, SectionApplicationCategories, SectionHero, SectionSolution, SectionAi],
  template: `

    <app-section-hero [title]="heroTitle()" [subtitle]="heroSubtitle()" />

    <app-section-solution 
      [title]="solutionTitle()"
      [description]="solutionDescription()"
      [items]="solutionItems()"
    />

    <app-section-ai />

    <app-section-application-categories />

    <app-section-faq [items]="faqItems()" [category]="faqCategory()" />
  
    <app-section-badges class="px-6 md:px-10 mb-10" />
  `,
  host: {
    class: 'flex flex-col gap-32 container mx-auto'
  }
})
export class ServiceDynamic {
  private activatedRoute = inject(ActivatedRoute);

  public solutionTitle = signal('');
  public solutionDescription = signal('');
  public solutionItems = signal<Array<any>>([]);

  public heroTitle = signal('');
  public heroSubtitle = signal('');

  public faqCategory = signal('');
  public faqItems = signal<Array<{ question: string; answer: string }>>([]);

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const category = params['category'] as keyof typeof json;
      const value = json[category];

      this.solutionTitle.set(value['solution']['title']);
      this.solutionDescription.set(value['solution']['description']);
      this.solutionItems.set(value['solution']['items'] || []);

      this.heroTitle.set(value['hero']['title']);
      this.heroSubtitle.set(value['hero']['subtitle']);

      this.faqCategory.set(value['faq']['category']);
      this.faqItems.set(value['faq']['items']);
    });
  }
}
