import { Component, OnInit } from '@angular/core';
import { BookDetailsService } from '../services/book-details.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-review-rating',
  templateUrl: './review-rating.component.html',
  styleUrls: ['./review-rating.component.scss'],
  providers: [NgbRatingConfig]
})
export class ReviewRatingComponent implements OnInit {
  commentsList;
  ratingDegree;
  count;
  requestBody: any;
  requestBodyForRating: any;

  constructor(private bookDetailsService: BookDetailsService, config: NgbRatingConfig, private route: ActivatedRoute) {
    config.readonly = true;


    this.route.queryParams.subscribe(params => {
      let details = params['details'];
      this.requestBody = JSON.parse(details);
      this.requestBodyForRating = JSON.stringify(this.requestBody.searchKeyWords[0]);
      console.log('test rating view in detail' + this.requestBodyForRating);
      // const rateData =  JSON.stringify(this.requestBody.searchKeyWords);
      // this.requestBodyForRating = rateData;
      // console.log('ddddd' + this.requestBodyForRating);

  });
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


    const ratingRequestBody = {
      primaryItemSourceId: this.requestBodyForRating.primaryItemSourceId,
      itemIndexId: this.requestBodyForRating.itemIndexId,
      dataSourceName: this.requestBodyForRating.dataSourceName,
      dataSourceId: this.requestBodyForRating.dataSourceId,
      materialTypeId: this.requestBodyForRating.materialTypeId,
      materialTypeName: this.requestBodyForRating.materialTypeName
    };



    this.bookDetailsService.getComment(ratingRequestBody).subscribe(Data  => {


      // console.log("## baqer 111" + JSON.stringify(commentsRequestBody));
      // console.log("## baqer 1100" + JSON.stringify(Data));
      // console.log("## baqer 222");
      this.commentsList = Data[0].comments;
      this.ratingDegree = Data[0].views_count;
      console.log('comments are got' + this.ratingDegree);

      // console.log(' get comment ' + JSON.parse(this.commentsList));

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
