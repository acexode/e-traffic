import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  appVersion: string;
  constructor() { }

  ngOnInit() {
    this.getAppVersion();
  }

  async getAppVersion(){
    const { version } = await App.getInfo();
    this.appVersion = version;
  }

  openExternalLink(){
    
  }
}
