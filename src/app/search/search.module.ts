import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SearchComponent } from '../search/search.component';
import { FacetsComponent } from './facets/facets.component';
import { ActiveSelectionComponent } from './active-selection/active-selection.component';
import { ListComponent } from '../Common/list/list.component';
import { CriteriaComponent } from './criteria/criteria.component';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { NKAMPSearchSharedModule } from '../NKAMP-Search-shared/NKAMP-Search-shared.module';
import { BookDetailsComponent } from './book-details/book-details.component';
import { SwiperModule, SwiperConfigInterface, SWIPER_CONFIG } from 'ngx-swiper-wrapper';

import { RatingModule, TabViewModule } from 'primeng/primeng';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AddReviewComponent } from './add-review/add-review.component';
import { ReviewRatingComponent } from './review-rating/review-rating.component';
import { DetailsComponent } from './details/details.component';
import { BookDetailsService } from './services/book-details.service';
import { ItemsViewComponent } from './items-view/items-view.component';
import { FiltersComponent } from './items-view/filters/filters.component';
import { ResultsAreaComponent } from './results-area/results-area.component';
import { CategoryComponent } from './facets/gategory/category.component';
import { EventEmitterService } from './services/event-emitter.service';

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

const SearchRoutes = [
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
    CategoryComponent,
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
    },
    EventEmitterService
  ],
  imports: [
    RouterModule.forChild(SearchRoutes),

    ProgressSpinnerModule,
    ToastModule,
    ChartModule,
    TabViewModule,
    ReactiveFormsModule,
    NKAMPSearchSharedModule,
    SwiperModule,
    CommonModule,
    FormsModule,
    RatingModule,
    NgbModule,
    NgbPaginationModule
  ]
})
export class SearchModule { }
