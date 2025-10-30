import { Component, inject, signal } from '@angular/core';
import { Chat } from "../../components/chat/chat";
import { NgClass } from '@angular/common';
import { Dialog } from '../../services/dialog';
import { Ticket } from './ticket';

@Component({
  selector: 'app-tickets',
  imports: [NgClass, Chat],
  template: `
    <div class="p-2 md:p-0 flex-col gap-2 relative md:col-span-2 lg:col-span-1" [ngClass]="{'grow': !backable(), 'hidden md:flex': backable()}">
      <div class="flex flex-nowrap items-center">
        <strong class="p-2">تیکت و پشتیبانی</strong>

        <div class="flex-1"></div>

        <button class="btn btn-circle btn-sm md:!flex">
          <i class="material-icons-round scale-75">filter_alt</i>
        </button>
      </div>

        <div class="tabs tabs-box tabs-sm mb-2">
          <input type="radio" name="type" class="tab grow" aria-label="تیکت ها" checked="checked" />
          <input type="radio" name="type" class="tab grow" aria-label="آرشیو ها" />
        </div>
        
        <div (click)="selectChat({})" class="flex flex-col gap-1 p-2 hover:bg-base-200 cursor-pointer rounded-lg">
          <strong class="text-sm">عنوان تیکت</strong>
          
          <div class="flex flex-nowrap items-center gap-2 text-xs">
          <p class="truncate grow">سلام می خواستم یک سوال خاص بپرسم که من می تونم سرور بخرم</p>
          <time class="text-base-content/70">11:00</time>
        </div>
      </div>
      
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-base-100 to-transparent p-4 md:pb-2">
        <button (click)="openTicketDialog()" class="btn btn-primary w-full">
          <span>تیکت جدید</span>
        </button>
      </div>
    </div>
    
    <div class="flex-col md:col-span-3 lg:col-span-4 grow" [ngClass]="{'hidden md:flex': !backable(), 'flex': backable()}">
      <app-chat class="border-t sm:border border-base-content/20 grow h-full sm:rounded-xl">
        <button backable (click)="backable.set(false)" class="btn btn-square md:!hidden"
          [ngClass]="{'hidden': !backable()}">
          <i class="material-icons-round">arrow_forward</i>
        </button>
      </app-chat>
    </div>
  `,
  host: {
    class: 'md:bg-base-100 rounded-xl md:p-4 md:shadow-md w-full h-full flex flex-col md:grid md:grid-cols-5 md:gap-4 min-h-full grow md:min-h-[80dvh]',
  }
})
export class Tickets {
  private dialog = inject(Dialog);

  public backable = signal<boolean>(false);
  public chat = signal<any>(null);

  public selectChat(item: any) {
    this.chat.set(item);
    this.backable.set(true);
  }

  public openTicketDialog() {
    this.dialog.open(Ticket);
  }
}
