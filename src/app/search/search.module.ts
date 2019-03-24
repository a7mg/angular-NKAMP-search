import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { RouterModule } from '@angular/router';
import { FiltersComponent } from './filters/filters.component';
import { ResultsComponent } from './results/results.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FacetsComponent } from './facets/facets.component';
import { GridComponent } from './results/grid/grid.component';
import { ListComponent } from './results/list/list.component';

const HeaderRoutes = [
  { path: '', component: SearchComponent }
];

@NgModule({
  declarations: [SearchComponent, FiltersComponent, ResultsComponent, CriteriaComponent, FacetsComponent, GridComponent, ListComponent],
  imports: [
    RouterModule.forChild(HeaderRoutes),
    CommonModule,
    ProgressSpinnerModule
  ]
})
export class SearchModule { }
