import { Component, OnInit } from '@angular/core';
import { BookDetailsService } from '../sevrices/book-details.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [NgbRatingConfig]
})
export class DetailsComponent implements OnInit {
  isOneImage= true;
  slides = [];
  additonalFieldsItems=[];
  bookDetails = {
    title: '',
    description: '',
    coverImage: '',
    views_count: 0
  };
  currentRate: number;
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
    this.bookDetailsService.getBookDetails(commentsRequestBody).subscribe(  Data  =>{
      if(Data !== null){
        Data.forEach(DataElement => {
          this.bookDetails.title = DataElement.title;
          this.bookDetails.coverImage = DataElement.coverImage;
          this.bookDetails.description = DataElement.description;
          this.bookDetails.views_count= DataElement.views_count;
          this.slides.push(this.bookDetails.coverImage);
          this.caculateRating(DataElement.rating_count);
          DataElement.addtionFieldsInDetail.forEach(addtionFieldsElement => {
            if(addtionFieldsElement.inputHtmlTypeName == "image"){
              this.isOneImage = false;
              this.slides.push(addtionFieldsElement.insertedData);
            }
            this.additonalFieldsItems.push(addtionFieldsElement);
            this.additonalFieldsItems.sort((a, b) => (a.fieldOrderPage > b.fieldOrderPage) ? 1 : -1)
          });
        });
      }
      else{
        console.log('no data');
      }
  });
    
  }
  addToFavorites(){
    const favoritesRequestBody={
      "userId": "user_58",
      "anonymous": true,
      "email": "abdfg@xyz.comabdfg@xyz.com",
      "itemListPageInformation": {
          "primaryItemSourceId": "src_id_7",
          "itemIndexId": "item_index_id_7",
          "dataSourceName": "data_src_name_sample7",
          "dataSourceId": "data_src_id_7",
          "materialTypeId": "mtrl_type_7",
          "materialTypeName": "matrl_type_name7",
          "title": "item title here7",
          "description": "item  desc here7",
          "coverImage": "http://image-url7.com",
          "addtionslFields": [
              {
                  "id": "VDt7BmoBNpoo7s4ytV8C",
                  "aName": "7الإسم العربي هتا",
                  "eName": "english name here 7",
                  "fName": "frensh name here 7",
                  "fieldOrderPage": 4,
                  "inputHtmlTypeName": "put content here 7",
                  "insertedData": "data to be inserted here 7"
              }
          ]
      }
    }
    this.bookDetailsService.addFavorite(favoritesRequestBody).subscribe( Data  =>{
      if(Data !== null){
        console.log('sucess');
      }
      else{
        console.log('no data');
      }
    });
  }
  
  caculateRating(ratingList){
    let totalRating = ratingList.l1Count + ratingList.l2Count + ratingList.l3Count + ratingList.l4Count + ratingList.l5Count;
    let OverAllRating = (5*ratingList.l1Count + 4*ratingList.l2Count + 3*ratingList.l3Count + 2*ratingList.l4Count + 1*ratingList.l5Count) / (totalRating);
    this.currentRate= Math.round(OverAllRating);
  }

  
  
}
