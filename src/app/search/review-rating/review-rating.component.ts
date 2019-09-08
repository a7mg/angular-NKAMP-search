import { Component, OnInit } from '@angular/core';
import { BookDetailsService } from '../services/book-details.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-review-rating',
  templateUrl: './review-rating.component.html',
  styleUrls: ['./review-rating.component.scss'],
  providers: [NgbRatingConfig]
})
export class ReviewRatingComponent implements OnInit {
  commentsList;
  count;
  constructor(private bookDetailsService: BookDetailsService, config: NgbRatingConfig) {
    config.readonly = true;
  }
  ngOnInit() {
    const commentsRequestBody = {
      primaryItemSourceId: "783c969a-cebb-4b0c-8a25-f524ec479cfc",
      itemIndexId: "61879",
      dataSourceName: "aruc_index",
      dataSourceId: "783c969a-cebb-4b0c-8a25-f524ec479cfc",
      materialTypeId: "783c969a-cebb-4b0c-8a25-f524ec479cfc",
      materialTypeName: "كتب"
    };


    console.log('## baqer 200');



    this.bookDetailsService.getComment(commentsRequestBody).subscribe(Data  => {
      // console.log("## baqer 111" + JSON.stringify(commentsRequestBody));
      // console.log("## baqer 1100" + JSON.stringify(Data));
      // console.log("## baqer 222");

      this.commentsList = Data;
      console.log(' get comment ' + JSON.parse(this.commentsList));

      // if (Data !== null) {
      //     Data[0].forEach(currentElement => {
      //       for (this.count = 0; this.count < currentElement.comments.length; this.count++){
      //                 this.commentsList.push(currentElement.comments[this.count]);
      //       }
      //     });

      //     console.log("## baqer" + Data[0]);
      //   } else {
      //     console.log('no data');
      //   }
    });

    // this.commentsList = this.bookDetailsService.getCommentsTest();
    // console.log('test 101' + this.bookDetailsService.getCommentsTest);

    // this.commentsList = [
    //   {
    //     userId: 'albaqer_naseej',
    //     commentCreateDate: '04-09-2019',
    //     commentData: 'تعليق رقم 1'
    //   },
    //   {
    //     userId: 'albaqer_naseej',
    //     commentCreateDate: '04-09-2019',
    //     commentData: 'تعليق رقم 2'
    //   }
    // ];

  }

}
