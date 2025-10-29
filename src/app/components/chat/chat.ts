import { Component } from '@angular/core';
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatFooter } from "./chat-footer";

@Component({
  selector: 'app-chat',
  imports: [ChatHeader, ChatMessages, ChatFooter],
  template: `
    <app-chat-header />
    <app-chat-messages class="grow pb-16" />
    <app-chat-footer class="absolute bottom-4 left-4 right-4"/>
  `,
  host: {
    class: 'flex flex-col overflow-hidden relative'
  }
})
export class Chat {

}
