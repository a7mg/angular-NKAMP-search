import { Component, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { NgForm } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-favorite-search',
  templateUrl: './favorite-search.component.html',
  styleUrls: ['./favorite-search.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class FavoriteSearchComponent implements OnInit {
  @ViewChild('formEle') formElement: NgForm;

  getFavoriteListRequestBody = { 
    "userId": "Jv0b2WkB7-mpx-Tip1YF",
    "pageSize": 5,
    "wantedPage": 1,
    "startDate": 1,
    "endDate": 1,
    "filterByTitle": "Compuetr"
  };
  startDate: number;
  endDate: number;
  allData: any; 
  page = 1;
  dataIndex=0;
  show = false;
  index = 0;
  isAdded = false;
// test = 
//   {
//     "hits": {
//       "hits": [
//         {
//           "id": 1,
//           "name": "Hager",
//           "number": 34324
//         }
//       ]
//     } 
//   }


  constructor(private favoriteService: FavoriteService,
              config: NgbModalConfig,
              private modalService: NgbModal) {
                config.backdrop = 'static';
                config.keyboard = false;
               }
  ngOnInit() {
this.getFavorite();
  }

  getFavorite() {
  console.log('test111');
  const body = {
    userId: "albaqer_naseej",
    pageSize: 5,
    wantedPage: 0
  };


  this.favoriteService.getFavoriteList(body).subscribe( response  => {
    if (response !== null) {
      console.log(response);
      this.allData = response;
    } else {
      console.log('no data');
    }
  });
  }

  // getFavoriteList() {
  //   if (this.formElement.value.searchName || this.formElement.value.dateFrom || this.formElement.value.dateTo) {

  //       this.startDate =  Number(Object.values(this.formElement.value.dateFrom).reverse().join(""));
  //       this.endDate =  Number(Object.values(this.formElement.value.dateTo).reverse().join(""));
  //       this.getFavoriteListRequestBody.filterByTitle = this.formElement.value.searchName;
  //       this.getFavoriteListRequestBody.startDate = this.startDate;
  //       this.getFavoriteListRequestBody.endDate = this.endDate;
  //       console.log("getFavoriteListRequestBody", this.getFavoriteListRequestBody);
  //       this.favoriteService.getFavoriteList(this.getFavoriteListRequestBody).subscribe( Data  => {
  //         if(Data !== null){
  //           console.log(Data);
  //           this.favoriteService.FavoriteList.next(Data);
  //         }
  //         else{
  //           console.log('no data');

  //         }
  //       });

  //   } else {
  //       console.log("enter data search");
  //   }

  // }

  onChangePageSize(event) {
    console.log('Enter to change page size');
  }

  sendFavorite() {}

<<<<<<< HEAD
  removeFav(contentDelete) {
    debugger;
    console.log(contentDelete);
    this.modalService.open(contentDelete);


    // let body = {
    //   _id: id
    // };
    

    //  console.log('Hager', JSON.stringify(this.test.hits));
    // this.allData.hits.hits.forEach(function (currentValue, indexValue) {
    //   if(indexValue == index){
    //     console.log(currentValue);
    //     this.allData.splice(index, 1);
    //   }
    // }); 
    // console.log('Hager', JSON.stringify(this.test));

    // this.favoriteService.removeFavoriteItem(body).subscribe( response  => {
      
    //   if (response !== null) {
    //     this.isAdded=true;
    //     console.log(response);
    //     this.modalService.open(content);
       
    //   } else {
    //     console.log('remove error');
    //     this.isAdded=false;
    //     this.modalService.open(content);
    //   }
    // });
=======

    this.favoriteService.removeFavoriteItem(body).subscribe( response  => {
      if (response !== null) {
        console.log(response);
        this.getFavorite();


      } else {
        console.log('remove error');
      }
    });
>>>>>>> 372137f6db7299fbff5a56f2f7a8378e80bc2cb9
  }

  getPublisher(item){
    return item._source.itemListPageInformation.addtionslFields.filter(x => x.id === 'd8ccada6-2dae-42c9-8f6b-da06a2736d00')[0].insertedData;
  }
}
