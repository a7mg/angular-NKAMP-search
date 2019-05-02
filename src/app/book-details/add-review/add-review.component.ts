import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  constructor() { }

  ngOnInit() {
  }
  addComment(){
  
    if(this.formElement.value.comment){
        this.userData.userComment= this.formElement.value.comment;
        console.log("success and comment is " + this.formElement.value.comment);
    }else{ 
      console.log("error");
    }
  }

}
