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
            },
            {
                path: 'service/chat',
                loadComponent: () => import('./routes/pages/service-chat').then(m => m.ServiceChat)
            },
            {
                path: 'service/chat-organization',
                loadComponent: () => import('./routes/pages/service-chat-organization').then(m => m.ServiceChatOrganization)
            },
            {
                path: 'service/server',
                loadComponent: () => import('./routes/pages/service-server').then(m => m.ServiceServer)
            },
            {
                path: 'service/social',
                loadComponent: () => import('./routes/pages/service-social').then(m => m.ServiceSocial)
            },
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./routes/login/login').then(m => m.Login)
    }
];
