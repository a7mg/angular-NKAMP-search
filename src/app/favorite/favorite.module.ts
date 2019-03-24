import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteComponent } from './favorite.component';
import { RouterModule } from '@angular/router';
const HeaderRoutes = [
  { path: '', component: FavoriteComponent }
];
@NgModule({
  declarations: [FavoriteComponent],
  imports: [
    RouterModule.forChild(HeaderRoutes),
    CommonModule
  ]
})
export class FavoriteModule { }
