import { Component } from '@angular/core';

@Component({
  selector: 'app-service-chat',
  imports: [],
  template: `
    <p>
      service-chat works!
    </p>
  `,
  host: {
    class: 'flex flex-col container mx-auto'
  }
})
export class ServiceChat {

}
