import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { RouterModule } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FacetsComponent } from './facets/facets.component';
import { GridComponent } from '../common/grid/grid.component';
import { ListComponent } from '../common/list/list.component';
import { FiltersComponent } from './results/filters/filters.component';

const HeaderRoutes = [
  { path: '', component: SearchComponent }
];

@NgModule({
  declarations: [SearchComponent, ResultsComponent, CriteriaComponent, FacetsComponent, GridComponent, ListComponent, FiltersComponent],
  imports: [
    RouterModule.forChild(HeaderRoutes),
    CommonModule,
    ProgressSpinnerModule
  ]
})
export class SearchModule { }
