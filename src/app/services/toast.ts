import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import toast from './toast.json';

@Injectable({
    providedIn: 'root',
})
export class Toast {
    public make(message: string, type: 'success' | 'error' | 'warning' | 'normal' = 'normal') {

        const subject = new Subject();
        const alert = document.createElement('div');
        alert.className =
            'alert w-full md:min-w-[300px] md:w-fit min-h-[56px] shadow-lg';

        switch (type) {
            case 'success':
                alert.classList.add('alert-success');
                break;
            case 'error':
                alert.classList.add('alert-error');
                break;
            case 'warning':
                alert.classList.add('alert-warning');
                break;

            default:
                break;
        }

        const div = document.createElement('div');
        div.className = 'flex flex-nowrap items-center justify-start w-full h-full';

        const span = document.createElement('span');
        span.className = 'block flex-1 w-full truncate';

        span.innerText = (toast as any)[message] ?? message;

        div.appendChild(span);

        alert.appendChild(div);

        this.container.appendChild(alert);

        setTimeout(() => {
            this.container.removeChild(alert);
            if (subject.closed == false) subject.complete();
        }, 5000);

        return subject;
    }

    private get container(): HTMLElement {
        const container = document.getElementById('mirza-toast-container');

        if (container) {
            return container;
        }

        const div = document.createElement('div');
        div.id = 'mirza-toast-container';
        div.className =
            'toast toast-top z-[9999] md:left-1/2 md:-translate-x-1/2';

        document.body.appendChild(div);

        return div;
    }
}