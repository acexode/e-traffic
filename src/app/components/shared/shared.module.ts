import { ProfileComponentsComponent } from './../profile-components/profile-components.component';
import { SearchComponent } from './../search/search.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from '../banner/banner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { SwiperModule } from 'swiper/angular';
import { PasscodeComponent } from '../passcode/passcode.component';

@NgModule({
  declarations: [
    BannerComponent,
    PasscodeComponent,
    SearchComponent,
    HeaderComponent,
    ProfileComponentsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SwiperModule,
  ],
  exports: [
    BannerComponent,
    SearchComponent,
    HeaderComponent,
    ProfileComponentsComponent,
    PasscodeComponent,
  ],
})
export class SharedModule {}
