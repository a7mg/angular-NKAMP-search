import { Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-favorite-search',
  templateUrl: './favorite-search.component.html',
  styleUrls: ['./favorite-search.component.scss']
})
export class FavoriteSearchComponent implements OnInit {
  @ViewChild('formEle') formElement : NgForm;

  getFavoriteListRequestBody = {
    "userId": "Jv0b2WkB7-mpx-Tip1YF",
    "pageSize": 5,
    "wantedPage": 1,
    "startDate": 1,
    "endDate": 1,
    "filterByTitle": "Compuetr"
  };
  startDate :number;
  endDate: number;


  constructor(private favoriteService: FavoriteService) { }
  ngOnInit() {
    
  }
  getFavoriteList(){
    if (this.formElement.value.searchName|| this.formElement.value.dateFrom || this.formElement.value.dateTo) {

        this.startDate =  Number(Object.values(this.formElement.value.dateFrom).reverse().join(""));
        this.endDate =  Number(Object.values(this.formElement.value.dateTo).reverse().join(""));
        this.getFavoriteListRequestBody.filterByTitle= this.formElement.value.searchName;
        this.getFavoriteListRequestBody.startDate= this.startDate;
        this.getFavoriteListRequestBody.endDate= this.endDate;
         console.log("getFavoriteListRequestBody",this.getFavoriteListRequestBody);
        this.favoriteService.getFavoriteList(this.getFavoriteListRequestBody).subscribe( Data  =>{
          if(Data !== null){
            console.log(Data);
            this.favoriteService.FavoriteList.next(Data);
          }
          else{
            console.log('no data');
    
          }
        });

    } else {
        console.log(" enter data search");
    }

  }

}
