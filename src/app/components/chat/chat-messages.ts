import { NgClass } from '@angular/common';
import { Component, ElementRef, afterRenderEffect, inject, input } from '@angular/core';
import { ITicketMessage } from '../../../interfaces/ticket';
import { DatePipe } from '../../pipes/date';
import { SizePipe } from "../../pipes/size";
import { User } from '../../services/user';

@Component({
  selector: 'app-chat-messages',
  imports: [DatePipe, NgClass, SizePipe],
  template: `
@for (item of messages(); track $index) {
  <div class="chat" [ngClass]="{'chat-start': item.user!.id !== user.profile()!.id, 'chat-end': item.user!.id === user.profile()!.id}">
    @if(item.user!.avatar) {
      <div class="chat-image avatar">
        <div class="w-10 rounded-full">
          <img
            alt="{{item.user!.name}}"
            src="{{item.user!.avatar}}"
          />
        </div>
      </div>
    }
    <div class="chat-header">
      <span>{{item.user!.name}}</span>
      <span class="text-xs opacity-50">{{item.user!.badge}}</span>
    </div>
    <div 
      class="chat-bubble p-0"
      [ngClass]="{
        'bg-base-200': item.user!.id == user.profile()!.id,
        'bg-primary text-primary-content': item.user!.id != user.profile()!.id,
      }"
    >
      @switch (item.type) {
        @case ('text') {
          <p class="px-4 py-2 text-sm">{{item.content.text}}</p>
        }
        @case ('image') {
          <img
            alt="تصویر ارسالی"
            class="max-w-xs md:max-w-md lg:max-w-lg rounded-lg"
            src="{{item.content.url}}"
          />
        }
        @case ('file') {
          <div dir="ltr" class="flex flex-nowrap items-center gap-2 p-2">
            <div class="w-10 h-10 rounded flex items-center justify-center"
              [ngClass]="{
                'bg-primary text-primary-content': item.user!.id == user.profile()!.id,
                'bg-primary-content text-primary': item.user!.id != user.profile()!.id,
              }"
            >
              <i class="material-icons-round">folder_zip</i>
            </div>

            <div class="flex flex-col min-w-24 text-xs mr-4">
              <strong class=" font-sans">{{item.content.name}}</strong>
              <span class="opacity-70 font-mono">{{item.content.size | size}}</span>
            </div>

            <a href="{{item.content.url}}" download="{{item.content.name}}" 
              class="btn btn-circle btn-sm border-transparent"
              [ngClass]="{
                'bg-base-content/10 text-base-content': item.user!.id == user.profile()!.id,
                'bg-primary-content/20 text-primary-content': item.user!.id != user.profile()!.id,
              }"
            >
              <i class="material-icons-round scale-75">download</i>
            </a>
          </div>
        }
      }
    </div>
    <div class="chat-footer opacity-50">
      @if(item.sent != false) {
        <span>{{item.createdAt | date:'HH:mm'}}</span>
      } @else {
        @if(item.content && item.content.percentage) {
          <div class="radial-progress" style="--value:{{item.content.percentage}}; --size:1rem; --thickness: 0.2rem;" aria-valuenow="{{item.content.percentage}}" role="progressbar"></div>
        } @else {
          <span class="loading loading-spinner loading-xs"></span>
        }

        <span>در حال ارسال</span>
      }
    </div>
  </div>
}
  `,
  host: {
    class: 'flex flex-col gap-2 py-4 px-2 overflow-y-scroll'
  }
})
export class ChatMessages {
  public messages = input.required<ITicketMessage[]>();
  public user = inject(User);
  private elementRef = inject(ElementRef);

  constructor() {
    // Automatically scroll to bottom when messages change
    afterRenderEffect(() => {
      // Track messages signal to trigger effect when it changes
      this.messages();
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    try {
      const element = this.elementRef.nativeElement;
      element.scrollTop = element.scrollHeight;
    } catch (err) {
      console.warn('Could not scroll to bottom:', err);
    }
  }
}
