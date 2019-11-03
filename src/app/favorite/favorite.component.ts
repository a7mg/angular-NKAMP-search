import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  constructor() { }
  isSearched: boolean;
  getSearchResult(dataEvent: boolean){
    //console.log(dataEvent);
    this.isSearched = dataEvent;
    //console.log(this.isSearched);
  }
  ngOnInit() {
  }

}
