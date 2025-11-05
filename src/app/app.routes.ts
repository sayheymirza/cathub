import { Route, Routes, UrlSegment } from '@angular/router';
import serviceDynamicJson from './routes/service/service-dynamic.json';

const serviceDynamicKeys = Object.keys(serviceDynamicJson);

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
                path: 'service/:category',
                loadComponent: () => import('./routes/service/service-dynamic').then(m => m.ServiceDynamic),
                // just can category be: social-media, support, gaming
                canMatch: [
                    (route: Route, segments: UrlSegment[]) => {
                        const category = segments[1]?.path;
                        return serviceDynamicKeys.includes(category);
                    },
                ]
            },
            {
                path: 'service/server',
                loadComponent: () => import('./routes/service/service-server').then(m => m.ServiceServer)
            },
            {
                path: 'about-us',
                loadComponent: () => import('./routes/pages/about-us').then(m => m.AboutUs)
            },
            {
                path: 'contact-us',
                loadComponent: () => import('./routes/pages/contact-us').then(m => m.ContactUs)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./routes/login/login').then(m => m.Login)
    },
    {
        path: 'panel',
        loadComponent: () => import('./layouts/panel').then(m => m.Panel),
        children: [
            {
                path: '',
                loadComponent: () => import('./routes/panel/ticket/tickets').then(m => m.Tickets)
            },
            {
                path: 'users',
                loadComponent: () => import('./routes/panel/admin/users').then(m => m.Users)
            },
            {
                path: 'consultations',
                loadComponent: () => import('./routes/panel/admin/consultation').then(m => m.Consultation)
            },
            {
                path: 'orders',
                loadComponent: () => import('./routes/panel/admin/order').then(m => m.Order)
            }
        ],
    }
];
