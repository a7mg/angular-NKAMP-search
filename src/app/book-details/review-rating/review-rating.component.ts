import { Component, OnInit } from '@angular/core';
import { BookDetailsService } from '../sevrices/book-details.service';


@Component({
  selector: 'app-review-rating',
  templateUrl: './review-rating.component.html',
  styleUrls: ['./review-rating.component.scss']
})
export class ReviewRatingComponent implements OnInit {
  commentsList =[];
  count;
  constructor(private bookDetailsService: BookDetailsService) { }
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
            // console.log( currentElement.Item_Operations.comments.comment);
            // this.commentsList.push(currentElement.Item_Operations.comments.comment);
            for(this.count= 0; this.count<currentElement.comments.length; this.count++){
                      // console.log( currentElement.Item_Operations.comments[this.count]);
                      this.commentsList.push(currentElement.comments[this.count]);
                  }
                  // console.log(this.commentsList);
          });
        }
        else{
          console.log('no data');
        }
    });
  }

}
