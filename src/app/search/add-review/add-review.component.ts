import { Component, OnInit, ViewChild } from '@angular/core';
// import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { BookDetailsService } from '../services/book-details.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class AddReviewComponent implements OnInit {
  @ViewChild('formEle') formElement: NgForm;
  statusOFreq: boolean = false;
  userData = {
    userRating: '',
    userComment: ''
  };
  currentRate: number = 0;
  currentRate1: number = 0;
  isAdded = false;
  addCommentRequestBody = {
    primaryItemSourceId: "783c969a-cebb-4b0c-8a25-f524ec479cfc",
    itemIndexId: "61879",
    dataSourceName: "aruc_index",
    dataSourceId: "783c969a-cebb-4b0c-8a25-f524ec479cfc",
    materialTypeId: "783c969a-cebb-4b0c-8a25-f524ec479cfc",
    materialTypeName: "كتب",
    comment: {
      commentCreateDate: "2019-09-04",
      commentData: "",
      commentApprovedBy: "admin_1",
      anonymous: false,
      userId: "bader",
      email: "abc@xyz.com",
      commentApprovalDate: "2019-09-04"
    }
  };
addRatingRequestBody= {
    "primaryItemSourceId": "primaryItemSourceId1",
    "itemIndexId": "281796",
    "dataSourceName": "dataSourceName1",
    "dataSourceId": "dataSourceId1",
    "materialTypeId": "materialTypeId1",
    "materialTypeName": "materialTypeName1",
    "Rate": "5"
  };



  constructor(private bookDetailsService: BookDetailsService,
              config: NgbModalConfig,
              private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {

  }
  addComment(content){
    if (this.formElement.value.comment) {
      // let comments = this.bookDetailsService.addCommntsTest(this.formElement.value.comment);
      // //console.log(JSON.stringify(comments));
      this.isAdded = true;
      this.addCommentRequestBody.comment.commentData = this.formElement.value.comment;
      this.bookDetailsService.addNewComment(this.addCommentRequestBody).subscribe( Data  => {
        //console.log('addNewCommentaddNewCommentaddNewComment', Data);
        if ( Data !== null) {
           // this.modalService.open(content);
           //console.log('comment added');
        } else {
          //console.log('no data');
        }
      });
    } else {
      this.isAdded = false;
      this.modalService.open(content);
    }
  }
  addRating() {
    //console.log('addRating ffff');
    this.addRatingRequestBody.Rate  = this.currentRate1.toString();
    //console.log(parseInt(this.addRatingRequestBody.Rate));
    this.bookDetailsService.addNewRating(this.addRatingRequestBody).subscribe( Data  => {
      //console.log("Rate rate",Data);
      if ( Data !==  null){
        //console.log("sucess");
      } else {
        //console.log('no data');
      }
    });
  }

}
