import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { RouterModule } from '@angular/router';
import { ResultsComponent } from './results/results.component';
import { CriteriaComponent } from './criteria/criteria.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FacetsComponent } from './facets/facets.component';
import { FiltersComponent } from './results/filters/filters.component';
import { ReactiveFormsModule } from "@angular/forms";
import { GridComponent } from '../Common/grid/grid.component';
import { ListComponent } from '../Common/list/list.component';


const HeaderRoutes = [
  { path: '', component: SearchComponent }
];

@NgModule({
  declarations: [SearchComponent, ResultsComponent, CriteriaComponent, FacetsComponent, GridComponent, ListComponent, FiltersComponent],
  imports: [
    RouterModule.forChild(HeaderRoutes),
    CommonModule,
    ProgressSpinnerModule,
    ReactiveFormsModule
  ]
})
export class SearchModule { }
