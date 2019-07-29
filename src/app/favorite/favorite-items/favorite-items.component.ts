import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FavoriteService } from '../services/favorite.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorite-items',
  templateUrl: './favorite-items.component.html',
  styleUrls: ['./favorite-items.component.scss']
})
export class FavoriteItemsComponent implements OnInit, OnDestroy {

  @ViewChild('formEle') formElement : NgForm;
  @Output('searchResult') searchedEvent = new EventEmitter<boolean>();
  isSearch= false;
  page = 1;
  unSubscribeFavoriteList =new Subscription();
  alldate:any;
  constructor(private favoriteService: FavoriteService) { }
  
  ngOnInit() {
    this.unSubscribeFavoriteList =this.favoriteService.FavoriteList.subscribe((Data)=>{
      this.alldate=Data;
      console.log('alldate', this.alldate);
       if(Data !== null){
       
        this.isSearch = true;
        this.searchedEvent.emit(this.isSearch);
        console.log(this.alldate.length);
      }
      else{
        console.log('no data');
      }
    });
  }
  sendFavorite(){
    // checkboxes
  }
  ngOnDestroy(){
    this.unSubscribeFavoriteList.unsubscribe();
  }
}
