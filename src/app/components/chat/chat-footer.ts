import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-footer',
  imports: [FormsModule],
  template: `
    <div dir="ltr" class="fab !relative w-7 h-7 inset-0 gap-0">
      <div tabindex="0" role="button" class="btn btn-sm btn-circle mt-4">
        <i class="material-icons-round scale-75">add</i>
      </div>
      <div class="-mr-1 bg-gradient-to-l from-base-100 to-base-100/70 cursor-pointer backdrop-blur pl-10">
        <div class="flex flex-col items-end">
          <strong>تصویر</strong>
          <span class="text-xs text-base-content/70">تا حجم ۳ مگابایت</span>
        </div>
        <button class="btn btn-circle mb-2 bg-green-600 text-white">
          <i class="material-icons-round scale-75">photo</i>
        </button>
      </div>
      <div class="-mr-1 bg-gradient-to-l from-base-100 to-base-100/70 cursor-pointer backdrop-blur pl-10">
        <div class="flex flex-col items-end">
          <strong>فایل</strong>
          <span class="text-xs text-base-content/70">انتخاب zip, rar, 7z, tar تا ۱۰۰ مگابایت</span>
        </div>
        <button class="btn btn-circle bg-amber-600 text-white">
          <i class="material-icons-round scale-75">insert_drive_file</i>
        </button>
      </div>
    </div>

        <textarea [(ngModel)]="message" (keyup.enter)="sendMessage()" rows="1" class="bg-transparent grow h-full min-h-full outline-0 text-sm leading-8" placeholder="پیام خود را بنویسید"></textarea>

        <button class="btn btn-circle btn-primary btn-sm -scale-x-100" (click)="sendMessage()">
          <i class="material-icons-round scale-75">send</i>
        </button>
  `,
  host: {
    class: 'flex flex-nowrap items-end gap-4 bg-base-100/70 backdrop-blur border border-base-content/30 rounded-xl min-h-12 p-2 focus-within:border-primary transition-all',
  }
})
export class ChatFooter {
  public message = signal<string>('');

  public sendMessage() {

  }

  public pickImage() {
    // Logic to pick an image from the device
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        // Handle the selected image file
        console.log('Selected image:', file);
      }
    };
    input.click();
  }

  public pickFile() {
    // Logic to pick a file from the device
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.zip,.rar,.7z,.tar';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        // Handle the selected file
        console.log('Selected file:', file);
      }
    };
    input.click();
  }
}
