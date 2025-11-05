import { Component, inject, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Toast } from '../../services/toast';

@Component({
  selector: 'app-chat-footer',
  imports: [FormsModule],
  template: `
    <div dir="ltr" class="fab !relative w-7 h-7 inset-0 gap-1">
      <div tabindex="0" role="button" class="btn btn-sm btn-circle mt-4">
        <i class="material-icons-round scale-75">add</i>
      </div>
      <div (click)="pickImage()" class="-mr-1 bg-base-100 p-2 pl-10 h-12 rounded-field shadow cursor-pointer flex flex-nowrap items-center transition-all hover:shadow-lg">
        <div class="flex flex-col items-end">
          <strong>تصویر</strong>
          <span class="text-xs text-base-content/70" dir="rtl">تا ۳ مگابایت</span>
        </div>
        <button class="btn btn-circle bg-green-600 text-white">
          <i class="material-icons-round scale-75">photo</i>
        </button>
      </div>
      <div (click)="pickFile()" class="-mr-1 bg-base-100 p-2 pl-10 h-12 rounded-field shadow cursor-pointer flex flex-nowrap items-center transition-all hover:shadow-lg">
        <div class="flex flex-col items-end">
          <strong>فایل</strong>
          <span class="text-xs text-base-content/70" dir="rtl">انتخاب zip, rar, 7z, tar تا ۱۰ مگابایت</span>
        </div>
        <button class="btn btn-circle bg-amber-600 text-white">
          <i class="material-icons-round scale-75">insert_drive_file</i>
        </button>
      </div>
    </div>

    <textarea [(ngModel)]="message" (keyup.enter)="sendMessage()" rows="1" class="bg-transparent grow h-full min-h-8 outline-0 text-sm leading-8" placeholder="پیام خود را بنویسید"></textarea>

    <button class="btn btn-circle btn-primary btn-sm -scale-x-100" (click)="sendMessage()">
      <i class="material-icons-round scale-75">send</i>
    </button>
  `,
  host: {
    class: 'flex flex-nowrap items-end gap-4 bg-base-100/70 backdrop-blur border border-base-content/30 rounded-xl min-h-12 p-2 focus-within:border-primary transition-all shadow',
  }
})
export class ChatFooter {
  private toast = inject(Toast);

  public submit = output<any>();

  public message = signal<string>('');

  public sendMessage() {
    if (this.message().trim().length != 0) {
      this.submit.emit({
        type: 'text',
        content: {
          'text': this.message().trim(),
        }
      });
      this.message.set('');
    }
  }

  public pickImage() {
    // Logic to pick an image from the device
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        // handle image size limit here if needed (3MB)        
        if (file.size > 3 * 1024 * 1024) {
          this.toast.make('حجم تصویر نباید بیشتر از ۳ مگابایت باشد.', 'error');

          return;
        }

        const url = URL.createObjectURL(file);

        this.submit.emit({
          type: 'image',
          content: {
            size: file.size,
            name: file.name,
            file: file,
            url: url,
          }
        });
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
        // handle file size limit here if needed (10MB)
        if (file.size > 10 * 1024 * 1024) {
          this.toast.make('حجم فایل نباید بیشتر از ۱۰ مگابایت باشد.', 'error');
          return;
        }

        const url = URL.createObjectURL(file);

        this.submit.emit({
          type: 'file',
          content: {
            size: file.size,
            name: file.name,
            file: file,
            url,
          }
        });
      }
    };
    input.click();
  }
}
