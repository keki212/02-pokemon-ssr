import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: 'about',
        loadComponent: () => import('@/pages/about/about-page'),
        title: 'About Us'
    },
    {
        path: 'pricing',
        loadComponent: () => import('@/pages/pricing/pricing-page'),
        title: 'Pricing'
    },
    {
        path: 'contact',
        loadComponent: () => import('@/pages/contact/contact-page'),
        title: 'Contact Us'
    },
    {
        path: '**',
        redirectTo: 'about'
    }
];
