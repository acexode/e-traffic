import { isEmpty } from 'lodash';
/* eslint-disable no-underscore-dangle */
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title;
  @Input() search;
  @Input() cart;
  @Input() dismiss = false;
  cartTotal;
  constructor(private _location: Location,
    private modalController: ModalController,
    private router: Router) { }

  ngOnInit() {  }
  back(){
    if(this.dismiss){
      this.modalController.dismiss();
    }else{
      this._location.back();
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: SearchComponent,
      cssClass: 'fullscreen',
    });
    await modal.present();
  }
}
