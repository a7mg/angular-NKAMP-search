import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {RatingModule} from 'primeng/rating';
import { BookDetailsService } from './sevrices/book-details.service';
import { BookDetailsComponent } from './book-details.component';
import { DetailsComponent } from './details/details.component';
import { ReviewRatingComponent } from './review-rating/review-rating.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { RouterModule } from '@angular/router';


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
    BookDetailsService
  ],
  imports: [
    RouterModule.forChild(HeaderRoutes),
    CommonModule,
    FormsModule,
    RatingModule
  ]
})
export class BookDetailsModule { }
