import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookDetailsService } from '../sevrices/book-details.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {
  @ViewChild('formEle') formElement : NgForm;
  statusOFreq:boolean= false;
  userData = {
    userRating:'',
    userComment: ''
  }
  constructor(private bookDetailsService: BookDetailsService) { }
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
  }
  ngOnInit() {

  }
  addComment(){
    
    if(this.formElement.value.comment){
      this.addCommentRequestBody.comment.commentData = this.formElement.value.comment;
      // console.log(this.addCommentRequestBody);
      this.bookDetailsService.addNewComment(this.addCommentRequestBody).subscribe( Data  =>{
        if(Data.Item_Operations.msg == "updated"){
            console.log("sucess");
        }
        else{
          console.log('no data');
        }
      });
    }else{
      console.log("please enter data");
    }
  

  }

}
