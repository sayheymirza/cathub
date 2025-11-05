import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ITicketMessage } from '../../../../interfaces/ticket';
import { Chat } from "../../../components/chat/chat";
import { DatePipe } from "../../../pipes/date";
import { Dialog } from '../../../services/dialog';
import { Http } from '../../../services/http';
import { Toast } from '../../../services/toast';
import { User } from '../../../services/user';
import { Ticket } from './ticket';

@Component({
  selector: 'app-tickets',
  imports: [NgClass, Chat, DatePipe, FormsModule],
  template: `
    <div class="flex-col relative md:col-span-2 lg:col-span-1 overflow-y-clip border-l border-base-content/20" [ngClass]="{'grow': !backable(), 'hidden md:flex': backable()}">
      <div class="flex flex-nowrap items-center h-16 px-2 bg-base-200 border-b border-base-content/20 sticky top-0 z-10">
        <strong class="p-2">تیکت و پشتیبانی</strong>

        <div class="flex-1"></div>

        <!-- refresh button -->
        <button (click)="fetchTickets()" class="btn btn-circle btn-ghost btn-sm">
          <i class="material-icons-round scale-75">refresh</i>
        </button>
      </div>

      @for (item of tickets(); track $index) {
        <div 
          (click)="selectTicket(item)" 
          class="flex flex-col gap-1 py-2 px-4 border-b border-base-content/20 hover:bg-base-200 cursor-pointer transition-all"
          [ngClass]="{'bg-base-200': ticket() && ticket().id === item.id}"
        >
          @if(user.admin()) {
            <div class="flex flex-nowrap items-center gap-2">
              <div class="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                 <i class="material-icons-round scale-75">
                  @switch (item.user.type) {
                    @case ('user') {
                      person
                    }
                    @case ('admin') {
                      manage_accounts
                    }
                    @case ('company') {
                      business_center
                    }
                  }
                 </i>
              </div>
              <span class="text-xs">{{item.user.name}}</span>
            </div>
          }

          <strong class="text-sm" [ngClass]="{'text-primary': ticket() && ticket().id === item.id}">
            {{item.title}}
          </strong>
          
          @if(item.ticket_message.length > 0) {
            <div class="flex flex-nowrap items-center gap-2 text-xs text-base-content/70">
              <p class="truncate grow flex flex-nowrap items-center gap-1">
                @if(item.ticket_message[0].user_id == user.profile()!.id) {
                  <strong>شما: </strong>
                }

                @switch (item.ticket_message[0].type) {
                  @case ('text') {
                    {{item.ticket_message[0].content.text}}
                  }
                  @case ('image') {
                    <i class="material-icons-round scale-75">image</i>
                    <span>تصویر</span>
                  }
                  @case ('file') {
                    <i class="material-icons-round scale-75">attach_file</i>
                    <span>فایل</span>
                  }
                }
              </p>
              <time>
                {{item.ticket_message[0].createdAt | date:'HH:mm'}}
              </time>
            </div>
          }

          <div class="flex flex-wrap gap-1 mt-1">
            <div class="badge badge-xs badge-soft badge-secondary">
              @switch (item.status) {
                @case ('open') {
                  باز
                }
                @case ('closed') {
                  بسته
                }
                @case ('waiting-for-response') {
                  در انتظار پاسخ
                }
                @case ('resolved') {
                  پاسخ داده شد
                }
              }
            </div>
            <div class="badge badge-xs badge-soft badge-primary">
              @switch (item.department) {
                @case ('sales') {
                  فروش
                }
                @case ('support') {
                  پشتیبانی
                }
                @case ('technical') {
                  فنی
                }
              }
            </div>
            <div 
              class="badge badge-xs badge-soft"
              [class.badge-success]="item.priority === 'low'"
              [class.badge-warning]="item.priority === 'medium'"
              [class.badge-error]="item.priority === 'high'"
            >
              اولویت 
              @switch (item.priority) {
                @case ('low') {
                  کم
                }
                @case ('medium') {
                  متوسط
                }
                @case ('high') {
                  بالا
                }
              }
            </div>
          </div>
        </div>
      }
        
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-base-100 to-transparent p-4 md:pb-4">
        <button (click)="openTicketDialog()" class="btn btn-primary w-full">
          <span>تیکت جدید</span>
        </button>
      </div>
    </div>

    <div class="flex-col md:col-span-3 lg:col-span-4 grow transition-all max-h-[calc(100dvh-4rem)] sm:max-h-[calc(100dvh-6rem)] md:max-h-[80dvh]" [ngClass]="{'hidden md:flex': !backable(), 'flex': backable()}">
      @if(ticket()) {
      <app-chat 
        class="border-t md:border-0 border-base-content/20 grow h-full"
        [messages]="messages()"
        (submit)="onSubmitMessage($event)"
      >
        <ng-container chat-header>
          <button  
            (click)="backable.set(false)" class="btn btn-square md:!hidden"
            [ngClass]="{'hidden': !backable()}">
            <i class="material-icons-round">arrow_forward</i>
          </button>

          <strong>{{ticket().title}}</strong>

          <div class="flex-1"></div>

          <div class="dropdown dropdown-end">
            <button tabindex="0" class="btn btn-circle btn-sm">
              <i class="material-icons-round scale-75">more_vert</i>
            </button>

            <ul tabindex="-1" class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              @if(user.profile()?.type === 'admin') {
              <!-- select box  -->
               <label class="label px-1 pb-2">وضعیت تیکت</label>
               <select [(ngModel)]="ticket().status" (ngModelChange)="changeTicketStatus($event)" class="select select-sm focus:select-primary focus-within:select-primary">
                <option class="text-success" value="open">باز</option>
                <option class="text-error" value="closed">بسته</option>
                <option class="text-warning" value="waiting-for-response">در انتظار پاسخ</option>
                <option class="text-info" value="resolved">پاسخ داده شد</option>
               </select>
              } @else if (ticket().status !== 'closed') {
                <li (click)="changeTicketStatus('closed')" class="text-error"><a>
                  <i class="material-icons-round">close</i>
                  <span>بستن تیکت</span>
                </a></li>
              }
            </ul>
          </div>
        </ng-container>
      </app-chat>
      }
    </div>
  `,
  host: {
    class: 'overflow-hidden transition-all md:bg-base-100 sm:rounded-xl md:shadow-md w-full h-full flex flex-col md:grid md:grid-cols-5 min-h-full grow md:min-h-[80dvh] md:max-h-[80dvh]',
  }
})
export class Tickets {
  public user = inject(User);
  private dialog = inject(Dialog);
  private http = inject(Http);
  private toast = inject(Toast);

