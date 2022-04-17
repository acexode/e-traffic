import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        loadChildren: () => import('../../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab1',
        loadChildren: () => import('../../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('../categories/categories.module').then(m => m.CategoriesPageModule)
      },
      {
        path: 'contact-us',
        loadChildren: () => import('../contact-us/contact-us.module').then(m => m.ContactUsPageModule)
      },
      {
        path: 'about-us',
        loadChildren: () => import('../about-us/about-us.module').then(m => m.AboutUsPageModule)
      },
      {
        path: 'faq',
        loadChildren: () => import('../faqs/faqs.module').then(m => m.FaqsPageModule)
      },

    ],
  },
    {
      path: '',
      redirectTo: '/tabs/tab1',
      pathMatch: 'full'
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
