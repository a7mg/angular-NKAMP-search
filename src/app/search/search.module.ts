import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SearchComponent } from '../search/search.component';
import { FacetsComponent } from './facets/facets.component';
import { ActiveSelectionComponent } from './active-selection/active-selection.component';
import { GategoryComponent } from './facets/gategory/gategory.component';
import { ListComponent } from '../Common/list/list.component';
import { CriteriaComponent } from './criteria/criteria.component';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { NaseejSharedModule } from '../Naseej-shared/naseej-shared.module';
import { BookDetailsComponent } from './book-details/book-details.component';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

import { RatingModule } from 'primeng/primeng';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AddReviewComponent } from './add-review/add-review.component';
import { ReviewRatingComponent } from './review-rating/review-rating.component';
import { DetailsComponent } from './details/details.component';
import { BookDetailsService } from './services/book-details.service';
import { ItemsViewComponent } from './items-view/items-view.component';
import { FiltersComponent } from './items-view/filters/filters.component';
import { ResultsAreaComponent } from './results-area/results-area.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 1,
  keyboard: false,
  mousewheel: false,
  navigation: true,
  threshold: 50,
  observer: true,
  spaceBetween: 20
};

const HeaderRoutes = [
  // { path: '', component: SearchComponent },
  {
    path: '',
    component: SearchComponent,
    children: [
      { path: '', component: ResultsAreaComponent },
      { path: 'book', component: BookDetailsComponent },

    ]
  }
];

@NgModule({
  declarations: [
    SearchComponent,
    ItemsViewComponent,
    CriteriaComponent,
    FacetsComponent,
    ListComponent,
    FiltersComponent,
    ActiveSelectionComponent,
    GategoryComponent,
    BookDetailsComponent,
    DetailsComponent,
    ReviewRatingComponent,
    AddReviewComponent,
    ResultsAreaComponent
  ],
  providers: [
    BookDetailsService,
    {
      provide: SWIPER_CONFIG,
      useValue: DEFAULT_SWIPER_CONFIG
    }
  ],
  imports: [
    RouterModule.forChild(HeaderRoutes),

    ProgressSpinnerModule,
    ToastModule,
    ChartModule,
    ReactiveFormsModule,
    NaseejSharedModule,
    SwiperModule,
    CommonModule,
    FormsModule,
    RatingModule,
    NgbModule,
    NgbPaginationModule
  ]
})
export class SearchModule { }
