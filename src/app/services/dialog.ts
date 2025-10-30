import { Dialog as CdkDialog } from '@angular/cdk/dialog';
import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Dialog {
    private document = inject(DOCUMENT);
    private dialog = inject(CdkDialog);

    public open(component: any, config: any = {}) {
        this.document.querySelector('html')!.style.overflow = 'hidden';

        const dialog = this.dialog.open(component, {
            ...config,
            hasBackdrop: true,
            backdropClass: 'mirza-overlay'.split(' '),
            panelClass: '!fixed md:top-20 md:left-1/2 md:-translate-x-1/2 mirza-dialog'.split(' '),
            disableClose: false,
            autoFocus: false,

        });

        this.document.querySelector('.cdk-overlay-backdrop')!.addEventListener('click', () => {
            dialog.close();
        });

        dialog.closed.subscribe(() => {
            this.document.querySelector('html')!.style.removeProperty('overflow');
        });

        return dialog;
    }
}