import { Component } from '@angular/core';
import { Chat } from "../../components/chat/chat";

@Component({
  selector: 'app-ticketing',
  imports: [Chat],
  template: `
    <div class="min-w-full w-full md:min-w-[unset] md:w-[unset] p-2 md:p-0 flex flex-col gap-2 relative md:col-span-2 lg:col-span-1">
      <div class="flex flex-nowrap items-center justify-between">
        <strong class="p-2">تیکت و پشتیبانی</strong>

        <button class="btn btn-circle btn-sm">
          <i class="material-icons-round scale-75">filter_alt</i>
        </button>
      </div>

      <div class="tabs tabs-box tabs-sm">
        <input type="radio" name="type" class="tab grow" aria-label="تیکت ها" checked="checked" />
        <input type="radio" name="type" class="tab grow" aria-label="آرشیو ها" />
      </div>

      <div class="flex flex-col gap-1 p-2 hover:bg-base-200 cursor-pointer rounded-lg">
        <strong class="text-sm">عنوان تیکت</strong>
        
        <div class="flex flex-nowrap items-center gap-2 text-xs">
          <p class="truncate grow">سلام می خواستم یک سوال خاص بپرسم که من می تونم سرور بخرم</p>
          <time class="text-base-content/70">11:00</time>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-base-100 to-transparent p-4 md:pb-2">
        <button class="btn btn-primary w-full">
          <span>تیکت جدید</span>
        </button>
      </div>
    </div>
    
    <app-chat class="min-w-full md:w-[unset] md:col-span-3 lg:col-span-4 border border-base-content/20 md:rounded-xl md:mb-4"/>
  `,
  host: {
    class: 'md:bg-base-100 rounded-xl md:p-4 md:shadow-md w-full h-full flex flex-nowrap md:grid md:grid-cols-5 gap-4 min-h-full grow md:min-h-[80dvh]',
  }
})
export class Ticketing {

}
