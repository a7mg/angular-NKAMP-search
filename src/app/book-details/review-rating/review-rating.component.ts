import { Component, OnInit } from '@angular/core';
import { BookDetailsService } from '../sevrices/book-details.service';


@Component({
    selector: 'app-review-rating',
    templateUrl: './review-rating.component.html',
    styleUrls: ['./review-rating.component.scss']
})
export class ReviewRatingComponent implements OnInit {
    commentsList = [];
    // count;
    constructor(private bookDetailsService: BookDetailsService) { }
    ngOnInit() {

        const commentsRequestBody = {
            primaryItemSourceId: 'primaryItemSourceId1',
            itemIndexId: 'itemIndexId1',
            dataSourceName: 'dataSourceName1',
            dataSourceId: 'dataSourceId1',
            materialTypeId: 'materialTypeId1',
            materialTypeName: 'materialTypeName1'
        };

        this.bookDetailsService.getComment(commentsRequestBody).subscribe(Data => {
            if (Data !== null) {
                Data.forEach((currentElement) => {
                    console.log(currentElement.Item_Operations.comments.comment);
                    this.commentsList.push(currentElement.Item_Operations.comments.comment);
                });
            } else {
                console.log('no data');
            }
            // old json syntax
            // if(Data[0].Item_Operations.comments !== null){
            //   console.log(Data[0].Item_Operations.comments.comment);
            //   this.commentsList.push(Data[0].Item_Operations.comments.comment);
            //   Data[0].forEach((currentElement) => {
            //     for(this.count= 0; this.count<currentElement.Item_Operations.comments.length; this.count++){
            //         console.log( currentElement.Item_Operations.comments[this.count]);
            //         this.commentsList.push(currentElement.Item_Operations.comments[this.count]);
            //     }
            //     console.log(this.commentsList);
            //   });
            // }
            // else{
            //   console.log('no data');
            // }
        }
        );
    }

}
