import { NgModule } from '@angular/core';
import { SwiperModule, SwiperConfigInterface,
  SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {RatingModule} from 'primeng/rating';
import { BookDetailsService } from './sevrices/book-details.service';
import { BookDetailsComponent } from './book-details.component';
import { DetailsComponent } from './details/details.component';
import { ReviewRatingComponent } from './review-rating/review-rating.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
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
  { path: '', component:  BookDetailsComponent }
];
@NgModule({
  declarations: [
    BookDetailsComponent,
    DetailsComponent, 
    ReviewRatingComponent, 
    AddReviewComponent
  ],
  providers:[
    BookDetailsService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  imports: [
    RouterModule.forChild(HeaderRoutes),
    SwiperModule,
    CommonModule,
    FormsModule,
    RatingModule,
    NgbModule,
    SweetAlert2Module.forRoot()
  ]
})
export class BookDetailsModule { }
