import { NgModule   } from '@angular/core';
import { SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { DigitalLibraryComponent } from './digital-library.component';
import { RouterModule } from '@angular/router';
import { NaseejSharedModule } from '../Naseej-shared/naseej-shared.module';
import { DigitalSearchComponent } from './digital-search/digital-search.component';
import { DigitalResultComponent } from './digital-result/digital-result.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  keyboard: true,
  mousewheel: true,
  navigation: true,
  threshold: 50,
  observer: true,
  spaceBetween: 20
};


const HeaderRoutes = [
  { path: '', component:  DigitalLibraryComponent }
];
@NgModule({
  declarations: [
    DigitalLibraryComponent,
    DigitalSearchComponent,
    DigitalResultComponent

  ],
  imports: [
    RouterModule.forChild(HeaderRoutes),
    SwiperModule,
    NaseejSharedModule,
    NgbModule.forRoot(),
    NgbPaginationModule
  ],
  providers: [{
    provide: SWIPER_CONFIG,
    useValue: DEFAULT_SWIPER_CONFIG
  }
  ],

})
export class DigitalLibraryModule { }
