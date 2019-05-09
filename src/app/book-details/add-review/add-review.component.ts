import { Component, OnInit, ViewChild } from '@angular/core';
// import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { BookDetailsService } from '../sevrices/book-details.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class AddReviewComponent implements OnInit {
  @ViewChild('formEle') formElement : NgForm;
  statusOFreq:boolean= false;
  userData = {
    userRating:'',
    userComment: ''
  }
  currentRate= 0;
  addCommentRequestBody = {
    "primaryItemSourceId": "ggggjjjjggggg",
    "itemIndexId": "gggggggggggg",
    "dataSourceName": "name1agggggggaaaaaaaa111",
    "dataSourceId": "data333agggggggaaaaa3",
    "materialTypeId": "mat_44aaaaa4",
    "materialTypeName": "materialTypeName1",
    "comment": {
        "commentCreateDate": "2019-04-03",
        "commentData": "2019-04-03",
        "commentApprovedBy": "admin_1",
        "anonymous": false,
        "userId": "bader",
        "email": "abc@xyz.com",
        "commentApprovalDate": "2019-04-03"
    }
    
  };
  addRatingRequestBody= {
    "primaryItemSourceId": "primaryItemSourceId1",
    "itemIndexId": "itemIndexId1",
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
    if(this.formElement.value.comment){
      this.addCommentRequestBody.comment.commentData = this.formElement.value.comment;
      // console.log(this.addCommentRequestBody);
      this.bookDetailsService.addNewComment(this.addCommentRequestBody).subscribe( Data  =>{
        if(Data.Item_Operations.msg == "updated"){
            // console.log("sucess");
            this.modalService.open(content);
        }
        else{
          console.log('no data');
        }
      });
    }else{
      console.log("please enter data");
    }
  }
  addRating(){
    this.bookDetailsService.addNewRating(this.addRatingRequestBody).subscribe( Data  =>{
      console.log(Data);
    });
  }

}
