import { Component } from '@angular/core';

@Component({
  selector: 'app-service-server',
  imports: [],
  template: `
    <p>
      service-server works!
    </p>
  `,
  host: {
    class: 'flex flex-col container mx-auto'
  }
})
export class ServiceServer {

}
