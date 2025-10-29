import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-header',
  imports: [],
  template: `
    <strong>عنوان تیکت</strong>

    <div class="flex-1"></div>

    <button class="btn btn-circle btn-sm">
      <i class="material-icons-round scale-75">more_vert</i>
    </button>
  `,
  host: {
    class: 'flex flex-nowrap items-center gap-4 border-b border-base-content/20 px-4 h-16 bg-base-200',
  }
})
export class ChatHeader {

}
