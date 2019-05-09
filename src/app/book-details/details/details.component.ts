import { Component, OnInit } from '@angular/core';
import { BookDetailsService } from '../sevrices/book-details.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  public slides = [];
  bookDetails = {
    title: '',
    description: '',
    coverImage: '',
    views_count: 0
  };
  isOneImage= false;
  imagesSrc = []
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
        // console.log(Data[0].Item_Operations);
        // console.log(Data.length);
        Data.forEach(element => {
          console.log(element.addtionFieldsInDetail);
          element.addtionFieldsInDetail.forEach(element => {
            console.log(element);
            console.log(element.inputHtmlTypeName);
            if(element.inputHtmlTypeName == "image"){
                this.isOneImage = false;
                this.slides.push(element.insertedData);
            }
          });
          this.bookDetails.title = element.title;
          this.bookDetails.coverImage = element.coverImage;
          this.bookDetails.description = element.description;
          this.bookDetails.views_count= element.views_count;
          // console.log(this.bookDetails);
        });
      }
      else{
        console.log('no data');
      }
  });
    
  }
  

  
  
}
