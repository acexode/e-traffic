import { ModalController } from '@ionic/angular';
import { AuthService } from './../../core/service/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@capacitor/storage';
import { SearchComponent } from 'src/app/components/search/search.component';
const MY_CART = 'my_cart';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  user;
  pages = [
    {
      title: 'Home',
      url: '/menu/home',
      icon: 'custom-home',

    },
    {
      title: 'Update contact details',
      url: '/menu/home/categories',
      icon: 'edit-2',

    },
    {
      title: 'Payment history',
      url: '/menu/home/categories',
      icon: 'credit-card',

    }
  ];
  manage = [
    {
      title: 'Our Apps',
      url: '/menu/home/my-orders',
      icon: 'package'
    },
    {
      title: 'Settings',
      url: '/menu/home/prescription',
      icon: 'settings-f',

    },
    {
      title: 'Profile',
      url: '/menu/home/profile',
      icon: 'user',

    }
  ];
  support = [
    {
      title: 'Contact Us',
      url: '/menu/home/contact-us',
      icon: 'users'
    },
    {
      title: 'FAQs',
      url: '/menu/home/faq',
      icon: 'help-circle-f',

    },
    {
      title: 'About Us',
      url: '/menu/home/about-us',
      icon: 'info',
    },
    {
      title: 'Share the app',
      url: '/menu/home/about-us',
      icon: 'share-2',
    }
  ];
  constructor(private router: Router, private authS: AuthService,
     private modalController: ModalController) { }

  async ngOnInit() {
    this.authS.currentUser$.subscribe(user =>{
      this.user = user;

    });

  }
  logout(){
    this.authS.logout().then(e =>{
      this.router.navigateByUrl('login');

    });
  }
  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchComponent,
      cssClass: 'fullscreen'
    });
    await modal.present();
  }
}