  public backable = signal<boolean>(false);
  public ticket = signal<any>(null);
  public messages = signal<ITicketMessage[]>([]);

  public tickets = signal<any[]>([]);

  ngOnInit() {
    this.fetchTickets();
  }

  public selectTicket(item: any) {
    this.ticket.set(item);
    this.backable.set(true);
    this.fetchTicket(item.id);
  }

  public openTicketDialog() {
    this.dialog.open(Ticket).closed.subscribe((result) => {
      if (result) {
        this.fetchTickets();
        this.selectTicket(result)
      }
    })
  }

  public async changeTicketStatus(status: string) {
    try {
      const result = await this.http.request({
        method: 'POST',
        path: '/api/v1/ticket/' + this.ticket().id + '/status',
        auth: true,
        data: {
          status: status,
        }
      });

      this.toast.make(result.body.code, result.body.ok ? 'success' : 'error');

      if (result.body.ok) {
        this.ticket.update((ticket) => ({
          ...ticket,
          status: result.body.ticket.status,
        }));

        // update tickets
        this.tickets.update((tickets) => tickets.map((item) => {
          if (item.id === this.ticket().id) {
            return {
              ...item,
              status: result.body.ticket.status,
            };
          }
          return item;
        }));
      }
    } catch (error) {
      //
    }
  }

  public onSubmitMessage(event: any) {
    const message: ITicketMessage = {
      id: Date.now(),
      type: event.type,
      content: event.content,
      user_id: this.user.profile()!.id,
      user: this.user.profile()!,
      sent: false,
      createdAt: new Date().toISOString(),
    }

    this.messages.update((messages) => [...messages, message]);

    if (event.type == 'text') {
      this.sendTicketMessage(message);
    } else {
      // upload file or image then send message
      if (event.content.file) {
        this.http.upload({
          file: event.content.file,
          onProgress: (progress) => {
            // update content percentage
            this.messages.update((messages) => messages.map((item) => {
              if (item.id === message.id) {
                return {
                  ...item,
                  content: {
                    ...item.content,
                    percentage: progress.percentage,
                  },
                }
              }

              return item;
            }));
          },
          onComplete: (result) => {
            if (result.body.ok) {
              this.sendTicketMessage({
                ...message,
                content: {
                  ...message.content,
                  url: result.body.file.url,
                  file: undefined
                },
              });
            }
          }
        });
      }
    }
  }

  private async sendTicketMessage(message: ITicketMessage) {
    try {
      const result = await this.http.request({
        method: 'POST',
        path: `/api/v1/ticket/${this.ticket().id}/message`,
        auth: true,
        data: {
          type: message.type,
          content: message.content,
        }
      });

      if (result.body.ok) {
        // update messages (sent to true and change id to new id)
        this.messages.update((messages) => messages.map((item) => {
          if (item.id === message.id) {
            return {
              ...item,
              id: result.body.message.id,
              sent: true
            };
          }
          return item;
        }));

        // update ticket last message
        const latest = result.body.message;
        const ticketId = latest.ticket_id;

        this.tickets.update((items) =>
          items.map((item) =>
            item.id === ticketId
              ? {
                ...item,
                ticket_message: [
                  latest
                ],
              }
              : item,
          ),
        );
      }
    } catch (error) {
      //
    }
  }

  private async fetchTicket(id: number) {
    try {
      const result = await this.http.request({
        method: 'GET',
        path: '/api/v1/ticket/' + id,
        auth: true,
      });

      if (result.body.ok) {
        this.ticket.set(result.body.ticket);
        this.messages.set(result.body.messages);
      }
    } catch (error) {
      //
    }
  }

  public async fetchTickets() {
    try {
      const tickets = await this.http.request({
        method: 'GET',
        path: '/api/v1/ticket',
        auth: true,
      });

      if (tickets.body.ok) {
        this.tickets.set(tickets.body.tickets);
      }
    } catch (error) {
      //
    }
  }
}
