import { Component, OnInit } from '@angular/core';
import { BookDetailsService } from '../sevrices/book-details.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-review-rating',
  templateUrl: './review-rating.component.html',
  styleUrls: ['./review-rating.component.scss'],
  providers: [NgbRatingConfig]
})
export class ReviewRatingComponent implements OnInit {
  commentsList =[];
  count;
  constructor(private bookDetailsService: BookDetailsService, config: NgbRatingConfig) {
    config.readonly = true;
  }
  ngOnInit() {
    const commentsRequestBody = {
      "primaryItemSourceId": "primaryItemSourceId1",
      "itemIndexId": "itemIndexId1",
      "dataSourceName": "dataSourceName1",
      "dataSourceId": "dataSourceId1",
      "materialTypeId": "materialTypeId1",
      "materialTypeName": "materialTypeName1"
    }

    this.bookDetailsService.getComment(commentsRequestBody).subscribe(  Data  =>{
        if(Data !== null){
          Data.forEach((currentElement) => {
            for(this.count= 0; this.count<currentElement.comments.length; this.count++){
                      this.commentsList.push(currentElement.comments[this.count]);
            }
          });
        }
        else{
          console.log('no data');
        }
    });
  }

}
