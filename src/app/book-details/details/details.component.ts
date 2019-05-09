import { Component, OnInit } from '@angular/core';
import { BookDetailsService } from '../sevrices/book-details.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
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
  currentRate = 8;
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
    this.bookDetailsService.getBookDetails(commentsRequestBody).subscribe(  Data  =>{
      if(Data !== null){
        Data.forEach(DataElement => {
          this.bookDetails.title = DataElement.title;
          this.bookDetails.coverImage = DataElement.coverImage;
          this.bookDetails.description = DataElement.description;
          this.bookDetails.views_count= DataElement.views_count;
          this.slides.push(this.bookDetails.coverImage);
          DataElement.addtionFieldsInDetail.forEach(addtionFieldsElement => {
            if(addtionFieldsElement.inputHtmlTypeName == "image"){
              this.isOneImage = false;
              this.slides.push(addtionFieldsElement.insertedData);
            }
            this.additonalFieldsItems.push(addtionFieldsElement);
            this.additonalFieldsItems.sort((a, b) => (a.fieldOrderPage > b.fieldOrderPage) ? 1 : -1)
          });
        });
        // console.log(this.additonalFieldsItems);
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

  
  
}
