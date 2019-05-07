import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 

import { BrowserModule } from '@angular/platform-browser';

import { SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { DigitalLibraryComponent } from './digital-library.component';
import { RouterModule } from '@angular/router';
import { NaseejSharedModule } from '../Naseej-shared/naseej-shared.module';


const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};
const HeaderRoutes = [
  { path: '', component:  DigitalLibraryComponent }
];
@NgModule({
  declarations: [
    DigitalLibraryComponent

  ],
  imports: [
    RouterModule.forChild(HeaderRoutes),
    SwiperModule,
    NaseejSharedModule
  ],
  providers: [
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ]
})
export class DigitalLibraryModule { }
