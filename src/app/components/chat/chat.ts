import { Component, input, output } from '@angular/core';
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatFooter } from "./chat-footer";

@Component({
  selector: 'app-chat',
  imports: [ChatHeader, ChatMessages, ChatFooter],
  template: `
    <app-chat-header>
      <ng-container chat-header>
        <ng-content select="[chat-header]"></ng-content>
      </ng-container>
    </app-chat-header>
    <app-chat-messages [messages]="messages()" class="grow pb-20" />
    <app-chat-footer (submit)="submit.emit($event)" class="absolute bottom-4 left-4 right-4"/>
  `,
  host: {
    class: 'flex flex-col overflow-hidden relative'
  }
})
export class Chat {
  public submit = output<any>();
  public messages = input.required<any[]>();
}
