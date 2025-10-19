import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/site').then(m => m.Site),
        children: [
            {
                path: '',
                loadComponent: () => import('./routes/home/home').then(m => m.Home)
            },
            {
                path: 'order',
                loadComponent: () => import('./routes/order/order').then(m => m.Order)
            }
        ]
    },
];
