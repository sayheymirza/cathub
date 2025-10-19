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
            },
            {
                path: 'consultation',
                loadComponent: () => import('./routes/consultation/consultation').then(m => m.Consultation)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./routes/login/login').then(m => m.Login)
    }
];
