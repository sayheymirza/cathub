import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dialog } from '../../../services/dialog';
import { Http } from '../../../services/http';
import { Toast } from '../../../services/toast';
import { User } from './user';

@Component({
  selector: 'app-users',
  imports: [FormsModule],
  template: `
    <div class="flex flex-nowrap items-center gap-2">
      <button (click)="openUserDialog()" class="btn btn-primary">
        <i class="material-icons-round">add</i>
        <span>تعریف کاربر جدید</span>
      </button>
      
      <label class="input input-ghost bg-base-200 focus-within:input-primary w-full">
        <i class="material-icons-round scale-90">search</i>
        <input [(ngModel)]="query" type="text" placeholder="جستجو کاربر با نام یا شماره موبایل یا کد ملی" class="w-full" />
      </label>
    </div>

    <div class="overflow-x-auto">
      <table class="table">
        <!-- head -->
        <thead>
          <tr>
            <th></th>
            <th>نام</th>
            <th>شماره موبایل</th>
            <th>کد ملی</th>
            <th>هویت</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          @for (item of users(); track $index) {
            <tr>
              <th>
                {{$index + 1}}
              </th>
              <td>
                {{item.name}}
              </td>
              <td>
                {{item.phone}}
              </td>
              <td>
                {{item.national_id}}
              </td>
              <td>
                <span class="badge badge-sm badge-soft"
                  [class.badge-info]="item.type === 'admin'"
                  [class.badge-success]="item.type === 'user'"
                  [class.badge-warning]="item.type === 'company'"
                >
                  @switch (item.type) {
                    <!-- admin, user, copmany -->
                    @case ('admin') {
                      مدیر
                    }
                    @case ('user') {
                      حقیقی
                    }
                    @case ('company') {
                      حقوقی
                    }
                  }
                </span>
              </td>
              <td class="flex justify-end gap-2">
                <button class="btn btn-sm" (click)="openUserDialog(item)">ویرایش</button>
              </td>
            </tr>
          }

        </tbody>
      </table>
</div>
  `,
  host: {
    class: 'md:bg-base-100 rounded-xl md:p-4 md:shadow-md w-full h-full flex flex-col gap-4 min-h-full md:min-h-[80dvh]',
  }
})
export class Users {
  public query = signal<string>('');
  public items = signal<any[]>([]);

  public users = computed(() => {
    const q = this.query().toLowerCase().trim();

    return this.items().filter(user =>
      user.name.toLowerCase().includes(q) ||
      user.phone.toLowerCase().includes(q) ||
      user.national_id.toLowerCase().includes(q)
    );
  });

  private dialog = inject(Dialog);
  private http = inject(Http);
  private toast = inject(Toast);

  ngOnInit() {
    this.fetchUsers();
  }

  public openUserDialog(data = {}) {
    this.dialog.open(User, {
      data,
    }).closed.subscribe((result) => {
      if (result) {
        this.fetchUsers();
      }
    });
  }

  private async fetchUsers() {
    try {
      const result = await this.http.request({
        method: 'GET',
        path: '/api/v1/user',
        auth: true,
      });

      if (result.body.ok) {
        this.items.set(result.body.users);
      }
    } catch (error) {
      //
    }
  }
}
