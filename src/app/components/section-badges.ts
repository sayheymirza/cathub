import { Component } from '@angular/core';

@Component({
  selector: 'app-section-badges',
  imports: [],
  template: `
    @for (item of badges; track $index) {
      <div class="flex flex-nowrap items-center gap-8">
        <i class="material-icons-round scale-200 bg-gradient-to-b from-primary to-secondary bg-clip-text text-transparent">{{item.icon}}</i>
      
        <div class="flex flex-col gap-1">
          <strong class="text-lg">{{item.title}}</strong>
          <p class="text-sm text-neutral-800">{{item.subtitle}}</p>
        </div>
      </div>
    }
  `,
  host: {
    class: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:py-4 gap-4'
  }
})
export class SectionBadges {
  public badges: any[] = [
    {
      icon: 'share_location',
      title: 'سرویس های پایدار',
      subtitle: 'در سراسر جهان بدون قطعی'
    },
    {
      icon: 'contact_support',
      title: 'پشتیبانی 24/7',
      subtitle: 'ما همیشه اینجا هستیم تا کمک کنیم'
    },
    {
      icon: 'security',
      title: 'امنیت بالا',
      subtitle: 'محافظت از داده های شما اولویت ماست'
    },
    {
      icon: 'speed',
      title: 'عملکرد سریع',
      subtitle: 'تجربه ای بدون تاخیر برای کاربران شما'
    },
  ];
}
