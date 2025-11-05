import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-header',
  imports: [],
  template: `
    <ng-content select="[chat-header]"></ng-content>
  `,
  host: {
    class: 'flex flex-nowrap items-center gap-4 border-b border-base-content/20 px-4 h-16 min-h-16 bg-base-200',
  }
})
export class ChatHeader {

}
