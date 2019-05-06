import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-favorite-items',
  templateUrl: './favorite-items.component.html',
  styleUrls: ['./favorite-items.component.scss']
})
export class FavoriteItemsComponent implements OnInit {
  @ViewChild('formEle') formElement : NgForm;
  page = 1;
  constructor() { }

  ngOnInit() {
  }
  sendFavorite(){
    
  }
}
