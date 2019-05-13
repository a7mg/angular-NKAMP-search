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
  isSearched= false;
  @Output('') searchedEvent = new EventEmitter<boolean>();
  page = 1;
  unSubscribeFavoriteList =new Subscription();
  alldate:any;
  constructor(private favoriteService: FavoriteService) { }
  
  ngOnInit() {
    this.unSubscribeFavoriteList =this.favoriteService.FavoriteList.subscribe((Data)=>{
       if(Data !== null){
        this.alldate=Data;
        this.isSearched=true;
        this.searchedEvent.emit(this.isSearched);
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
