import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './favorite.component';
import { RouterModule } from '@angular/router';
import { FavoriteItemsComponent } from './favorite-items/favorite-items.component';
import { FavoritSendMailComponent } from './favorit-send-mail/favorit-send-mail.component';
import { FavoriteSearchComponent } from './favorite-search/favorite-search.component';
const HeaderRoutes = [
  { path: '', component: FavoriteComponent }
];
@NgModule({
  declarations: [ 
    FavoriteComponent, 
    FavoriteItemsComponent, 
    FavoritSendMailComponent,
    FavoriteSearchComponent
  ],
  imports: [
    RouterModule.forChild(HeaderRoutes),
    CommonModule
  ]
})
export class FavoriteModule { }
