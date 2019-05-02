import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full'},
  { path: 'search', loadChildren: './search/search.module#SearchModule'},
  { path: 'favorite', loadChildren: './favorite/favorite.module#FavoriteModule'},
  { path: 'book', loadChildren: './book-details/book-details.module#BookDetailsModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
