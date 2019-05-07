import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridComponent } from '../Common/grid/grid.component';

import { SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG } from 'ngx-swiper-wrapper';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  observer: true,
  direction: 'horizontal',
  threshold: 50,
  spaceBetween: 5,
  slidesPerView: 1,
  centeredSlides: true
};

@NgModule({
  declarations: [
    GridComponent
  ],
  imports: [
    CommonModule,
    SwiperModule
  ]
})
export class DigitalLibraryModule { }
