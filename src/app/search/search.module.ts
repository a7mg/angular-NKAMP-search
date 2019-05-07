import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SearchComponent } from '../search/search.component';
import { ResultsComponent } from './results/results.component';
import { FacetsComponent } from './facets/facets.component';
import { FiltersComponent } from './results/filters/filters.component';
import { ActiveSelectionComponent } from './active-selection/active-selection.component';
import { GategoryComponent } from './facets/gategory/gategory.component';
import { ListComponent } from '../Common/list/list.component';
import { CriteriaComponent } from './criteria/criteria.component';

import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { NaseejSharedModule } from '../Naseej-shared/naseej-shared.module';


const HeaderRoutes = [
  { path: '', component: SearchComponent }
];

@NgModule({
  declarations: [
    SearchComponent,
     ResultsComponent,
     CriteriaComponent,
     FacetsComponent,
     ListComponent,
     FiltersComponent,
     ActiveSelectionComponent,
     GategoryComponent,
    ],
  imports: [
    RouterModule.forChild(HeaderRoutes),
    ProgressSpinnerModule,
    ReactiveFormsModule,
    NaseejSharedModule
  ]
})
export class SearchModule { }
