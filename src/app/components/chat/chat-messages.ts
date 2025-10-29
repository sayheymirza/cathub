import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-messages',
  imports: [],
  template: `
    <div class="chat chat-start">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
      />
    </div>
  </div>
  <div class="chat-header">
    محمد حسین میرزایی
    <time class="text-xs opacity-50"></time>
  </div>
  <div class="chat-bubble bg-base-200 text-sm font-normal">عجب چیز خوبی شد این رابط کاربری که برام ساختید</div>
  <div class="chat-footer opacity-50">11:23</div>
</div>
<div class="chat chat-end">
  <div class="chat-image avatar">
    <div class="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
      />
    </div>
  </div>
  <div class="chat-header">
    اناکین اسکای واکر
    <time class="text-xs opacity-50">برنامه نویس</time>
  </div>
  <div class="chat-bubble bg-base-200 text-sm font-normal">قربون شما این چه حرفیه می زنی ....</div>
  <div class="chat-footer opacity-50">12:46</div>
</div>
  `,
  host: {
    class: 'flex flex-col justify-end gap-2 p-4 overflow-y-scroll h-full'
  }
})
export class ChatMessages {

}
